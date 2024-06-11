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
  const { searchValue, setSearchValue, label } = props;
  return (
    <div className="flex flex-col ">
      <Input
        label={label}
        placeholder="Search here, or fill the information below"
        onChange={(event) => setSearchValue(event.target.value)}
        value={searchValue}
        iconAfter={<SearchIcon className="text-gray3" height={20} />}
        onFocus={() => setOpen(true)}
      />
    </div>
  );
};

const List = ({ children, className, ...props }) => {
  const { open } = useContext(ApiInputDropdownContext);
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
  const { setOpen } = useContext(ApiInputDropdownContext);

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

ApiInputDropdown.List = List;
ApiInputDropdown.ListItem = ListItem;
ApiInputDropdown.SearchInput = SearchInput;

export default ApiInputDropdown;
