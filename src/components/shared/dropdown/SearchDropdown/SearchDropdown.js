// import React from 'react';
// import { useQuery, useInfiniteQuery } from '@tanstack/react-query';

// const SearchDropdown = ({ children, queryParams, isPaginated = false, queryParams }) => {
//   const query = useQuery({
//     // queryKey: [`property-${id}`],
//     // queryFn: queryFn,
//     queryParams,
//     enabled: !!isPaginated,
//     ...options,
//   });
//   const infiniteQuery = useInfiniteQuery({
//     // queryKey: [`property-${id}`],
//     // queryFn: queryFn,
//     queryParams,

//     enabled: !!isPaginated,
//     ...options,
//   });
//   return <div>{children}</div>;
// };

// const Input = () => {
//     const { setOpen } = useContext(ApiInputDropdownContext);
//   const { searchValue, setSearchValue, label, ...rest } = props;

//   return (
//     <div className="flex flex-col ">
//       <Input
//         label={label}
//         onChange={(event) => setSearchValue(event.target.value)}
//         value={searchValue}
//         iconAfter={<SearchIcon className="text-gray3" height={20} />}
//         onFocus={() => setOpen(true)}
//         {...rest}
//       />
//     </div>)
// };
// const List = () => {
//   return <div>list</div>;
// };
// SearchDropdown.Input = Input;
// SearchDropdown.List = List;

// export default SearchDropdown;

// queryKey: [`property-applications-search-${search_param}`, { ...params }],
// queryFn: (query) => {
//   return fetchPropertyApplications({ page: query.pageParam, ...params });
// },

// initialPageParam: 1,
// getNextPageParam: (lastPage, allPages, lastPageParam) => {
//   return lastPage.data.has_next_page ? lastPageParam + 1 : undefined;
// },
// refetchOnWindowFocus: false,
// select: (data) => {
//   return {
//     ...data,
//     pages: data.pages.map((page) => {
//       const pageData = {
//         ...page.data,
//         data: { data: page.data.items },
//       };
//       delete pageData.items;
//       return {
//         ...page,
//         ...pageData,
//       };
//     }),
//   };
// },
// ...options,

import React, { useEffect, useState, createContext, useContext, cloneElement, Children, useRef } from 'react';
import clsx from 'clsx';
import Input from '@components/shared/input';
import { SearchIcon } from '@heroicons/react/solid';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import useDebouncedValue from 'hooks/useDebounceValue';

const SearchDropdownContext = createContext();

const SearchDropdown = ({ children, ...props }) => {
  const { queryParams, searchParamName, isPaginated = false, requestParams = {} } = props;
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const [searchValue, setSearchValue] = useState('');
  const debounceValue = useDebouncedValue(searchValue, 500);

  const { queryKey, queryFn: queryFunction, ...rest } = queryParams;
  console.log('searchParamName', searchParamName);

  const query = useQuery({
    queryKey: [...queryKey, debounceValue],
    queryFn: () =>
      queryFunction({
        [searchParamName]: debounceValue,
        ...requestParams,
      }),
    enabled: !isPaginated,
    select: ({ data }) => data,
    ...rest,
  });

  console.log('query', query.data);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <SearchDropdownContext.Provider
      value={{
        open,
        setOpen,
        setSearchValue,
      }}>
      <div className="relative" ref={wrapperRef}>
        {Children?.map(children, (child) => cloneElement(child))}
      </div>
    </SearchDropdownContext.Provider>
  );
};

const SearchInput = ({ children, ...props }) => {
  const { setOpen, setSearchValue } = useContext(SearchDropdownContext);
  const { searchValue, label, ...rest } = props;

  return (
    <div className="flex flex-col ">
      <Input
        label={label}
        onChange={(event) => setSearchValue(event.target.value)}
        value={searchValue}
        iconAfter={<SearchIcon className="text-gray3" height={20} />}
        onFocus={() => setOpen(true)}
        {...rest}
      />
    </div>
  );
};

const List = ({ children, className, ...props }) => {
  const { open } = useContext(SearchDropdownContext);
  return (
    <>
      {open && (
        <div
          className={clsx(
            'bg-white absolute flex flex-col w-full max-h-[250px] overflow-y-scroll z-[999] top-[68px] ',
            className,
          )}>
          <ul>{Children?.map(children, (child) => cloneElement(child))}</ul>
        </div>
      )}
    </>
  );
};

const ListItem = ({ children, ...props }) => {
  const { onItemClick } = props;
  const { setOpen } = useContext(SearchDropdownContext);

  return (
    <li
      className="flex flex-col iten.between overflow-y-scroll h-full min-w-full  text-gray-900 text-sm z-[999]"
      onMouseDown={() => {
        onItemClick();
        setOpen(false);
      }}>
      {children}
    </li>
  );
};

SearchDropdown.List = List;
SearchDropdown.ListItem = ListItem;
SearchDropdown.SearchInput = SearchInput;

export default SearchDropdown;
