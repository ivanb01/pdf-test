import Button from '@components/shared/button';
import Input from '@components/shared/input';
import useDownloadAwsFile from '@helpers/hooks/useDownloadAwsFile';
import { ArrowNarrowLeftIcon } from '@heroicons/react/solid';
import DownloadIcon from '@mui/icons-material/Download';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import NoteIcon from '@mui/icons-material/Note';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CircularProgress from '@mui/material/CircularProgress';
import clsx from 'clsx';
import { SIDEBAR_BUTTONS } from 'containers/Applications/utils/constants';
import { FormikProvider, getIn, useFormik, useFormikContext } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { createRef, forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import AddDocument from '../AddDocumentOverlay';
import { downloadPdf } from '../Pdf/generatePdf';
import SendApplicationModal from '../SendApplicationModal';
import { useUpdatePropertyApplication } from '../queries/mutations';
import {
  useFetchApplicationDocuments,
  useFetchPropertyApplicationById,
  useFetchSingleProperty,
} from '../queries/queries';
import FileInput from './FileInput';

const typeToName = {
  BANK_STATEMENT_1: 'bank_statement_1',
  BANK_STATEMENT_2: 'bank_statement_2',
  EMPLOYMENT_LETTER: 'employment_letter',
  PAYSTUB_1: 'paystub_1',
  PAYSTUB_2: 'paystub_2',
  PHOTO_ID_COPY: 'photo_id_copy',
  TAX_RETURNS_1: 'tax_returns',
  TAX_RETURNS_2: 'tax_returns_2',
  W2: 'w2',
  OTHER: 'other_documents',
};

const nameToType = {
  'Bank statement 1': 'BANK_STATEMENT_1',
  'Bank statement 2': 'BANK_STATEMENT_2',
  'Employment letter': 'EMPLOYMENT_LETTER',
  'Paystub 1': 'PAYSTUB_1',
  'Paystub 2': 'PAYSTUB_2',
  'Copy of Photo ID': 'PHOTO_ID_COPY',
  'Tax Returns': 'TAX_RETURNS_1',
  'Tax Returns 2': 'TAX_RETURNS_2',
  W2: 'W2',
  other_documents: 'OTHER',
};

const ApplicationDetails = () => {
  const router = useRouter();
  const [sections, setSections] = useState(SIDEBAR_BUTTONS.map(() => createRef()));
  const [currentSection, setCurrentSection] = useState(0);
  const containerRef = useRef(null);
  const [positionsSpans, setPostitonsSpans] = useState({});
  const [financialsIntersect, setFinancialsIntersect] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const {
    data: applicationData,
    error: applicationErrors,
    isLoading: applicationIsLoading,
    isSuccess: applicationIsSuccess,
    isRefetching: isRefetchingApplicationDetails,
  } = useFetchPropertyApplicationById(router.query.slug);

  const {
    data: documentsData,
    error: documentsErrors,
    isLoading: documentsIsLoading,
    isSuccess: documentsIsSuccess,
    isRefetching: isRefetchingDocumentsDetails,
  } = useFetchApplicationDocuments(applicationData?.id, {
    enabled: applicationIsSuccess && !!applicationData.id,
  });

  const [headerHeight, setHeaderHeight] = useState(0);
  const [isAddDocumentOverlayOpened, setAddDocumentOverlayOpened] = useState(false);

  const formattedInitialValues = useMemo(() => {
    if (documentsData && documentsIsSuccess) {
      const data = documentsData.items.reduce((documentsObject, document) => {
        if (document.document_type === 'OTHER') {
          return {
            ...documentsObject,
            other_documents: documentsObject?.other_documents
              ? [...documentsObject.other_documents, document]
              : [document],
          };
        } else {
          return {
            ...documentsObject,
            [typeToName[document.document_type]]: document,
          };
        }
      }, {});

      if (data.other_documents)
        return {
          ...data,
          other_documents: data.other_documents.reduce((accumulator, value) => {
            return {
              ...accumulator,
              [value['id']]: value,
            };
          }, {}),
        };
      else return data;
    } else return {};
  }, [documentsData]);

  const formik = useFormik({
    initialValues: {
      employment_letter: null,
      paystub_1: null,
      paystub_2: null,
      tax_returns_1: null,
      tax_returns_2: null,
      bank_statement_1: null,
      bank_statement_2: null,
      photo_id_copy: null,
      w2: null,
      other_documents: null,
      ...formattedInitialValues,
    },
    enableReinitialize: true,
    onSubmit: () => {},
  });

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setFinancialsIntersect(entry.isIntersecting);
    });
    if (sections && sections[4].current) observer.observe(sections[4].current);
    return () => observer.disconnect();
  }, [sections, applicationIsSuccess, documentsData]);

  useEffect(() => {
    if (applicationIsSuccess && documentsIsSuccess)
      sections.forEach((section) => {
        setPostitonsSpans((currentPostitons) => {
          return {
            ...currentPostitons,
            [section.current.id]: {
              id: section.current.id,
              top: section.current.getBoundingClientRect().top - containerRef.current.getBoundingClientRect().top,
              bottom: section.current.getBoundingClientRect().bottom - containerRef.current.getBoundingClientRect().top,
              height: section.current.getBoundingClientRect().height,
            },
          };
        });
      });
  }, [sections, applicationIsSuccess]);

  const headerRef = useCallback((node) => {
    if (node) {
      setHeaderHeight(node.getBoundingClientRect().height);
    }
  }, []);

  const executeScroll = (id) => {
    const refToScroll = sections[id];
    if (!refToScroll?.current) return;
    refToScroll.current.scrollIntoView({ behavior: 'smooth', block: id !== 4 ? 'start' : 'center' });
  };

  const onSideBarItemClick = (id) => {
    executeScroll(id);
  };

  const onScroll = (e) => {
    const { scrollTop } = containerRef.current;

    if (!scrollTop || scrollTop <= headerHeight) {
      setCurrentSection(0);
      return;
    }

    let isAtBottom = false;

    const { scrollHeight, clientHeight } = containerRef.current;
    isAtBottom = scrollTop + clientHeight + 5 >= scrollHeight;

    if (isAtBottom) {
      setCurrentSection(5);
      return;
    }

    if (financialsIntersect && !isAtBottom && scrollTop + clientHeight + 300 >= scrollHeight) {
      setCurrentSection(4);
      return;
    }

    const dimensions = Object.values(positionsSpans);
    let current = 0;
    dimensions.forEach((dimension) => {
      if (scrollTop + 2 >= dimension.top && scrollTop < dimension.bottom) current = dimension;
    });
    setCurrentSection(parseInt(current.id));
  };

  const [loadingPdf, setloadingPdf] = useState(false);

  const onDownloadPdf = async () => {
    setloadingPdf(true);
    await downloadPdf({ ...applicationData, documents: documentsData.items });
    setloadingPdf(false);
  };

  if (applicationIsLoading || documentsIsLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <CircularProgress size={50} />
      </div>
    );
  }

  if (applicationErrors || documentsErrors) {
    return (
      <div className="w-full h-full flex justify-center items-center text-center">
        <p>Something went wrong while trying to fetch application...</p>
      </div>
    );
  }
  return (
    <div className=" w-full h-full flex flex-col divide-y">
      <button className="p-6 flex items-center gap-2 " onClick={router.back}>
        <ArrowNarrowLeftIcon className="h-[20px] w-[20px] text-lightBlue3" />
        <span className="text-lg font-medium leading-6">Create Custom Form</span>
      </button>
      <div className="flex divide-x">
        <div className="min-w-[300px] grow-0">
          <p className=" flex items-center py-[16px] pl-[24px] pr-[10px]"> Sections</p>
          <ul className="pl-[35px] text-sm font-medium leading-5 text-gray4">
            {SIDEBAR_BUTTONS.map((button) => (
              <li
                key={button.id}
                className={clsx('py-[20px] px-[10px] border-l-[3px] transition duration-50	ease-linear	', {
                  ['border-l-lightBlue3 text-gray7']: currentSection === button.id,
                })}>
                <button onClick={() => onSideBarItemClick(button.id)}>
                  <p>{button.label}</p>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div
          className="flex flex-col h-[calc(100vh-224px)] w-full overflow-y-scroll [&>*]:border-b"
          onScroll={onScroll}
          ref={containerRef}>
          {applicationIsSuccess && (
            <>
              <ClientInformation clientInformation={applicationData} ref={headerRef} />
              <RentalInformation id="0" ref={sections[0]} rentalInformation={applicationData} />
              <ClientsInformation
                ref={sections[1]}
                id="1"
                clientsInformation={applicationData}
                occupants={applicationData.occupants}
              />
              <EmploymentInformation id="2" ref={sections[2]} employmentInformation={applicationData} />
              <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit}>
                  {applicationData && documentsData && (
                    <DocumentsInformation
                      id="3"
                      documents={formik.values}
                      ref={sections[3]}
                      setOtherDocuementsModalVisible={setAddDocumentOverlayOpened}
                    />
                  )}
                </form>
                {isAddDocumentOverlayOpened && (
                  <AddDocument handleClose={() => setAddDocumentOverlayOpened(false)} name="other_documents" />
                )}
              </FormikProvider>

              <FinancialInformation id="4" financials={applicationData} ref={sections[4]} />
              <OtherInformation id="5" other={applicationData} ref={sections[5]} />
              {applicationData['client_signature'] && (
                <SignatureInformation signature={applicationData?.client_signature} />
              )}
            </>
          )}
          {showModal && <SendApplicationModal onClose={() => setShowModal(false)} applicationData={applicationData} />}
        </div>
        <div className="fixed bottom-0 flex justify-end  items-center w-full h-[66px] gap-3 px-6 shadow-[0px_-2px_12px_1px_#00000007]">
          <Button
            loading={loadingPdf || isRefetchingApplicationDetails}
            secondary
            leftIcon={<DownloadIcon className="w-4 h-4 mr-1" />}
            onClick={onDownloadPdf}
            disabled={loadingPdf || isRefetchingApplicationDetails}>
            PDF
          </Button>
          <Button onClick={() => setShowModal(true)} leftIcon={<NoteIcon className="w-4 h-4 mr-1" />}>
            Send application
          </Button>
        </div>
      </div>
    </div>
  );
};

const ClientInformation = forwardRef((props, ref) => {
  const { clientInformation } = props;

  return (
    <div className="flex  gap-[21px] p-[24px]" ref={ref}>
      <div className={' h-[72px] w-[72px] rounded-full overflow-hidden bg-gray-100'}>
        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{`${clientInformation.client_first_name} ${clientInformation.client_last_name}`}</span>
          <span className="py-1 px-2 bg-[#ECFEFF] border border-cyan-600 rounded-xl	text-xs font-medium leading-4 text-cyan-800">
            Renter
          </span>
        </div>
        <div className="flex gap-6 text-sm leading-5 text-gray7">
          <div className="flex gap-1 items-center">
            <EmailIcon className="text-gray3 h-5 w-5" />
            <span> {`${clientInformation.client_email}`}</span>
          </div>
          <div className="flex gap-1 items-center">
            <LocalPhoneIcon className="text-gray3 h-5 w-5" />
            <span> {`${clientInformation.client_phone_number}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
});

const RentalInformation = forwardRef(({ rentalInformation }, ref) => {
  const { property_id, id } = rentalInformation;

  const { data } = useFetchSingleProperty(property_id, { enabled: !!property_id });

  return (
    <div className="flex flex-col gap-[24px] p-[24px]" ref={ref} id={id}>
      <p className="leading-5 font-medium text-gray7">Rental information</p>

      <div className="flex [&>*]:w-full gap-6">
        <div className="space-y-3">
          <p className="text-sm  font-medium leading-5 text-gray4">Property</p>
          <div className="flex p-4 bg-gray10 gap-2.5 text-sm font-medium leading-5">
            <div className="w-[72px] h-[72px] relative">
              {data && (
                <Image
                  src={data ? data?.LISTINGS[0]?.PHOTOS[0]?.PHOTO_URL : ''}
                  alt="property-photo"
                  fill
                  className="object-cover rounded"
                  priority
                  sizes="100%"
                />
              )}
            </div>
            <div className="flex flex-col justify-center gap-1.5">
              <p className="font-normal"> {rentalInformation.building_address}</p>
              <p className="text-gray4">{data?.LISTINGS[0]?.NEIGHBORHOODS}</p>
              <p>
                ${rentalInformation.monthly_rent}
                <span className="text-gray4">/mo</span>
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-sm  font-medium leading-5 text-gray4">Agent Associated With This Property</p>
          <div className="flex p-4 bg-gray10 gap-2.5 text-sm font-medium leading-5">
            <div className={' h-[72px] w-[72px] rounded-full overflow-hidden bg-gray-100'}>
              <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="flex flex-col justify-center gap-0.5	text-gray7 leading-6 font-medium text-base">
              <p>{rentalInformation.agent_name}</p>
              <p className="text-gray5 font-normal">{rentalInformation.agent_email}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-6">
        <Input
          value={rentalInformation.property_address}
          label={'Property Address'}
          className={'col-span-2'}
          readonly
          onChange={() => {}}
        />

        <Input value={rentalInformation.property_unit_number} label={'Apartment'} readonly onChange={() => {}} />
        <Input
          value={parseFloat(rentalInformation.monthly_rent)}
          label={'Monthly rent'}
          type="money"
          readonly
          onChange={() => {}}
        />
        <Input
          value={rentalInformation.lease_start_date}
          label={'Lease Start Date'}
          type="date"
          readonly
          onChange={() => {}}
        />
        <Input
          value={rentalInformation.lease_end_date}
          label={'Lease End Date'}
          type="date"
          readonly
          onChange={() => {}}
        />
        <Input value={rentalInformation.landlord} label={'Current landlord'} readonly onChange={() => {}} />
        <Input
          value={rentalInformation.landlord_phone_number}
          label={"Landlord's Phone"}
          type="phone"
          readonly
          onChange={() => {}}
        />
      </div>
    </div>
  );
});

const ClientsInformation = forwardRef((props, ref) => {
  const { clientsInformation, occupants, id } = props;
  return (
    <div className=" flex flex-col gap-[24px] p-[24px]" ref={ref} id={id}>
      <p className="leading-5 font-medium text-gray7">Client's information</p>
      <div className="grid grid-cols-4 gap-y-[24px] ">
        {clientsInformation && (
          <>
            <Field
              data={clientsInformation.client_first_name + ' ' + clientsInformation.client_last_name}
              title="Full Name"
            />
            <Field data={clientsInformation.client_email} title="Email Address" />
            <Field data={clientsInformation.client_date_of_birth} title="Date of Birth" />
            <Field data={clientsInformation.client_phone_number} title="Phone number" />
            <Field
              data={clientsInformation.client_permanent_address}
              title="Permanent Address"
              className="col-span-2"
            />
            <Field data={clientsInformation.client_state} title="State" />
            <Field data={clientsInformation.client_city} title="City" />
            <Field data={clientsInformation.client_zip_code} title="Zip Code" />
            <Field data={clientsInformation.client_ssn} title="Social Security Number" />
            <Field data={clientsInformation.client_has_pets} title="Do you have pets?" />
            <Field data={clientsInformation.client_pets_description} title="Please Specify" />
            <Field
              data={clientsInformation.client_additional_comment}
              title="Additional Comment"
              className="col-span-2"
            />
            <Field
              data={occupants?.length > 0 ? 'Yes' : 'No'}
              title="Is there any other occupant?"
              className="col-span-2"
            />
          </>
        )}
      </div>
      <p className="leading-5 font-medium text-gray7">List of Other Occupants</p>
      <div className="flex flex-col gap-[24px]">
        {occupants?.map((occupant) => {
          return (
            <div className="grid grid-cols-4 gap-y-[24px]">
              <Field data={occupant.full_name} title="Full Name" />
              <Field data={occupant.email} title="Email Address" />
              <Field data={occupant.phone_number} title="Phone Number" />
              <Field data={occupant.relationship} title="Relationship" />
            </div>
          );
        })}
      </div>
    </div>
  );
});

const EmploymentInformation = forwardRef((props, ref) => {
  const { employmentInformation, id } = props;
  return (
    <div className=" flex flex-col gap-[24px] p-[24px]" ref={ref} id={id}>
      <p className="leading-5 font-medium text-gray7">Employment information</p>

      <div className="grid grid-cols-4 gap-y-[24px]">
        {employmentInformation && (
          <>
            <Field data={employmentInformation.employer} title="Employer" />
            <Field data={employmentInformation.employer_address} title="Employer Address" />
            <Field data={employmentInformation.contact_person} title="Contact Person" />
            <Field data={employmentInformation.contact_person_number} title="Contact Person Phone" />
            <Field data={employmentInformation.position_title} title="Position Title" />
            <Field data={employmentInformation.annual_compensation} title="Annual Compensation" />
            <Field data={employmentInformation.employed_since_year} title="Employed Since" />
            <Field data={employmentInformation.employment_length} title="Employment Length" />
          </>
        )}
      </div>
    </div>
  );
});

const DocumentsInformation = forwardRef((props, ref) => {
  const { documents, id, setOtherDocuementsModalVisible } = props;
  const formik = useFormikContext();
  const { download } = useDownloadAwsFile();
  const router = useRouter();

  const { data: applicationData, refetch: refetchApplicationData } = useFetchPropertyApplicationById(router.query.slug);

  const onUpdateError = () => {
    toast.error(`Unable to update document!`);
  };
  const onUpdateSuccess = () => {
    refetchApplicationData();
  };

  const { mutate: updateApplication } = useUpdatePropertyApplication({
    enabled: !!router.query.slug,
    onError: onUpdateError,
    onSuccess: onUpdateSuccess,
  });

  const filterOtherDocuments = (otherDocuments) => {
    if (otherDocuments && typeof otherDocuments === 'object' && !!Object.keys(otherDocuments).length)
      return Object.values(otherDocuments).map((document) => {
        const { presigned_url, id, position, ...rest } = document;
        return { ...rest, document_type: 'OTHER' };
      });
    else return [];
  };

  const formatDocuments = () => {
    return Object.entries(formik.values)
      .flatMap(([key, document]) => {
        if (key !== 'other_documents' && document) {
          const { presigned_url, id, position, document_type, ...rest } = document;
          return {
            ...rest,
            document_type: document_type || nameToType[rest?.name],
          };
        } else if (document) return filterOtherDocuments(formik.values.other_documents);
      })
      .filter((document) => !!document)
      .map((document) => {
        delete document.id;
        return document;
      });
  };

  const handleUpdateApplication = async () => {
    updateApplication({
      id: router.query.slug,
      applicationData: {
        ...applicationData,
        occupants: applicationData.occupants.map((occupant) => {
          delete occupant.id;
          return occupant;
        }),
        recipients: applicationData.recipients.map((recipient) => {
          delete recipient.id;
          return recipient;
        }),
        documents: formatDocuments(),
      },
    });
  };

  useEffect(() => {
    if (formik.dirty) {
      handleUpdateApplication();
    }
  }, [formik.values]);

  const onDownloadAllDocuments = () => {
    for (const document in formik.values) {
      if (formik.values[document]?.presigned_url && formik.values[document]?.name_with_format)
        download(formik.values[document].presigned_url, formik.values[document].name_with_format);
    }
  };

  return (
    <div className="flex flex-col gap-[24px] p-[24px]" ref={ref} id={id}>
      <div className="flex justify-between items-center">
        <p className="leading-5 font-medium text-gray7">Documents</p>
        <div className="space-x-4">
          <Button
            leftIcon={<UploadFileIcon className="text-gray4 h-4 w-4 rotate-180" />}
            white
            label={'Download All Documents'}
            type="button"
            onClick={onDownloadAllDocuments}
          />
          <Button
            leftIcon={<UploadFileIcon className="text-gray4 h-4 w-4" />}
            white
            label={'Upload Other Documents'}
            type="button"
            onClick={() => setOtherDocuementsModalVisible(true)}
          />
        </div>
      </div>

      {documents && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
            <FileInput name={'employment_letter'} title="Employment letter" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
            <FileInput name={'paystub_1'} title="Paystub 1" />
            <FileInput name={'paystub_2'} title="Paystub 2" />
            <FileInput name={'tax_returns'} title="Tax Returns" />
            <FileInput name={'tax_returns_2'} title="Tax Returns 2" />
            <FileInput name={'bank_statement_1'} title="Bank statement 1" />
            <FileInput name={'bank_statement_2'} title="Bank statement 2" />
            <FileInput name={'photo_id_copy'} title="Copy of Photo ID" />
            <FileInput name={'w2'} title="W2" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
            {formik.values?.other_documents &&
              Object.entries(formik.values?.other_documents)
                .map(([key, value]) => {
                  return { id: key, ...value };
                })
                .map((document) => {
                  return (
                    <FileInput
                      key={document.id}
                      title={document.name}
                      name={`other_documents.${document.id}`}
                      onRemove={async () => {
                        let other_documents = formik.values.other_documents;
                        const currentFile = getIn(formik.values, `other_documents.${document.id}`);

                        delete other_documents[currentFile.id];
                        if (!!Object.keys(other_documents).length)
                          formik.setFieldValue('other_documents', other_documents);
                        else formik.setFieldValue('other_documents', null);
                        handleUpdateApplication();
                      }}
                    />
                  );
                })}
          </div>
        </>
      )}
    </div>
  );
});

const FinancialInformation = forwardRef((props, ref) => {
  const { financials, id } = props;
  return (
    <div className=" flex flex-col gap-[24px] p-[24px]" ref={ref} id={id}>
      <p className="leading-5 font-medium text-gray7">Financials</p>

      <div className="grid grid-cols-4 gap-y-[24px]">
        {financials && (
          <>
            <Field data={financials.bank_name} title="Bank Name" />
            <Field data={financials.account_type} title="Type of Account" />
            <Field data={financials.account_number} title="Account number" />
            <Field data={financials.accountant} title="Accountant" />
            <Field data={financials.accountant_contact} title="Accounting Phone" />
          </>
        )}
      </div>
    </div>
  );
});
const OtherInformation = forwardRef((props, ref) => {
  const { other, id } = props;
  return (
    <div className=" flex flex-col gap-[24px] p-[24px]" ref={ref} id={id}>
      <p className="leading-5 font-medium text-gray7">Other info</p>

      <div className="grid grid-cols-4 gap-y-[24px]">
        {other && (
          <>
            <Field data={other.emergency_contact_name} title="Emergency Contact" />
            <Field
              data={other.emergency_contact_phone_number}
              title="Emergency Contact Phone Number"
              className="col-span-2"
            />
          </>
        )}
      </div>
    </div>
  );
});

const SignatureInformation = ({ id, signature }) => {
  return (
    <div className="flex flex-col gap-[24px] p-[24px]" id={id}>
      <p className="leading-5 font-medium text-gray7">Client's Signature</p>
      <div className=" bg-white relative border max-w-[608px] h-[170px] w-full rounded-md">
        <Image
          priority
          sizes="100%"
          alt="client signature"
          src={signature.untrimmedCanvas}
          className="object-contain"
          fill
        />
      </div>
    </div>
  );
};

const Field = ({ title = '', data = '', className = '' }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <p className="text-sm text-gray4 font-medium leading-5 ">{title}</p>
      <p className="text-sm text-gray7 leading-5 ">{data ? data : '-'}</p>
    </div>
  );
};

export default ApplicationDetails;
