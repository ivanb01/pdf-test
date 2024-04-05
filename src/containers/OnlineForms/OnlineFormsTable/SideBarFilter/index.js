import React from 'react';
import FolderIcon from '/public/icons/folder.svg';
import FoldersIcon from '/public/icons/folders.svg';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Image from 'next/image';
import Button from '@components/shared/button';
import { PlusIcon } from '@heroicons/react/outline';

const SideBarFilter = ({ filters, setCurrentFilter, currentFilterId, onPlusClick, isRefetching }) => {
  const allForm = filters.find((filter) => {
    return filter.id === '';
  });

  const filteredArray = filters.filter((filter) => {
    return allForm.id !== filter.id;
  });

  const sortedFilters = filteredArray.sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  return (
    <div>
      <div
        className={`flex h-[72px] px-[10px] border-gray-200 w-full text-sm font-medium text-gray7 justify-between items-center`}>
        <div className="flex ">
          <div className={`w-[6px] h-full`} />
          <div className={`flex  py-[14px] gap-[8px]  items-center`}>{filters?.length - 1} Forms</div>
        </div>

        <Button white onClick={onPlusClick} disabled={isRefetching} className={'min-w-[165px]'}>
          <div className=" ">
            {isRefetching ? (
              <CircularProgress size={20} />
            ) : (
              <div className="flex items-center gap-2 text-gray6">
                <PlusIcon className=" h-4 w-4 text-gray4" />
                <span>Create New Form</span>
              </div>
            )}
          </div>
        </Button>
      </div>

      <ul className="[&>*:first-child]:border-t-[1px]">
        {[allForm, ...sortedFilters]?.map((filter) => {
          return (
            <li
              className={`flex h-[55px] w-full text-sm font-medium text-gray7 items-center ${
                currentFilterId.id === filter.id ? 'bg-lightBlue1' : ''
              } `}
              key={filter.id}>
              <div className={`w-[6px] h-full ${currentFilterId.id !== filter.id ? 'bg-white' : 'bg-lightBlue3'} `} />
              <button className="w-full" onClick={() => setCurrentFilter(filter)}>
                <div className={`flex px-[10px] py-[14px] gap-[8px] items-center text-left	`}>
                  {filter?.id ? (
                    <Image src={FolderIcon} alt="Form type filter" />
                  ) : (
                    <Image src={FoldersIcon} alt="All forms" />
                  )}
                  {filter?.name}
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideBarFilter;

SideBarFilter.propTypes = {
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  ),
  setCurrentFilter: PropTypes.func,
  currentFilterId: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
  onPlusClick: PropTypes.func,
  isRefetching: PropTypes.bool,
};
