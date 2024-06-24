import React, { useEffect, useRef } from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import clsx from 'clsx';
import CancelIcon from '/public/icons/cancel.svg';
import Image from 'next/image';

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
  onClick = () => {},
  border,
}) => {
  const inputRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (focused || hovered || !!value) setExpanded(true);
    else setExpanded(false);
  }, [hovered, focused]);

  const onContainerClick = (e) => {
    onClick(e);
    setExpanded(true);
    inputRef.current.focus();
  };

  const onValueChange = (e) => {
    onChange(e.target.value);
  };

  const onRemoveClick = (e) => {
    onChange('');
  };

  return (
    <>
      {expandable ? (
        <div
          onClick={onContainerClick}
          className={clsx(
            `transition-[width] relative rounded-md z-0`,
            { 'w-full': expanded },
            { 'w-[45px]': !expanded },
          )}
          onMouseEnter={() => {
            setHovered(true);
          }}
          onMouseLeave={() => {
            setHovered(false);
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}>
          <div className={'absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'}>
            {iconBefore ? iconBefore : <SearchIcon className="h-5 w-5 text-gray3 " />}
          </div>
          <input
            ref={inputRef}
            name={name}
            id={id}
            placeholder={expanded ? placeholder : ''}
            onInput={onInput}
            onChange={onValueChange}
            onKeyDown={onKeyDown}
            value={value}
            readOnly={!expanded}
            className={`${
              expanded ? 'pl-10' : 'cursor-pointer'
            }  border border-borderColor rounded-lg bg-white px-[13px] h-[38px] w-full outline-none focus:ring-1 focus:ring-blue1 focus:border-blue1 ${className}`}
          />

          <button
            onClick={onRemoveClick}
            className={clsx(
              'absolute right-3 top-0 h-full flex items-center transition-opacity',
              { 'opacity-0': !expanded },
              { 'opacity-100': expanded },
            )}>
            <Image src={CancelIcon} className="w-[20px] h-[20px] " alt="cancel-icon" />
          </button>
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
            className={`pl-10 border rounded-lg bg-white px-[13px] h-[38px] w-full outline-none focus:ring-1 focus:ring-blue1 focus:border-blue1 ${border ?? 'border-borderColor'}`}
          />
        </div>
      )}
    </>
  );
};

export default Search;
