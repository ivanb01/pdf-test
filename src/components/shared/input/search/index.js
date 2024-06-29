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
  name,
  id,
  placeholder,
  value,
  className,
  iconBefore,
  onClick = () => {},
  border,
  shrinkOn,
}) => {
  const inputRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [width, setWidth] = useState('100%');

  useEffect(() => {
    if (shrinkOn) setWidth(45);
    else setWidth('100%');
  }, [shrinkOn]);

  useEffect(() => {
    if (focused || hovered || !!value) setExpanded(true);
    else setExpanded(false);
  }, [hovered, focused]);

  const calculateInitialWidth = () => {
    if (shrinkOn) {
      if (!expanded) setWidth(45);
      else if (expanded) setWidth('100%');
    }
  };
  useEffect(() => {
    calculateInitialWidth();
  }, [expanded]);

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
      <div
        onClick={onContainerClick}
        style={{
          width,
        }}
        className="gap-2 ml-[10px] overflow-hidden relative z-10 cursor-text flex  px-[13px] py-[9px] h-[38px] border-borderColor rounded-lg border  transition-[width]  [&:has(:focus-visible)]:ring-1 [&:has(:focus-visible)]:ring-blue1 [&:has(:focus-visible)]:border-blue1  "
        onMouseEnter={() => {
          setHovered(true);
        }}
        onMouseLeave={() => {
          setHovered(false);
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}>
        <div>{iconBefore ? iconBefore : <SearchIcon className="h-5 w-5 text-gray3 " />}</div>
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
          className="z-0 focus:ring-0 focus:border-0 focus:outline-0 leading-5 text-[14px]"
        />

        <button
          onClick={onRemoveClick}
          className={clsx(
            'absolute right-3 top-0 h-full flex items-center transition-opacity',
            { 'opacity-0': !expanded || !value.length },
            { 'opacity-100': expanded && value.length },
          )}>
          <Image src={CancelIcon} className="w-[20px] h-[20px] " alt="cancel-icon" />
        </button>
      </div>
    </>
  );
};

export default Search;
