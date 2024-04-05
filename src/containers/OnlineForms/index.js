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

const OnlineForms = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [formTypeFilter, setFormTypeFilter] = useState({ id: '', name: 'All Forms' });
  const [showSendForm, setShowSendForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [deleteFormId, setDeleteFormId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch] = useDebounce(searchTerm, 400);
  const [isScrolledToBottom, handleScroll] = useIsScrolledToBottom();
  const router = useRouter();

  const {
    data: formsTypesData,
    error: formsTypesErrors,
    isLoading: formsTypesIsLoading,
    isRefetching: formsTypesIsRefetching,
  } = useFetchOnlineFormsTypes();

  const fetchFormsParams = useMemo(() => {
    const { id: form_type_id } = formTypeFilter;
    return {
      page_size: 10,
      count_items: true,
      search_param: debouncedSearch,
      ...(!!form_type_id && { form_type_id }),
    };
  }, [formTypeFilter, debouncedSearch]);

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
          return page?.data?.data?.map((singlePage) => singlePage);
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
          count: 0,
        },
        {
          id: 2,
          name: 'Signed',
          count: 0,
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
          filters={[{ id: '', name: 'All Forms' }, ...(formsTypesData?.data ?? [])]}
          currentFilterId={formTypeFilter}
          setCurrentFilter={setFormTypeFilter}
          onPlusClick={onCreateNewFormTemplate}
          isRefetching={formsTypesIsRefetching}
        />
      </div>
      <div className="flex flex-col divide-y-[1px] w-[calc(100%-320px)]">
        <FilterBar
          currentFormName={formTypeFilter?.name}
          statusButtons={statusButtons}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          onSendFormClick={onSendFormClick}
          setSearchValue={setSearchTerm}
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
    </div>
  );
};

export default OnlineForms;
