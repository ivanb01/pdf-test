import { useState } from 'react';
import Editor from '../Editor/Editor';
import Stepper from '@components/steppper';
import Button from '@components/shared/button';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowNarrowRightIcon } from '@heroicons/react/solid';
import { PdfViewer } from 'containers/OnlineForms/Pdf';
import { STEPS, CONTACT_TYPES_OPTIONS } from '../constants';
import { InformationCircleIcon } from '@heroicons/react/solid';
import Input from '@components/shared/input';
import { useFormik } from 'formik';
import { object, string, array } from 'yup';
// import Image from 'next/image';
import useDetectOverflow from '@helpers/hooks/useDetectOverflow';
import { useRouter } from 'next/router';
import { clearEditorState } from '@store/editor/slice';
// import clsx from 'clsx';
// import CircularProgress from '@mui/material/CircularProgress';
import { usePostOnlineFormType } from '../queries/mutations';
import { useFetchAllClients, useFetchOnlineFormsTypes } from '../queries/queries';
import toast from 'react-hot-toast';
import { deepObjectsEqual } from '@global/functions';
import { generatePdfBlob } from 'containers/OnlineForms/Pdf/generatePdf';
import DropdownWithSearch from '@components/dropdownWithSearch';

const FormBuilder = () => {
  const { editorState, isEditorEmpty, formFields } = useSelector((state) => state.editor);
  const [currentStep, setCurrentStep] = useState(1);
  const [render, setRender] = useState(null);
  const user = useSelector((state) => state.global.user);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [isTableOverflow, clientsContainerRef, clientsTableRef] = useDetectOverflow();
  const router = useRouter();
  const dispatch = useDispatch();
  const { refetch: formsTypesRefetch } = useFetchOnlineFormsTypes();
  const [lastGeneratedPdf, setLastGeneratedPdf] = useState(null);

  const onPostFormTypeSuccess = () => {
    router.push('/online-forms');
    dispatch(clearEditorState());
    toast.success('Form type saved successfully!');
    formsTypesRefetch();
  };

  const onPostFormTypeError = () => {
    toast.error('Unable to save form type!');
  };

  const { isPending: postOnlineFormTypeIsPending, mutate: postOnlineFormTypeMutate } = usePostOnlineFormType({
    onSuccess: onPostFormTypeSuccess,
    onError: onPostFormTypeError,
  });

  const FormTemplateSchema = object().shape({
    name: string().required('Form name is required.'),
    contact_type: array().min(1, 'Contact type is required.'),
    created_by: string().required('Created by is required'),
    share_with: string(),
    selected: array().of(string()),
  });

  const onSubmitForm = () => {
    const formattedFormTypesObject = Object.assign(
      {},
      ...Object.values(formFields).map((field) => {
        const { id, ...rest } = field;
        return { [id]: rest };
      }),
    );

    const { name, contact_type, created_by } = values;

    postOnlineFormTypeMutate({
      name,
      created_by,
      contact_type: contact_type.map((type) => type.label.toUpperCase()),
      fields: formattedFormTypesObject,
      content: editorState,
    });
  };

  const { handleSubmit, handleChange, values, errors, setFieldValue, touched } = useFormik({
    initialValues: {
      name: '',
      contact_type: [],
      created_by: user,
      share_with: '',
      selected: [],
    },
    validationSchema: FormTemplateSchema,
    validateOnChange: false,
    validateOnBlur: false,

    onSubmit: onSubmitForm,
  });

  const {
    data: clientsData,
    errors: clientsErrors,
    isLoading: clientsIsLoading,
    isSuccess: clientsIsSuccess,
  } = useFetchAllClients();

  const onPreviewClick = async () => {
    if (deepObjectsEqual(lastGeneratedPdf, editorState)) {
      setCurrentStep(2);
    } else {
      setLoadingPdf(true);
      const blob = await generatePdfBlob(editorState, true);
      const url = URL.createObjectURL(blob);
      setRender(url);
      setLoadingPdf(false);
      setLastGeneratedPdf(editorState);
      setCurrentStep(2);
    }
  };

  return (
    <div className="w-full h-full bg-white relative overflow-hidden">
      <Stepper steps={STEPS} currentStep={currentStep} title={'Create Form'} />

      <div className={`w-full h-[calc(100%-140px)] overflow-y-scroll flex justify-center z-0 `}>
        {currentStep === 1 && (
          <div className="w-[770px]">
            <Editor initialEditorState={editorState} />
            <div className="h-[10px]" />
          </div>
        )}
        {currentStep === 2 && (
          <div className="flex w-full divide-x-[1px] divide-gray2 ">
            <div className=" pt-[30px] px-[30px] flex items-center justify-center overflow-y-scroll shrink-0 grow w-1/2">
              <div className="h-full ">
                {!loadingPdf && <PdfViewer pdf={render} />}
                <div className="h-[20px]" />
              </div>
            </div>

            <div className="w-full h-full bg-gray10 shrink grow p-6 pt-7 flex flex-col">
              <div className="flex flex-col gap-[40px] mb-[5px]">
                <div className="flex items-start gap-x-2">
                  <InformationCircleIcon className="h-[18px] w-[18px] text-gray3 shrink-0 grow-0 mt-[3px]" />
                  <span className="leading-5 text-gray5 text-sm	max-w-[520px]">
                    Please name the form and choose the type of the contact this form stands for. This will help you
                    find the right form in the right time.
                  </span>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
                  <Input
                    type="text"
                    label="Form name*"
                    id="name"
                    onChange={handleChange}
                    value={values.name}
                    className={'[&_input]:h-[38px]'}
                    error={touched.name && errors.name && !values.name}
                    errorText={errors.name}
                  />
                  <div>
                    <DropdownWithSearch
                      isMulti
                      label="Contact type*"
                      options={CONTACT_TYPES_OPTIONS}
                      value={values.contact_type}
                      onChange={(choice) => {
                        setFieldValue('contact_type', choice);
                      }}
                      error={touched.contact_type && errors.contact_type && !values.contact_type.length}
                      errorText={errors.contact_type}
                    />
                  </div>

                  <Input
                    type="text"
                    label="Created By*"
                    id="created_by"
                    onChange={handleChange}
                    value={values.created_by}
                    readonly
                    className="[&_input]:bg-transparent focus:[&_input]:ring-0 focus:[&_input]:border-borderColor [&_input]:h-[38px]"
                  />
                </form>
                {/* <div className="flex gap-[5px] items-center justify-between">
                  <div className="flex gap-[5px] items-center">
                    <span>Share this custom form with (optional)</span>
                    <button title="Sharing custom form with a contact allows this contact to have/use this template too.">
                      <InformationCircleIcon className="h-[18px] w-[18px] text-gray3 shrink-0 grow-0 " />
                    </button>
                  </div>
                  <div className="flex items-center gap-[5px] pr-6 text-xs leading-4 text-overlayBackground">
                    <span>select all</span>
                    {clientsIsSuccess && !clientsIsLoading && (
                      <Input
                        type="checkbox"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFieldValue(
                              'selected',
                              clientsData?.data?.data.map((client) => client.id.toString()),
                            );
                          } else setFieldValue('selected', []);
                        }}
                        checked={clientsData?.data?.data?.length === values.selected.length}
                      />
                    )}

                    {clientsIsLoading && <CircularProgress size={10} />}
                  </div>
                </div> */}
              </div>

              {/* <div
                className={`h-full border-[1px] border-gray2 bg-white rounded-md overflow-y-scroll `}
                ref={clientsContainerRef}
              >
                <div
                  className={clsx('[&>*]:border-b-[1px] ', {
                    ['last:[&>*]:border-b-0']: isTableOverflow,
                  })}
                  ref={clientsTableRef}
                >
                  {clientsIsSuccess &&
                    !clientsIsLoading &&
                    clientsData?.data?.data.map(({ id, first_name, last_name, email }) => {
                      return (
                        <div className="flex justify-between items-center px-6 py-4 " onSubmit={handleSubmit} key={id}>
                          <div className="flex items-center gap-3">
                            <Image
                              src={'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'}
                              alt=""
                              width={40}
                              height={40}
                              className="rounded-full"
                            />
                            <div className="flex flex-col">
                              <span className="text-sm leading-5 font-medium text-gray7">{`${first_name} ${last_name} `}</span>
                              <span className="text-sm leading-5 text-gray4">{`${email}`}</span>
                            </div>
                          </div>

                          <Input
                            type="checkbox"
                            onChange={handleChange}
                            name="selected"
                            value={id}
                            checked={!!values.selected.includes(id.toString())}
                          />
                        </div>
                      );
                    })}
                </div>
                {clientsIsLoading && (
                  <div className="w-full h-full flex justify-center items-center">
                    <CircularProgress size={20} />
                  </div>
                )}
                {clientsErrors && (
                  <div className={'w-full h-full flex justify-center items-center'}>
                    <p className="leading-5 text-sm text-gray4 text-center ">Error while trying to load clients..</p>
                  </div>
                )}
                {!clientsIsSuccess && clientsErrors && (
                  <div className="w-full h-full flex justify-center items-center">
                    <p>Error fetching clients data...</p>
                  </div>
                )}
              </div> */}
            </div>
          </div>
        )}
      </div>

      <div className="absolute w-full flex h-[70px] justify-end items-center gap-[12px] px-6 shadow-[0_-2px_12px_-1px_rgba(0,0,0,0.07)] ronded-b-lg bottom-0">
        {currentStep === 1 && (
          <>
            <Button label="Cancel" secondary white onClick={router.back} />
            <Button
              onClick={onPreviewClick}
              className="flex w-[185px] gap-2 items-center justify-center"
              disabled={isEditorEmpty}
              loading={loadingPdf}>
              Preview and Save
              <ArrowNarrowRightIcon className="w-4 h-4" />
            </Button>
          </>
        )}
        {currentStep === 2 && (
          <>
            <Button
              label="Cancel"
              secondary
              disabled={isEditorEmpty || loadingPdf}
              white
              onClick={() => {
                setCurrentStep(1);
              }}
            />

            <Button loading={postOnlineFormTypeIsPending} onClick={handleSubmit}>
              Save
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default FormBuilder;
