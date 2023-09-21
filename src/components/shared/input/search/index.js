import React from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import Button from 'components/shared/button';
import { useState } from 'react';

const Search = ({
  onChange,
  onInput,
  onKeyDown,
  expandable,
  name,
  id,
  placeholder,
  value,
  className,
  iconBefore,
  onClick,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {expandable ? (
        <div onClick={onClick} className={`transition-all relative rounded-md z-0 ${expanded ? 'w-full' : 'w-[45px]'}`}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center  pointer-events-none">
            {iconBefore ? iconBefore : <SearchIcon className="h-5 w-5 text-gray3 " />}
          </div>
          <input
            name={name}
            id={id}
            placeholder={expanded ? placeholder : ''}
            onInput={onInput}
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={value}
            readOnly={!expanded}
            onClick={() => setExpanded(true)}
            className={`${
              expanded ? 'pl-10' : 'cursor-pointer'
            } border border-borderColor rounded-lg bg-white px-[13px] h-[38px] w-full outline-none focus:ring-1 focus:ring-blue1 focus:border-blue1 ${className}`}
          />
        </div>
      ) : (
        <div className={`relative rounded-md shadow-sm z-0 ${className}`}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none cursor-pointer">
            {iconBefore ? iconBefore : <SearchIcon className="h-5 w-5 text-gray3" />}
          </div>
          <input
            name={name}
            id={id}
            placeholder={placeholder}
            onInput={onInput}
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={value}
            className={`pl-10 border border-borderColor rounded-lg bg-white px-[13px] h-[38px] w-full outline-none focus:ring-1 focus:ring-blue1 focus:border-blue1`}
          />
        </div>
      )}
    </>
  );
};

export default Search;
