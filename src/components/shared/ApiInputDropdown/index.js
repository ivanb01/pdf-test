import React, { useEffect, useState, createContext, useContext, cloneElement, Children, useRef } from 'react';
import clsx from 'clsx';
import Input from '../input';
import { SearchIcon } from '@heroicons/react/solid';

const ApiInputDropdownContext = createContext();

const ApiInputDropdown = ({ children, ...props }) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

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
    <ApiInputDropdownContext.Provider
      value={{
        open,
        setOpen,
      }}>
      <div className="relative" ref={wrapperRef}>
        {Children?.map(children, (child) => cloneElement(child))}
      </div>
    </ApiInputDropdownContext.Provider>
  );
};

const SearchInput = ({ children, ...props }) => {
  const { setOpen } = useContext(ApiInputDropdownContext);
  const { searchValue, setSearchValue, label, ...rest } = props;

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

const ListContainer = ({ children, ...props }) => {
  const { className, isLoading } = props;
  let render = null;

  if (React.isValidElement(children)) {
    render = children;
  }

  if (!React.isValidElement(children) && Array.isArray(children)) {
    const List = children.find((child) => child.type.name === 'List');
    const EmptyList = children.find((child) => child.type.name === 'EmptyList');
    const Loading = children.find((child) => child.type.name === 'Loading');

    if (List?.props?.children?.length) render = List;
    else render = EmptyList;

    if (isLoading && Loading) render = Loading;
  }

  return (
    <div className={clsx('absolute bg-white max-h-[250px] w-full z-[999] top-[68px] overflow-y-scroll', className)}>
      {render}
    </div>
  );
};

const List = ({ children, className, ...props }) => {
  const { open } = useContext(ApiInputDropdownContext);

  return <>{open && <div className={clsx('bg-white flex flex-col ', className)}>{children}</div>}</>;
};

const ListItem = ({ children, ...props }) => {
  const { onItemClick } = props;
  const { setOpen } = useContext(ApiInputDropdownContext);

  return (
    <li
      className="flex flex-col  overflow-y-scroll h-full min-w-full  text-gray-900 text-sm z-[999]"
      onMouseDown={() => {
        onItemClick();
        setOpen(false);
      }}>
      {children}
    </li>
  );
};

const EmptyList = ({ children }) => {
  const { open } = useContext(ApiInputDropdownContext);

  return (
    <>
      {open && (
        <div className="h-[250px]">
          <div className="h-full w-full">{children}</div>
        </div>
      )}
    </>
  );
};

const Loading = ({ children }) => {
  const { open } = useContext(ApiInputDropdownContext);

  return (
    <>
      {open && (
        <div className="h-[250px]">
          <div className="h-full w-full">{children}</div>
        </div>
      )}
    </>
  );
};

ApiInputDropdown.List = List;
ApiInputDropdown.ListContainer = ListContainer;
ApiInputDropdown.Loading = Loading;
ApiInputDropdown.EmptyList = EmptyList;
ApiInputDropdown.ListItem = ListItem;
ApiInputDropdown.SearchInput = SearchInput;

export default ApiInputDropdown;
