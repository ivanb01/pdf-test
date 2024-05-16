import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { classNames } from '@global/functions';

export default function RadioChips({ className, options, value, label, handleSelect }) {
  return (
    <div className={className}>
      <p className="text-gray-700 text-sm font-medium mb-1">{label}</p>

      <RadioGroup value={value} className="">
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-10">
          {options.map((option) => (
            <RadioGroup.Option
              key={option.id}
              value={value}
              onClick={() => handleSelect(option)}
              className={({ active }) =>
                classNames(
                  option.value == value
                    ? 'bg-lightBlue3 text-white'
                    : 'ring-1 ring-inset ring-gray-300 bg-white text-gray-900 hover:bg-gray-50',
                  ' rounded-[2222px] flex items-center justify-center px-[22px] py-[10px] text-sm sm:flex-1 cursor-pointer',
                )
              }>
              <RadioGroup.Label as="span">{option.label}</RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
