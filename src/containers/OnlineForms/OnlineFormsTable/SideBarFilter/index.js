import React from 'react';
import FolderIcon from '/public/icons/folder.svg';
import FoldersIcon from '/public/icons/folders.svg';
import PropTypes from 'prop-types';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CircularProgress from '@mui/material/CircularProgress';
import Image from 'next/image';

const SideBarFilter = ({ filters, setCurrentFilter, currentFilterId, onPlusClick, isRefetching }) => {
  return (
    <div>
      <div className={`flex h-[72px]  border-gray-200 w-full text-sm font-medium text-gray7 justify-between `}>
        <div className="flex ">
          <div className={`w-[6px] h-full`} />
          <div className={`flex px-[10px] py-[14px] gap-[8px]  items-center`}>{filters?.length - 1} Forms</div>
        </div>
        <button onClick={onPlusClick}>
          <div className="my-auto pr-[24px] ">
            {isRefetching ? <CircularProgress size={20} /> : <AddCircleIcon className="text-gray3" />}
          </div>
        </button>
      </div>

      <ul className="[&>*:first-child]:border-t-[1px]">
        {filters?.map((filter) => {
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
