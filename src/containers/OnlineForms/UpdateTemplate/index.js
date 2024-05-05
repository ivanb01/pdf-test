import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useFetchOnlineFormTypeById, useFetchOnlineFormsTypes } from '../queries/queries';
import { useFormik } from 'formik';
import { object, string, array } from 'yup';
import Stepper from '@components/steppper';
import { CONTACT_TYPES_OPTIONS, STEPS } from '../constants';
import { useSelector, useDispatch } from 'react-redux';
import { clearEditorState, setEditorState } from '@store/editor/slice';
import Editor from '../Editor/Editor';
import Button from '@components/shared/button';
import { ArrowNarrowRightIcon } from '@heroicons/react/solid';
import { generatePdfBlob } from '../Pdf/generatePdf';
import CircularProgress from '@mui/material/CircularProgress';
import { PdfViewer } from 'containers/OnlineForms/Pdf';
import { InformationCircleIcon } from '@heroicons/react/solid';
import Input from '@components/shared/input';
import DropdownWithSearch from '@components/dropdownWithSearch';
import { usePostUpdateFormType } from '../queries/mutations';
import toast from 'react-hot-toast';
import { deepObjectsEqual } from '@global/functions';

const UpdateTemplate = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const { editorState, isEditorEmpty, formFields } = useSelector((state) => state.editor);
  const {
    isLoading: loadingTemplateData,
    isRefetching: refetchingTemplateData,
    data: templateData,
    error: errorTemplateData,
  } = useFetchOnlineFormTypeById(router.query.id);
  const dispatch = useDispatch();
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [render, setRender] = useState(null);
  const { refetch: formsTypesRefetch } = useFetchOnlineFormsTypes();
  const [isEditorUpdated, setEditorUpdated] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(clearEditorState());
    };
  }, []);
  useEffect(() => {
    if (templateData && !loadingTemplateData && !refetchingTemplateData) {
      dispatch(setEditorState(templateData.data.content));
    }
  }, [templateData]);

  useEffect(() => {
    if (templateData) {
      if (!deepObjectsEqual(editorState, templateData.data.content)) {
        setEditorUpdated(true);
      } else {
        setEditorUpdated(false);
      }
    }
  }, [editorState, templateData]);

  const onUpdateFormTypeSuccess = () => {
    router.push('/online-forms');
    dispatch(clearEditorState());
    toast.success('Form type updated successfully!');
    formsTypesRefetch();
  };

  const onUpdateFormTypeError = () => {
    toast.error('Unable to update form type!');
  };

  const { isPending: updateOnlineFormTypeIsPending, mutate: updateOnlineFormTypeMutate } = usePostUpdateFormType({
    onSuccess: onUpdateFormTypeSuccess,
    onError: onUpdateFormTypeError,
  });

  const templateFormData = useMemo(() => {
    if (templateData) {
      const { contact_type, name, created_by } = templateData.data;
      return {
        name,
        contact_type: contact_type.map((type) => {
          const capitalized = type.toLowerCase().charAt(0).toUpperCase() + type.toLowerCase().slice(1);
          const contactTypeWithValue = CONTACT_TYPES_OPTIONS.find((option) => option.label === capitalized);
          return contactTypeWithValue;
        }),
        created_by,
      };
    } else return {};
  }, [templateData]);

  const FormTemplateSchema = object().shape({
    name: string().required('Form name is required.'),
    contact_type: array().min(1, 'Contact type is required.'),
    created_by: string().required('Created by is required'),
  });

  const onSubmitForm = () => {
    const formattedFormTypesObject = Object.assign(
      {},
      ...Object.values(formFields).map((field) => {
        const { id, ...rest } = field;
        return { [id]: rest };
      }),
    );

    const { name, contact_type, created_by } = formik.values;

    updateOnlineFormTypeMutate({
      id: router.query.id,
      templateData: {
        name,
        created_by,
        contact_type: contact_type.map((type) => type.label.toUpperCase()),
        fields: formattedFormTypesObject,
        content: editorState,
      },
    });
  };

  const formik = useFormik({
    initialValues: {
      ...templateFormData,
    },
    validationSchema: FormTemplateSchema,
    validateOnChange: false,
    validateOnBlur: false,
    enableReinitialize: true,

    onSubmit: onSubmitForm,
  });

  const onPreviewClick = async () => {
    setLoadingPdf(true);
    const blob = await generatePdfBlob(editorState, true);
    const url = URL.createObjectURL(blob);
    setRender(url);
    setLoadingPdf(false);
    setCurrentStep(2);
  };

  if (errorTemplateData) {
    return <div className="w-full h-full flex justify-center items-center">Something went worng...</div>;
  }

  if (loadingTemplateData || refetchingTemplateData) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <CircularProgress size={40} />
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white relative overflow-hidden">
      <Stepper steps={STEPS} currentStep={currentStep} title="Edit form" />

      <div className={`w-full h-[calc(100%-140px)] overflow-y-scroll flex justify-center z-0 `}>
        {currentStep === 1 && templateData && !loadingTemplateData && (
          <div className="w-[770px]">
            {editorState && <Editor initialEditorState={editorState} />}
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

                <form onSubmit={formik.handleSubmit} className="grid grid-cols-2 gap-6">
                  <Input
                    type="text"
                    label="Form name*"
                    id="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    className={'[&_input]:h-[38px]'}
                    error={formik.touched.name && formik.errors.name && !formik.values.name}
                    errorText={formik.errors.name}
                  />
                  <div>
                    <DropdownWithSearch
                      isMulti
                      label="Contact type*"
                      options={CONTACT_TYPES_OPTIONS}
                      value={formik.values.contact_type}
                      onChange={(choice) => {
                        formik.setFieldValue('contact_type', choice);
                      }}
                      error={
                        formik.touched.contact_type && formik.errors.contact_type && !formik.values.contact_type.length
                      }
                      errorText={formik.errors.contact_type}
                    />
                  </div>

                  <Input
                    type="text"
                    label="Created By*"
                    id="created_by"
                    onChange={formik.handleChange}
                    value={formik.values.created_by}
                    readonly
                    className="[&_input]:bg-transparent focus:[&_input]:ring-0 focus:[&_input]:border-borderColor [&_input]:h-[38px]"
                  />
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="bg-white absolute w-full flex h-[70px] justify-end items-center gap-[12px] px-6 shadow-[0_-2px_12px_-1px_rgba(0,0,0,0.07)] ronded-b-lg bottom-0">
        {currentStep === 1 && (
          <>
            <Button label="Cancel" secondary white onClick={router.back} />
            <Button
              onClick={onPreviewClick}
              className="flex w-[185px] gap-2 items-center justify-center"
              disabled={isEditorEmpty || !isEditorUpdated}
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

            <Button loading={updateOnlineFormTypeIsPending} onClick={formik.handleSubmit}>
              Save
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default UpdateTemplate;
