import React, { useEffect, useRef, useState } from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import { useQuery } from '@tanstack/react-query';
import useDebounce from '@helpers/hooks/useDebouncedSearch';
import CircularProgress from '@mui/material/CircularProgress';
import { clsx } from 'clsx';
import NotificationAlert from '../alert/notification-alert';

const SearchInputSelectContext = React.createContext();

const SearchInputSelect = (props) => {
  const { fetchOptions, setValues, label, error: formError, placeholder, ...rest } = props;
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const [isInputFocused, setInputFocused] = useState(false);
  const [selectedValues, setSelectedvalues] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearch, debouncing] = useDebounce(searchValue, 500);

  const toggleFocus = React.useCallback(() => {
    setInputFocused(true);
    setOpen(true);
  }, []);
  const toggleBlur = React.useCallback(() => {
    setInputFocused(false);
    setOpen(false);
  }, []);

  const { data, errors, isLoading, isSuccess } = useQuery({
    queryKey: [`${fetchOptions.queryKey}-${debouncedSearch}`],
    queryFn: async () => {
      const { data } = await fetchOptions.queryFn({
        search_term: debouncedSearch,
      });
      return data;
    },
    enabled: !!searchValue,
  });
  const onChange = (e) => {
    setSearchValue(e.target.value);
  };

  const onRemoveSelectedItem = (id) => {
    const selectedCopy = [...selectedValues];
    setSelectedvalues(
      selectedCopy.filter((selectedItem) => {
        return selectedItem.id !== id;
      }),
    );
  };

  const onListItemAdd = (item) => {
    setSelectedvalues([...selectedValues, item]);
    setSearchValue('');
  };

  useEffect(() => {
    setValues(selectedValues);
  }, [selectedValues]);

  return (
    <SearchInputSelectContext.Provider
      value={{
        open,
        containerRef,
        toggleFocus,
        toggleBlur,
        value,
        setValue,
        searchValue,
        setSearchValue,
        onChange,
        data,
        setSelectedvalues,
        selectedValues,
        inputRef,
        onRemoveSelectedItem,
        onListItemAdd,
        isInputFocused,
        setInputFocused,
        isLoading,
        formError,
        debouncing,
        placeholder,
      }}
    >
      <div className="flex flex-col gap-[4px] relative">
        <p className="text-sm font-medium text-gray6">{label}</p>
        {React.Children.map(rest.children, (child) =>
          React.cloneElement(child, {
            open,
            containerRef,
            toggleFocus,
            toggleBlur,
            setValue,
            searchValue,
            onChange,
            data,
            setSelectedvalues,
            selectedValues,
            inputRef,
            onRemoveSelectedItem,
            onListItemAdd,
            isInputFocused,
            setInputFocused,
            isLoading,
            formError,
            debouncing,
          }),
        )}
      </div>
    </SearchInputSelectContext.Provider>
  );
};

function Input(props) {
  const { render, formError, ...rest } = props;

  const {
    containerRef,
    toggleFocus,
    toggleBlur,
    searchValue,
    onChange,
    selectedValues,
    inputRef,
    onRemoveSelectedItem,
    isInputFocused,
    isLoading,
    placeholder,
  } = React.useContext(SearchInputSelectContext);

  const inputClassname = clsx(
    'relative flex justify-between border-[1px] rounded-[6px] py-[9px] px-[12px] cursor-text',
    {
      ['border-lightBlue3']: isInputFocused,
    },
  );

  const searchIconClassname = clsx('h-5 w-5 text-gray3 ', {
    ['text-lightBlue3']: isInputFocused,
  });

  return (
    <div>
      <div
        ref={containerRef}
        onClick={() => {
          inputRef.current.focus();
          toggleFocus(true);
        }}
        onBlur={toggleBlur}
        className={inputClassname}
      >
        <div className="flex flex-wrap gap-[8px] grow">
          {render(selectedValues, onRemoveSelectedItem)}
          <input
            className="grow border-0 outline-0 placeholder:text-overlayBackground placeholder:text-sm text-sm text-gray7 leading-5 "
            value={searchValue}
            onChange={onChange}
            ref={inputRef}
            placeholder={placeholder}
          />
        </div>
        <div className="">
          {isLoading ? (
            <div className=" flex justify-center items-center ">
              <CircularProgress size={20} />
            </div>
          ) : (
            <SearchIcon className={searchIconClassname} />
          )}
        </div>
      </div>
      {formError && (
        <NotificationAlert className="mt-2 p-2" type={'error'}>
          {formError}
        </NotificationAlert>
      )}
    </div>
  );
}

function List({ render, noDataComponent }) {
  const { open, containerRef, selectedValues, data, searchValue, isLoading, debouncing } =
    React.useContext(SearchInputSelectContext);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    if (containerRef?.current) {
      setContainerHeight(containerRef.current.getBoundingClientRect().height);
    }
  }, [selectedValues, containerRef]);

  return (
    <>
      {open && (
        <ul
          style={{ top: containerHeight + 24 }}
          className={
            'absolute bg-white w-full  max-h-[216px] z-[500] overflow-scroll shadow-[0px_2px_4px_-1px_rgba(0,0,0,0.3),0px_4px_6px_-1px_rgba(0,0,0,0.1)] rounded rounded-t-0 '
          }
        >
          {render(
            data?.data.filter((item) => {
              if (selectedValues) return !selectedValues.some((selectedItem) => selectedItem.id === item.id);
            }),
          )}
          {!isLoading &&
            Array.isArray(data?.data) &&
            !data?.data.length &&
            searchValue &&
            !debouncing &&
            noDataComponent}
        </ul>
      )}
    </>
  );
}

function ListItem({ children, value }) {
  const { onListItemAdd } = React.useContext(SearchInputSelectContext);

  return (
    <li
      className="hover:bg-lightBlue1 cursor-pointer"
      onMouseDown={() => {
        onListItemAdd(value);
      }}
    >
      {children}
    </li>
  );
}

SearchInputSelect.Input = Input;
SearchInputSelect.List = List;
SearchInputSelect.ListItem = ListItem;

export default SearchInputSelect;
