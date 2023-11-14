import React from 'react';

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const DropdownNoInput = ({ options, handleSelect, selectedOption }) => {
  return (
    <div className="custom-dropdown-menu z-50 top-full right-0 bg-white absolute min-w-[200px] shadow-lg rounded-md text-sm overflow-hidden">
      {options?.map((option) => (
        <div
          className={`cursor-pointer block hover:bg-lightBlue1 p-2 py-2 pl-3 pr-9 ${
            option.label == selectedOption && 'bg-lightBlue1 font-medium'
          }`}
          onClick={() => {
            handleSelect(option);
            console.log(option.label, selectedOption);
          }}
          key={option.id}>
          {option.label}
        </div>
      ))}
    </div>
  );
};

export default DropdownNoInput;
