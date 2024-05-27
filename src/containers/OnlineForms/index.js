import React, { useEffect, useMemo, useState } from 'react';
import OnlineFormsTable from 'containers/OnlineForms/OnlineFormsTable/Table';
import SideBarFilter from 'containers/OnlineForms/OnlineFormsTable/SideBarFilter';
import FilterBar from 'containers/OnlineForms/OnlineFormsTable/FilterBar';
import { useRouter } from 'next/router';
import SendForm from './SendFormModal';
import DeleteForm from '@components/overlays/delete-form';
import CircularProgress from '@mui/material/CircularProgress';
import { useFetchOnlineFormsTypes, useFetchOnlineFormsPaginated } from './queries/queries';
import { useDeleteForm, useDeleteFormType, usePostUpdateFormType } from './queries/mutations';
import toast from 'react-hot-toast';
import useIsScrolledToBottom from '@helpers/hooks/useIsScrolledToBottom';
import useDebounce from '@helpers/hooks/useDebouncedSearch';
import { generatePdfBlob } from './Pdf/generatePdf';
import { PdfViewer } from './Pdf';
import Button from '@components/shared/button';
import { PencilIcon } from '@heroicons/react/solid';
import { TrashIcon } from '@heroicons/react/solid';
import SlideOver from '@components/shared/slideOver';
import TrashTypeOverlay from './TrashTypeOverlay';

const OnlineForms = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [formTypeFilter, setFormTypeFilter] = useState({ id: { hex: '' }, name: 'All Forms' });
  const [showSendForm, setShowSendForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [deleteFormId, setDeleteFormId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState(undefined);
  const [debouncedSearch] = useDebounce(searchTerm, 400);
  const [isScrolledToBottom, handleScroll] = useIsScrolledToBottom();
  const [trashOverlayOpened, setTrashOverlayOpened] = useState(false);
  const router = useRouter();

  const [openedPopover, setOpenedPopover] = useState(null);
  const [openSlideover, setOpenSlideover] = useState(false);
  const [pdfRender, setPdfRender] = useState(null);
  const [loadingPdf, setLoadingPdf] = useState(false);

  const {
    data: formsTypesData,
    error: formsTypesErrors,
    isLoading: formsTypesIsLoading,
    isRefetching: formsTypesIsRefetching,
    refetch: formsTypesRefetch,
  } = useFetchOnlineFormsTypes();

  const {
    data: trashedFormsTypesData,
    error: trashedFormsTypesErrors,
    isLoading: trashedFormsTypesIsLoading,
    isRefetching: trashedFormsTypesIsRefetching,
    refetch: trashedFormsTemplatesRefetch,
  } = useFetchOnlineFormsTypes({ deleted: true });

  const fetchFormsParams = useMemo(() => {
    const { id } = formTypeFilter;
    const { hex: form_type_id } = id;
    if (currentTab == 1) {
      setStatus('PENDING');
    } else if (currentTab == 2) {
      setStatus('SIGNED');
    } else {
      setStatus(undefined);
    }

    return {
      page_size: 10,
      count_items: true,
      search_param: debouncedSearch,
      status: status,
      ...(!!form_type_id && { form_type_id }),
    };
  }, [formTypeFilter, debouncedSearch, status, currentTab]);

  const {
    data: formsData,
    error: formsErrors,
    isLoading: formsIsLoading,
    refetch: formsRefetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchOnlineFormsPaginated(fetchFormsParams);

  const onlineForms = useMemo(() => {
    if (formsData)
      return formsData?.pages
        .map((page) => {
          return page?.data?.items?.map((singlePage) => singlePage);
        })
        .flat();
    else return [];
  }, [formsData]);

  const statusButtons = useMemo(() => {
    if (formsData) {
      return [
        {
          id: 0,
          name: 'All',
          count: onlineForms.length,
        },
        {
          id: 1,
          name: 'Pending',
          count: onlineForms.length,
        },
        {
          id: 2,
          name: 'Signed',
          count: onlineForms.length,
        },
      ];
    } else return [];
  }, [formsData, onlineForms]);

  const onDeleteSuccess = () => {
    setShowDeleteForm(false);
    toast.success('Form Moved to Trash!');
    formsRefetch();
  };

  const onDeleteFormError = () => {
    toast.error('Unable to delete form!');
  };
  const { mutate: deleteFormMutate } = useDeleteForm({
    onSuccess: onDeleteSuccess,
    onError: onDeleteFormError,
  });

  const onCreateNewFormTemplate = () => {
    router.push('/online-forms/create-form-type');
  };

  const onSendFormClick = () => {
    setShowSendForm(true);
  };
  const onSendFormExit = () => {
    setShowSendForm(false);
  };

  const onCancelDeleteForm = () => {
    setShowDeleteForm(false);
  };

  const onOpenDeleteFormClick = (formId) => {
    setDeleteFormId(formId);
    setShowDeleteForm(true);
  };

  const onDeleteForm = () => {
    deleteFormMutate(deleteFormId);
    setShowDeleteForm(false);
  };

  useEffect(() => {
    if (isScrolledToBottom && hasNextPage) {
      fetchNextPage();
    }
  }, [isScrolledToBottom, hasNextPage, fetchNextPage]);

  const handleEditTemplate = (template) => {
    router.push(`/online-forms/update-form-type/${template.id.hex}`);
  };

  const handlePreviewTemplate = async (template) => {
    setOpenedPopover(template);
    setOpenSlideover(true);
    setLoadingPdf(true);
    const blob = await generatePdfBlob(template.content, true);
    const url = URL.createObjectURL(blob);
    setPdfRender(url);
    setLoadingPdf(false);
  };

  const handleDeleteTemplateSuccess = () => {
    setTrashOverlayOpened(false);
    setOpenSlideover(false);
    formsTypesRefetch();
    trashedFormsTemplatesRefetch();
    toast.success('Form Type Moved to Trash!');
  };
  const handleDeleteTemplateError = () => {
    setTrashOverlayOpened(false);
    toast.error('Unable to Move Form Type to Trash?');
  };

  const {
    isPending: isPendingDeleteTemplate,
    mutateAsync: deleteFormTemplate,
    error,
  } = useDeleteFormType({
    onSuccess: handleDeleteTemplateSuccess,
    onError: handleDeleteTemplateError,
  });

  const onDeleteTemplate = async (id) => {
    try {
      await deleteFormTemplate(id);
    } catch (e) {}
  };

  const onRestoreSuccess = () => {
    formsTypesRefetch();
    trashedFormsTemplatesRefetch();
    toast.success('Form Type Restored from Trash!');
    setOpenSlideover(false);
  };
  const onRestoreError = () => {
    toast.error('Unable to Restore Form Type from Trash!');
  };

  const { isPending: isPendingRestoreForm, mutate: updateOnlineFormTypeMutate } = usePostUpdateFormType({
    onSuccess: onRestoreSuccess,
    onError: onRestoreError,
  });

  const onRestoreFormTemplate = (template) => {
    updateOnlineFormTypeMutate({
      id: template.id.hex,
      templateData: {
        ...template,
        deleted: false,
      },
    });
  };

  if (formsTypesIsLoading || trashedFormsTypesIsLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <CircularProgress size={50} />
      </div>
    );
  }

  if (formsTypesErrors || trashedFormsTypesErrors || formsErrors) {
    return (
      <div className="w-full h-full flex justify-center items-center text-center">
        <p>Something went wrong while trying to fetch forms or templates...</p>
      </div>
    );
  }

  return (
    <div className="flex divide-x h-[calc(100vh-140px)] overflow-hidden">
      <div className="w-[320px] shrink-0 h-[calc(100vh-140px)] ">
        <SideBarFilter
          filters={[
            { id: { hex: '' }, name: 'All Forms' },
            ...(formsTypesData?.data ?? []),
            ...(trashedFormsTypesData?.data ?? []),
          ]}
          currentFilterId={formTypeFilter}
          setCurrentFilter={setFormTypeFilter}
          onPlusClick={onCreateNewFormTemplate}
          isRefetching={formsTypesIsRefetching || trashedFormsTypesIsRefetching}
          handlePreviewTemplate={handlePreviewTemplate}
          handleEditTemplate={handleEditTemplate}
          handleDeleteTemplate={onDeleteTemplate}
          isDeletingTemplate={isPendingDeleteTemplate}
          onRestoreFormTemplate={onRestoreFormTemplate}
        />
      </div>
      <div className="flex flex-col w-[calc(100%-320px)]">
        <FilterBar
          statusButtons={statusButtons}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          onSendFormClick={onSendFormClick}
          setSearchValue={setSearchTerm}
          formTypeFilter={formTypeFilter}
          handlePreviewTemplate={handlePreviewTemplate}
        />
        <div onScroll={handleScroll} className="h-[calc(100vh-140px)]  overflow-x-scroll overflow-y-scroll">
          {formsIsLoading ? (
            <div className="h-full w-full flex justify-center items-center">
              <CircularProgress size={40} />
            </div>
          ) : (
            <OnlineFormsTable onlineForms={onlineForms} onDeleteForm={onOpenDeleteFormClick} />
          )}
          {hasNextPage && (
            <div className="h-[80px] flex items-center justify-center">
              {isFetchingNextPage && <CircularProgress size={20} />}
            </div>
          )}
        </div>
        {showSendForm && <SendForm onCancel={onSendFormExit} params={fetchFormsParams} currentForm={formTypeFilter} />}
        {showDeleteForm && <DeleteForm formId={0} onCancel={onCancelDeleteForm} onDelete={onDeleteForm} />}
      </div>
      <SlideOver width="w-[663px]" open={openSlideover} setOpen={setOpenSlideover} title={openedPopover?.name ?? ''}>
        {pdfRender && !loadingPdf && (
          <div className="flex flex-col relative">
            <div className="flex justify-center h-full w-auto pb-[70px]">
              <PdfViewer pdf={pdfRender} />
            </div>
            <div className="bg-white w-[663px] fixed bottom-0 right-0 h-[70px] flex justify-between items-center px-6 shadow-[0_-2px_12px_-1px_rgba(0,0,0,0.07)]">
              <button
                onClick={() => {
                  !openedPopover.deleted ? setTrashOverlayOpened(true) : onRestoreFormTemplate(openedPopover);
                }}
                disabled={isPendingRestoreForm}
                className="text-red5 text-sm font-medium leading-5 bg-red1  rounded-md	">
                {!isPendingRestoreForm ? (
                  <div className="flex items-center gap-2 py-[9px] px-[17px]">
                    <TrashIcon className="w-5 h-5" />
                    {!openedPopover.deleted ? <span>Move to Trash</span> : <span>Restore</span>}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-[38px] w-[109px]">
                    <CircularProgress size={20} className="text-red5" />
                  </div>
                )}
              </button>
              <div className="flex items-center gap-[15px]">
                <Button white label={'Cancel'} onClick={() => setOpenSlideover(false)} />
                <Button
                  leftIcon={<PencilIcon />}
                  label="Edit Form"
                  className={'gap-x-2'}
                  onClick={() => router.push(`/online-forms/update-form-type/${openedPopover.id.hex}`)}
                />
              </div>
            </div>
          </div>
        )}
        {trashOverlayOpened && (
          <TrashTypeOverlay
            onCancel={() => setTrashOverlayOpened(false)}
            onDelete={() => onDeleteTemplate(openedPopover.id.hex)}
            isDeleting={isPendingDeleteTemplate}
          />
        )}
      </SlideOver>
    </div>
  );
};

export default OnlineForms;
