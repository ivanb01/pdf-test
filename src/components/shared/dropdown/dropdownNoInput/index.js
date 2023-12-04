import React from 'react';

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const DropdownNoInput = ({ options, handleSelect, selectedOption }) => {
  const groupedOptions = options.reduce((acc, option) => {
    if (!acc[option.category]) {
      acc[option.category] = { dot: option.dot, items: [] };
    }
    acc[option.category].items.push(option);
    return acc;
  }, {});
  const optionsByCategory = {};

  // Group options by category
  options.forEach((option) => {
    if (!optionsByCategory[option.category]) {
      optionsByCategory[option.category] = [];
    }
    optionsByCategory[option.category].push(option);
  });
  return (
    <div className="custom-dropdown-menu z-50 border border-gray1  top-full h-[180px] w-[220px] overflow-y-scroll right-0 bg-white absolute min-w-[200px] shadow-xl rounded-md text-sm overflow-hidden">
      {Object.keys(groupedOptions).map((category, index) => {
        const { dot, items } = groupedOptions[category];

        return (
          <div key={category} className={`block `}>
            <div
              className={
                'flex sticky top-0 bg-white items-center gap-2 py-2.5 px-2 border-b border-borderColor shadow-sm mb-2'
              }>
              {dot}
              <h6 className={'text-gray7 text-sm font-medium relative flex items-center'}>{category}</h6>
            </div>
            <ul>
              {items.map((option) => (
                <li
                  onClick={() => handleSelect(option)}
                  key={option.id}
                  className={`cursor-pointer pl-8 py-1.5 hover:bg-lightBlue1 
                ${option.label == selectedOption ? 'bg-lightBlue1 font-medium' : 'text-gray5 font-normal'}`}>
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default DropdownNoInput;
