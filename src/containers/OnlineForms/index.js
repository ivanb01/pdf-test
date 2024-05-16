import React, { useEffect, useMemo, useState } from 'react';
import OnlineFormsTable from 'containers/OnlineForms/OnlineFormsTable/Table';
import SideBarFilter from 'containers/OnlineForms/OnlineFormsTable/SideBarFilter';
import FilterBar from 'containers/OnlineForms/OnlineFormsTable/FilterBar';
import { useRouter } from 'next/router';
import SendForm from './SendFormModal';
import DeleteForm from '@components/overlays/delete-form';
import CircularProgress from '@mui/material/CircularProgress';
import { useFetchOnlineFormsTypes, useFetchOnlineFormsPaginated } from './queries/queries';
import { useDeleteForm } from './queries/mutations';
import toast from 'react-hot-toast';
import useIsScrolledToBottom from '@helpers/hooks/useIsScrolledToBottom';
import useDebounce from '@helpers/hooks/useDebouncedSearch';
import { generatePdfBlob } from './Pdf/generatePdf';
import { PdfViewer } from './Pdf';
import Button from '@components/shared/button';
import { PencilIcon } from '@heroicons/react/solid';
import { TrashIcon } from '@heroicons/react/solid';
import SlideOver from '@components/shared/slideOver';

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
  } = useFetchOnlineFormsTypes();

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

  if (formsTypesIsLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <CircularProgress size={50} />
      </div>
    );
  }

  if (formsTypesErrors || formsErrors) {
    return (
      <div className="w-full h-full flex justify-center items-center text-center">
        <p>Something went wrong while trying to fetch forms or templates...</p>
      </div>
    );
  }

  return (
    <div className="flex divide-x-[1px] h-[calc(100vh-140px)]">
      <div className="w-[320px] shrink-0 h-[calc(100vh-140px)] overflow-y-scroll">
        <SideBarFilter
          filters={[{ id: { hex: '' }, name: 'All Forms' }, ...(formsTypesData?.data ?? [])]}
          currentFilterId={formTypeFilter}
          setCurrentFilter={setFormTypeFilter}
          onPlusClick={onCreateNewFormTemplate}
          isRefetching={formsTypesIsRefetching}
          handlePreviewTemplate={handlePreviewTemplate}
          handleEditTemplate={handleEditTemplate}
        />
      </div>
      <div className="flex flex-col divide-y-[1px] w-[calc(100%-320px)]">
        <FilterBar
          statusButtons={statusButtons}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          onSendFormClick={onSendFormClick}
          setSearchValue={setSearchTerm}
          formTypeFilter={formTypeFilter}
          handlePreviewTemplate={handlePreviewTemplate}
        />
        <div onScroll={handleScroll} className=" h-[calc(100vh-140px)]  overflow-x-scroll overflow-y-scroll">
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
              <button className="flex items-center gap-2 text-red5 text-sm font-medium leading-5 bg-red1 py-[9px] px-[17px] rounded-md	">
                <TrashIcon className="w-5 h-5" />
                <span>Move to Trash</span>
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
      </SlideOver>
    </div>
  );
};

export default OnlineForms;
