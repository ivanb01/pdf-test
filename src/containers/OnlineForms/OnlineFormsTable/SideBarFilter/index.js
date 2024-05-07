import React, { useState } from 'react';
import FolderIcon from '/public/icons/folder.svg';
import FoldersIcon from '/public/icons/folders.svg';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Image from 'next/image';
import Button from '@components/shared/button';
import { PlusIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { DotsHorizontalIcon } from '@heroicons/react/outline';
import FilterDropdown from 'components/shared/dropdown/FilterDropdown';
import { PencilIcon } from '@heroicons/react/solid';
import { TrashIcon } from '@heroicons/react/solid';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const SideBarFilter = ({
  filters,
  setCurrentFilter,
  currentFilterId,
  onPlusClick,
  isRefetching,
  handlePreviewTemplate,
  handleEditTemplate,
}) => {
  const [hoveredFilterId, setHoveredFilterId] = useState(null);

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

  const Actions = [
    {
      name: (
        <div className="flex item-center gap-3 text-gray6  cursor-pointer leading-5 py-[2px]">
          <PencilIcon className="w-5 h-5" />
          <span>Edit Form</span>
        </div>
      ),
      handleClick: (template) => {
        handleEditTemplate(template);
      },
    },
    {
      name: (
        <div className="flex item-center gap-3 text-gray6  cursor-pointer py-[2px]">
          <RemoveRedEyeIcon className="w-5 h-5" />
          <span>Preview Form</span>
        </div>
      ),
      handleClick: async (template) => {
        handlePreviewTemplate(template);
      },
    },
    {
      name: (
        <div className="flex items-center gap-3 text-red5  cursor-pointer py-[2px]">
          <TrashIcon className="w-5 h-5" />
          <span>Move to Trash</span>
        </div>
      ),
      handleClick: () => {},
    },
  ];

  return (
    <div>
      <div
        className={`flex h-[72px] px-[10px] border-gray-200 w-full text-sm font-medium text-gray7 justify-between items-center`}
      >
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
        {[allForm, ...sortedFilters]?.map((filter, index) => {
          return (
            <li
              className={`group flex  w-full text-sm font-medium text-gray7 items-center cursor-pointer hover:bg-lightBlue1 ${
                currentFilterId.id === filter.id ? 'bg-lightBlue1' : ''
              } `}
              key={filter.id}
              onMouseEnter={() => {
                setHoveredFilterId(filter.id);
              }}
              onMouseLeave={() => {
                setHoveredFilterId(null);
              }}
            >
              <div className={`w-[6px] h-full ${currentFilterId.id === filter.id ? 'bg-lightBlue3' : 'bg-white'} `} />
              <div className="w-full" onMouseDown={() => setCurrentFilter(filter)}>
                <div className={`flex px-[10px] py-[12px] gap-[8px] items-center text-left	`}>
                  {filter?.id ? (
                    <Image src={FolderIcon} className="h-5 w-5" alt="Form type filter" />
                  ) : (
                    <Image src={FoldersIcon} className="h-5 w-5" alt="All forms" />
                  )}
                  {filter?.name}
                </div>
              </div>
              {hoveredFilterId !== '' ? (
                <div
                  className={clsx('opacity-0 mr-6 ', {
                    ['opacity-100']: hoveredFilterId === filter.id,
                  })}
                >
                  <FilterDropdown
                    types={Actions}
                    icon={<DotsHorizontalIcon className="w-5 cursor-pointer text-lightBlue3" />}
                    data={filter}
                    align={'start'}
                    side={'bottom'}
                  />
                </div>
              ) : (
                <div className="w-5 h-5  mr-6"></div>
              )}
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
