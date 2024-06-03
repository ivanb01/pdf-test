import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonIcon from '@mui/icons-material/Person';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import Avatar from 'components/shared/avatar';
import moment from 'moment';
import { useEffect, useMemo, useRef, useState } from 'react';

import { generateCreditCheckPaymenkLink } from '@api/applications';
import Button from '@components/shared/button';
import StatusChip, { VARIANT_ENUM } from '@components/shared/status-chip';
import useIsScrolledToBottom from '@helpers/hooks/useIsScrolledToBottom';
import NoteIcon from '@mui/icons-material/Note';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CircularProgress from '@mui/material/CircularProgress';
import { saveAs } from 'file-saver';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { downloadFullPdf } from '../Pdf/generatePdf';
import SendApplicationModal from '../SendApplicationModal';
import { useFetchCreditCheckReport, useRunCreditCheck } from '../queries/mutations';
import { useFetchPropertyApplicationsPaginated } from '../queries/queries';

const columnHelper = createColumnHelper();
const columns = [
  // columnHelper.accessor("id", {
  //   header: () => (
  //     <div className="min-w-[140px] px-6">
  //       <span>Id</span>
  //     </div>
  //   ),
  //   cell: (info) => {
  //     return <div className="min-w-[140px] px-6">{info.getValue()}</div>;
  //   },
  // }),
  columnHelper.accessor(
    (row) => {
      return {
        clientImage: row.clientImage,
        clientName: row.clientName,
        clientEmail: row.clientEmail,
      };
    },
    {
      id: 'clientInfo',
      cell: ({ info }) => {
        const { client_first_name, client_last_name, client_email } = info.row.original;
        const initials =
          client_first_name.split(' ')[0].charAt(0) +
          '.' +
          client_last_name.split(' ')[client_last_name.split(' ').length - 1].charAt(0) +
          '.';
        return (
          <div className="flex gap-3 min-w-[240px] px-4 items-center ">
            <Avatar src={''} initials={initials} />
            <div>
              <p>
                <span>{client_first_name}</span>
                <span>{` ${client_last_name}`}</span>
              </p>
              <p className="font-normal text-gray4">{client_email}</p>
            </div>
          </div>
        );
      },
      header: () => (
        <div className="min-w-[240px] px-6">
          <span>Client Applied</span>
        </div>
      ),
    },
  ),
  columnHelper.accessor('occupants', {
    header: () => (
      <div className="text-center px-4">
        <span>
          nr of
          <br /> persons
        </span>
      </div>
    ),
    cell: ({ info }) => (
      <div className="flex items-center justify-center  min-w-[90px] gap-1">
        <PersonIcon className="text-gray3 w-[20px] h-[20px]" />
        <span>{info.renderValue().length + 1}</span>
      </div>
    ),
  }),
  columnHelper.accessor('property_address', {
    header: () => (
      <div className="min-w-[292px] px-4">
        <span>Listing Address</span>
      </div>
    ),
    cell: ({ info }) => {
      const { listing_address } = info.row.original;
      return (
        <div className="min-w-[292px] px-4 font-normal">
          <p>{info.getValue()}</p>
        </div>
      );
    },
  }),
  columnHelper.accessor('created_at', {
    header: () => (
      <div className="text-center min-w-[150px] px-6">
        <span>Submitted On</span>
      </div>
    ),
    cell: ({ info }) => {
      const createdAt = info.getValue();
      var date = moment(createdAt).format('MMM DD,YYYY');
      var time = moment(createdAt).format('HH:mm');

      return (
        <div className="flex flex-col items-center min-w-[150px] px-6  ">
          <p>{date}</p>
          <p className="font-normal text-gray4">{time}</p>
        </div>
      );
    },
  }),
  columnHelper.accessor('documents', {
    header: () => (
      <div className="text-center min-w-[120px] px-6">
        <span>Any files</span>
      </div>
    ),
    cell: ({ info }) => {
      return (
        <div className="min-w-[120px] flex justify-center px-6">
          {info.getValue().length ? (
            <CheckCircleIcon className="w-5 h-5 text-green5" />
          ) : (
            <RemoveCircleIcon className="h-5 w-5 text-overlayBackground" />
          )}
        </div>
      );
    },
  }),
  columnHelper.accessor('emergency_contact_phone_number', {
    header: () => (
      <div className="text-center min-w-[120px] px-6">
        <span>Application Filled</span>
      </div>
    ),
    cell: ({ info }) => {
      return (
        <div className="min-w-[120px] flex justify-center px-6">
          {!!info.getValue() ? (
            <CheckCircleIcon className="w-5 h-5 text-green5" />
          ) : (
            <RemoveCircleIcon className="h-5 w-5 text-overlayBackground" />
          )}
        </div>
      );
    },
  }),
  columnHelper.accessor('credit_check_payment_successfull', {
    header: () => (
      <div className="text-center min-w-[220px]  px-4">
        <span>Credit Report & Check</span>
      </div>
    ),
    cell: (props) => {
      const router = useRouter();
      const { fetchApplicationsParams, info } = props;
      const { public_identifier, credit_check_payment_successfull, credit_check_ran_successfully } = info.row.original;

      const { refetch: refetchApplications } = useFetchPropertyApplicationsPaginated(fetchApplicationsParams);

      const onCreditCheckGenerationError = () => {
        toast.error('Unable to generate PDF from server data!');
      };

      const onDownloadCreditReportSuccess = async (data) => {
        if (data) {
          try {
            const base64Response = await fetch(`data:application/octet-stream;base64,${data.data.document_data}`);
            const blob = await base64Response.blob();
            saveAs(blob, 'Credit check report');
          } catch (e) {
            onCreditCheckGenerationError();
          }
        }
      };

      const onDownloadCreditReportError = () => {
        toast.error('Unable to download credit check report!');
      };

      const {
        data,
        mutate: mutateFetchCreditCheckReport,
        isPending: isPendingFetchingCreditCheckReport,
      } = useFetchCreditCheckReport({
        onSuccess: onDownloadCreditReportSuccess,
        onError: onDownloadCreditReportError,
      });

      const onRunCreditCheckRunSuccess = () => {
        refetchApplications();
      };
      const onRunCreditCheckRunError = () => {
        toast.error('Unable to run credit check!');
      };

      const { mutate: mutateRunCreditCheck, isPending: isPendingRunCreditCheck } = useRunCreditCheck({
        onSuccess: onRunCreditCheckRunSuccess,
        onError: onRunCreditCheckRunError,
      });

      const handleRunCreditCheck = (e) => {
        e.stopPropagation();
        mutateRunCreditCheck({ id: public_identifier });
      };

      const handlePdfDownload = (e) => {
        e.stopPropagation();
        mutateFetchCreditCheckReport({ id: public_identifier });
      };

      const [generatingPaymentLink, setGeneratingPaymentLink] = useState(false);
      const handleGeneratePaymenkLink = async (e) => {
        e.stopPropagation();
        setGeneratingPaymentLink(true);
        try {
          const response = await generateCreditCheckPaymenkLink(public_identifier);
          window.open(response.data.payment_link_url, '_blank', 'noopener,noreferrer');
        } catch (e) {
          toast.error('Unable to generate payment link!');
        } finally {
          setGeneratingPaymentLink(false);
        }

        refetchApplications();
      };

      const renderSwitch = () => {
        if (!credit_check_payment_successfull) {
          return (
            <Button secondary loading={generatingPaymentLink} onClick={handleGeneratePaymenkLink}>
              Generate Payment Link
            </Button>
          );
        } else {
          if (credit_check_ran_successfully) {
            return (
              <div className="flex flex-col items-center gap-2">
                <StatusChip variant={VARIANT_ENUM.SUCCESS} text={'Completed'} />
                <button onClick={handlePdfDownload} className="h-4">
                  {isPendingFetchingCreditCheckReport ? (
                    <CircularProgress className={'h-4 w-4'} />
                  ) : (
                    <div className="flex items-center gap-1">
                      <SaveAltIcon className="w-4 h-4 text-gray4" />
                      <p>Credit check PDF</p>
                    </div>
                  )}
                </button>
              </div>
            );
          }
          return (
            <Button onClick={handleRunCreditCheck} loading={isPendingRunCreditCheck}>
              Run Credit&Check
            </Button>
          );
        }
      };

      return <div className="min-w-[220px] flex justify-center items-center px-4">{renderSwitch()}</div>;
    },
  }),

  columnHelper.accessor('recipients', {
    header: () => (
      <div className=" min-w-[120px] px-6">
        <span>Sent To</span>
      </div>
    ),
    cell: ({ info }) => {
      console.log('INFO', info.row.original);

      const [showContacts, setShowContacts] = useState(false);
      const popOverRef = useRef(null);
      const contactsRef = useRef(null);
      const contactsLength = info.getValue().length;
      const otherContancts = [...info.getValue()];
      otherContancts.shift();

      const useOutsideAlerter = (ref) => {
        useEffect(() => {
          function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target) && !contactsRef.current.contains(event.target)) {
              setShowContacts(false);
            }
          }
          document.addEventListener('mousedown', handleClickOutside);
          return () => {
            document.removeEventListener('mousedown', handleClickOutside);
          };
        }, [ref]);
      };

      useOutsideAlerter(popOverRef);
      const popOverClassName = useMemo(() => {
        return `absolute z-10 bg-white right-[25px] translate-x-full top-[40px] shadow-lg p-4 flex flex-col gap-3 rounded-lg opacity-0  ${
          showContacts ? 'opacity-100' : 'opacity-0 transition-opacity  duration-300 ease-in-out pointer-events-none'
        }`;
      }, [showContacts]);

      return (
        <div className="min-w-[200px] flex items-center gap-3 px-4 relative">
          {info.getValue().length ? (
            <>
              <div className=" flex flex-col">
                <p>{info.getValue()[0].name}</p>
                <p className="font-normal text-gray4">{info.getValue()[0].email}</p>
              </div>
              {!!(contactsLength - 1) && (
                <div className="relative">
                  <div
                    ref={contactsRef}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowContacts(!showContacts);
                    }}
                    className="cursor-pointer rounded-full flex justify-center items-center w-[25px] h-[25px] bg-gray4 text-white text-[10px] leading-4 font-medium ">
                    <span className="mr-[2px]">{`+${contactsLength - 1}`}</span>
                  </div>

                  <div ref={popOverRef} className={popOverClassName}>
                    {otherContancts.map((contact) => {
                      return (
                        <div className=" flex flex-col" id={contact.id} key={contact.id}>
                          <p className="text-xs leading-4">{contact.name}</p>
                          <p className="text-xs leading-4 font-normal text-gray4">{contact.email}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          ) : (
            <span>--</span>
          )}
        </div>
      );
    },
  }),

  // columnHelperAccesor for the whole row data
  columnHelper.accessor(
    (row) => {
      return row;
    },
    {
      id: 'info',
      header: () => (
        <div className=" min-w-[150px] px-6">
          <span>Sent On</span>
        </div>
      ),
      cell: ({ info }) => {
        const sentOn = info.row.original.sent_by_email_at;
        var date = moment(sentOn).format('MMM DD,YYYY');
        var time = moment(sentOn).format('HH:mm');

        const [showModal, setShowModal] = useState(false);
        const handleSendEmail = (e) => {
          console.log('Send Email');
          e.stopPropagation();
          setShowModal(true);
        };

        return (
          <div className="min-w-[150px] flex flex-col items-center px-4">
            {showModal && (
              <SendApplicationModal onClose={() => setShowModal(false)} applicationData={info.row.original} />
            )}

            {info.row.original.sent_by_email_at ? (
              <div className="flex flex-col items-center min-w-[150px] px-6  ">
                <p>{date}</p>
                <p className="font-normal text-gray4">{time}</p>
                <button onClick={handleSendEmail} className="text-lightBlue3">
                  Re-Send
                </button>
              </div>
            ) : (
              <Button className={'w-min'} onClick={handleSendEmail} leftIcon={<NoteIcon className="w-4 h-4 mr-1" />}>
                Send
              </Button>
            )}
          </div>
        );
      },
    },
  ),

  columnHelper.accessor(
    (row) => {
      return () => {};
    },
    {
      id: 'pdf',
      header: () => (
        <div className="min-w-[76px] px-6 text-center">
          <span>Full PDF</span>
        </div>
      ),
      cell: ({ info }) => {
        const onDownloadCreditReportSuccess = async (data) => {
          if (data && data.data?.document_data) {
            try {
              const base64Response = await fetch(`data:application/octet-stream;base64,${data.data.document_data}`);
              const blob = await base64Response.blob();
              downloadFullPdf(info.row.original, blob);
            } catch (e) {
              downloadFullPdf(info.row.original, null);
              // onCreditCheckGenerationError();
            }
          }
        };

        const onDownloadCreditReportError = () => {
          downloadFullPdf(info.row.original, null);
        };

        const {
          data,
          mutate: mutateFetchCreditCheckReport,
          isPending: isPendingFetchingCreditCheckReport,
        } = useFetchCreditCheckReport({
          onSuccess: onDownloadCreditReportSuccess,
          onError: onDownloadCreditReportError,
        });

        const handlePdfDownload = (e) => {
          e.stopPropagation();
          mutateFetchCreditCheckReport({ id: info.row.original.public_identifier });
        };

        return (
          <div className="min-w-[76px] px-4 font-normal flex justify-center">
            <button className="text-overlayBackground flex justify-center" onClick={handlePdfDownload}>
              {isPendingFetchingCreditCheckReport ? (
                <CircularProgress className={'h-4 w-4'} />
              ) : (
                <SaveAltIcon className="w-4 h-4" />
              )}
            </button>
          </div>
        );
      },
    },
  ),
];

const ApplicationsTable = ({ searchInput, currentButton }) => {
  const router = useRouter();
  const [isScrolledToBottom, handleScroll] = useIsScrolledToBottom();
  const fetchApplicationsParams = useMemo(() => {
    let email_status;
    switch (currentButton) {
      case 1:
        email_status = 'UNSENT';
        break;
      case 2:
        email_status = 'SENT';
        break;
      default:
        email_status = null;
    }
    console.log('email_status', email_status);

    return {
      page_size: 10,
      count_items: true,
      search_param: searchInput,
      sort: 'created_at,desc',
      email_status: email_status,
    };
  }, [searchInput, currentButton]);

  const {
    data: applicationsData,
    error: applicationsErrors,
    isError: isApplicationsErrors,
    isLoading: applicationsIsLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchPropertyApplicationsPaginated(fetchApplicationsParams);

  useEffect(() => {
    if (isScrolledToBottom && hasNextPage) {
      fetchNextPage();
    }
  }, [isScrolledToBottom, hasNextPage, fetchNextPage]);

  const applications = useMemo(() => {
    if (applicationsData)
      return applicationsData?.pages
        .map((page) => {
          return page?.data?.data?.map((singlePage) => singlePage);
        })
        .flat();
    else return [];
  }, [applicationsData]);

  const table = useReactTable({
    data: applications ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (applicationsIsLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <CircularProgress size={50} />
      </div>
    );
  }

  if (applicationsErrors) {
    return (
      <div className="w-full h-full flex justify-center items-center text-center">
        <p>Something went wrong while trying to fetch applications...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[calc(100%-84px)] overflow-scroll" onScroll={handleScroll}>
      {table && (
        <>
          {
            <table className="w-full relative">
              <thead className="bg-gray10 w-full h-[60px] sticky z-40">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="sticky top-0  bg-gray10 text-left justify-start leading-4 text-xs text-gray4 font-medium tracking-[0.6px] uppercase ">
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="leading-5 text-sm font-medium">
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b hover:bg-gray10 cursor-pointer"
                    onClick={(e) => {
                      router.push(`/applications/${row.original.public_identifier}`);
                    }}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td key={cell.id} className="py-4">
                          {flexRender(cell.column.columnDef.cell, {
                            info: cell.getContext(),
                            fetchApplicationsParams,
                          })}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          }
        </>
      )}

      {hasNextPage && (
        <div className="h-[80px] flex items-center justify-center">
          {isFetchingNextPage && <CircularProgress size={20} />}
        </div>
      )}
    </div>
  );
};

export default ApplicationsTable;
