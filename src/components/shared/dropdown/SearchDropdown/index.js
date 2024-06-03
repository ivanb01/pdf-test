import React from 'react';
import { SearchIcon } from '@heroicons/react/outline';

const SearchDropdown = ({ options, value, label, placeholder, onChange, className }) => {
  return (
    <div className={`flex flex-col max-w-[608px] w-full ${className}`}>
      <p className="text-gray4 text-sm font-medium leading-5">{label}</p>
      <div className="relative">
        <input
          placeholder={placeholder}
          className={`border border-borderColor rounded-lg bg-white px-[13px] py-[8px] leading-[20px] w-full outline-none focus:ring-1 focus:ring-blue1 focus:border-blue1 placeholder:text-sm placeholder:leading-5  placeholder:text-gray-500`}
        />
        <SearchIcon className="h-5 w-5 text-gray3 cursor-pointer absolute right-[13px] top-[9px]" />
      </div>
    </div>
  );
};

export default SearchDropdown;
