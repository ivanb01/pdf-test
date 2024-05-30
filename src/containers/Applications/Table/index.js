import React, { useEffect, useMemo } from 'react';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import Avatar from 'components/shared/avatar';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import moment from 'moment';

import { useRouter } from 'next/router';
import { useFetchPropertyApplicationsPaginated } from '../queries/queries';
import useIsScrolledToBottom from '@helpers/hooks/useIsScrolledToBottom';
import CircularProgress from '@mui/material/CircularProgress';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Button from '@components/shared/button';
import StatusChip, { VARIANT_ENUM } from '@components/shared/status-chip';
import { useRunCreditCheck, useFetchCreditCheckReport } from '../queries/mutations';

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
      cell: (info) => {
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
    cell: (info) => (
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
    cell: (info) => {
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
    cell: (info) => {
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
    cell: (info) => {
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
    cell: (info) => {
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
    cell: (info) => {
      const { public_identifier, credit_check_payment_successfull, credit_check_run_successfully } = info.row.original;
      const { data, mutate: mutateFetchCreditCheckReport } = useFetchCreditCheckReport();
      const { mutate: mutateRunCreditCheck } = useRunCreditCheck({
        // onSuccess: mutateFetchCreditCheckReport(id),
      });

      const handlePdfDownload = (e) => {
        e.stopPropagation();
        mutateRunCreditCheck({ id: public_identifier });
      };

      const renderSwitch = () => {
        if (!credit_check_payment_successfull) {
          return <Button secondary>Generate Payment Link</Button>;
        } else {
          if (credit_check_run_successfully) {
            return (
              <div className="flex flex-col items-center gap-2">
                <StatusChip variant={VARIANT_ENUM.SUCCESS} text={'Completed'} />
                <button className="flex gap-1" onClick={handlePdfDownload}>
                  <SaveAltIcon className="w-4 h-4 text-gray4" />
                  <p>Credit check PDF</p>
                </button>
              </div>
            );
          }
          return (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                mutateRunCreditCheck({ id: public_identifier });
              }}>
              Run Credit&Check
            </Button>
          );
        }
      };

      return <div className="min-w-[220px] flex justify-center items-center px-4">{renderSwitch()}</div>;
    },
  }),
  // columnHelper.accessor('sentTo', {
  //   header: () => (
  //     <div className=" min-w-[120px] px-6">
  //       <span>Sent To</span>
  //     </div>
  //   ),
  //   cell: (info) => {
  //     const { name, email } = info.getValue()[0];
  //     const contactsLength = info.getValue().length;
  //     const [showContacts, setShowContacts] = useState(false);
  //     const popOverRef = useRef(null);
  //     const contactsRef = useRef(null);
  //     const otherContancts = [...info.getValue()];
  //     otherContancts.shift();

  //     const useOutsideAlerter = (ref) => {
  //       useEffect(() => {
  //         function handleClickOutside(event) {
  //           if (ref.current && !ref.current.contains(event.target) && !contactsRef.current.contains(event.target)) {
  //             setShowContacts(false);
  //           }
  //         }
  //         document.addEventListener('mousedown', handleClickOutside);
  //         return () => {
  //           document.removeEventListener('mousedown', handleClickOutside);
  //         };
  //       }, [ref]);
  //     };

  //     useOutsideAlerter(popOverRef);
  //     const popOverClassName = useMemo(() => {
  //       return `absolute z-10 bg-white right-[25px] translate-x-full top-[40px] shadow-lg p-4 flex flex-col gap-3 rounded-lg opacity-0  ${
  //         showContacts ? 'opacity-100' : 'opacity-0 transition-opacity  duration-300 ease-in-out pointer-events-none'
  //       }`;
  //     }, [showContacts]);

  //     return (
  //       <div className="min-w-[200px] flex items-center gap-3 px-4 relative">
  //         <div className=" flex flex-col">
  //           <p>{name}</p>
  //           <p className="font-normal text-gray4">{email}</p>
  //         </div>
  //         {!!(contactsLength - 1) && (
  //           <div className="relative">
  //             <div
  //               ref={contactsRef}
  //               onClick={(e) => {
  //                 setShowContacts(!showContacts);
  //               }}
  //               className="cursor-pointer rounded-full flex justify-center items-center w-[25px] h-[25px] bg-gray4 text-white text-[10px] leading-4 font-medium ">
  //               <span className="mr-[2px]">{`+${contactsLength - 1}`}</span>
  //             </div>

  //             <div ref={popOverRef} className={popOverClassName}>
  //               {otherContancts.map((contact) => {
  //                 return (
  //                   <div className=" flex flex-col" id={contact.id} key={contact.id}>
  //                     <p className="text-xs leading-4">{contact.name}</p>
  //                     <p className="text-xs leading-4 font-normal text-gray4">{contact.email}</p>
  //                   </div>
  //                 );
  //               })}
  //             </div>
  //           </div>
  //         )}
  //       </div>
  //     );
  //   },
  // }),
  // columnHelper.accessor('sentOn', {
  //   header: () => (
  //     <div className=" min-w-[150px] px-6">
  //       <span>Sent On</span>
  //     </div>
  //   ),
  //   cell: (info) => {
  //     const [showSendApplicationOverlay, setShowSendApplicationOverlay] = useState(false);
  //     const ValidationSchema = Yup.object().shape({
  //       landlords: Yup.array().required('Landlords are required').min(1, 'Please select at least one neighborhood'),
  //     });
  //     const formik = useFormik({
  //       initialValues: {
  //         landlords: '',
  //         contacts: [],
  //       },
  //       validationSchema: ValidationSchema,
  //       onSubmit: () => {},
  //     });

  //     const onSendApplication = () => {
  //       setShowSendApplicationOverlay(true);
  //     };

  //     return (
  //       <div className="min-w-[150px] flex flex-col items-center px-4">
  //         <p>{info.renderValue()}</p>
  //         <button onClick={onSendApplication} className="text-lightBlue3">
  //           Re-Send
  //         </button>

  //         {showSendApplicationOverlay && (
  //           <FormikProvider value={formik}>
  //             <form onSubmit={formik.handleSubmit}>
  //               <ResendModal onClose={() => setShowSendApplicationOverlay(false)} />
  //             </form>
  //           </FormikProvider>
  //         )}
  //       </div>
  //     );
  //   },
  // }),
  // columnHelper.accessor(
  //   (row) => {
  //     return () => {};
  //   },
  //   {
  //     id: 'deal',
  //     header: () => (
  //       <div className="min-w-[160px] px-6">
  //         <span>Deal</span>
  //       </div>
  //     ),
  //     cell: (info) => {
  //       return (
  //         <div className="min-w-[160px] px-4 font-normal">
  //           <button className="flex items-center bg-lightBlue1 px-[10px] gap-2 rounded py-[7px] text-lightBlue3 text-xs leading-4">
  //             <div className="-scale-x-100 rotate-90">
  //               <InsertDriveFileIcon className="w-4 h-4" />
  //             </div>
  //             <span>Create a Deal</span>
  //           </button>
  //         </div>
  //       );
  //     },
  //   },
  // ),
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
      cell: (info) => {
        return (
          <div className="min-w-[76px] px-4 font-normal flex justify-center">
            <button
              className="text-overlayBackground flex justify-center"
              onClick={(e) => {
                e.stopPropagation();
              }}>
              <SaveAltIcon className="w-4 h-4" />
            </button>
          </div>
        );
      },
    },
  ),
];

const ApplicationsTable = ({ searchInput }) => {
  const router = useRouter();
  const [isScrolledToBottom, handleScroll] = useIsScrolledToBottom();
  const fetchApplicationsParams = useMemo(() => {
    return {
      page_size: 10,
      count_items: true,
      search_param: searchInput,
      sort: 'created_at,desc',
    };
  }, [searchInput]);

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
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
