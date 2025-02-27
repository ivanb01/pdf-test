import React, { useMemo, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@components/shared/button';
import { PlusIcon } from '@heroicons/react/outline';
import TypesAccordionElement from './TypesAccordionElement';

const sortTemplatesAlphabetically = (templates) =>
  templates.sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

const SideBarFilter = ({
  filters,
  setCurrentFilter,
  currentFilterId,
  onPlusClick,
  isRefetching,
  handlePreviewTemplate,
  handleEditTemplate,
  handleDeleteTemplate,
  isDeletingTemplate,
  onRestoreFormTemplate,
}) => {
  const [hoveredFilterId, setHoveredFilterId] = useState(null);

  const [allForm, sortedDefaultTypes, sortedNonDefaultTypes, sortedTrashedTypes] = useMemo(() => {
    const allForm = filters.find((filter) => {
      return filter.id === '';
    });

    const filteredArray = filters.filter((filter) => {
      return allForm.id !== filter.id;
    });

    const defaultTypes = sortTemplatesAlphabetically(filteredArray.filter((type) => type.is_default && !type.deleted));
    const nonDefaultTypes = sortTemplatesAlphabetically(
      filteredArray.filter((type) => !type.is_default && !type.deleted),
    );
    const sortedTrashedTypes = sortTemplatesAlphabetically(filteredArray.filter((type) => type.deleted));

    return [allForm, defaultTypes, nonDefaultTypes, sortedTrashedTypes];
  }, [filters]);

  return (
    <div className="flex flex-col h-full">
      <div
        className={` flex min-h-[72px] px-[10px] border-b border-gray-200  w-full text-sm font-medium text-gray7 justify-between items-center bg-white `}>
        <div className="flex">
          <div className={`w-[6px] h-full`} />
          <div className={`flex  py-[14px] gap-[8px]  items-center`}>{filters?.length - 1} Forms</div>
        </div>

        <Button white onClick={onPlusClick} className={'min-w-[165px]'}>
          <div className="flex items-center gap-2 text-gray6">
            <PlusIcon className=" h-4 w-4 text-gray4" />
            <span>Create New Form</span>
          </div>
        </Button>
      </div>

      <ul className="h-full overflow-y-scroll">
        <li className="">
          <TypesAccordionElement
            types={[allForm]}
            hoveredFilterId={hoveredFilterId}
            setHoveredFilterId={setHoveredFilterId}
            currentFilterId={currentFilterId}
            setCurrentFilter={setCurrentFilter}
            handleEditTemplate={handleEditTemplate}
            handlePreviewTemplate={handlePreviewTemplate}
            hideActionsMenu={true}
            type={'ALL_FORMS'}
          />
        </li>
        <li>
          <TypesAccordionElement
            title={'Default forms'}
            types={sortedDefaultTypes}
            hoveredFilterId={hoveredFilterId}
            setHoveredFilterId={setHoveredFilterId}
            currentFilterId={currentFilterId}
            setCurrentFilter={setCurrentFilter}
            handleEditTemplate={handleEditTemplate}
            handlePreviewTemplate={handlePreviewTemplate}
            hideActionsMenu={false}
            type={'DEFAULT_FORMS'}
          />
        </li>
        <li>
          <TypesAccordionElement
            title={'Created by me'}
            types={sortedNonDefaultTypes}
            hoveredFilterId={hoveredFilterId}
            setHoveredFilterId={setHoveredFilterId}
            currentFilterId={currentFilterId}
            setCurrentFilter={setCurrentFilter}
            handleEditTemplate={handleEditTemplate}
            handlePreviewTemplate={handlePreviewTemplate}
            hideActionsMenu={false}
            handleDeleteTemplate={handleDeleteTemplate}
            isDeletingTemplate={isDeletingTemplate}
            type={'MY_FORMS'}
          />
        </li>
        <li>
          <TypesAccordionElement
            title={'Trash'}
            types={sortedTrashedTypes}
            hoveredFilterId={hoveredFilterId}
            setHoveredFilterId={setHoveredFilterId}
            currentFilterId={currentFilterId}
            setCurrentFilter={setCurrentFilter}
            handleEditTemplate={handleEditTemplate}
            handlePreviewTemplate={handlePreviewTemplate}
            hideActionsMenu={false}
            handleDeleteTemplate={() => {}}
            isDeletingTemplate={false}
            type={'TRASH_FORMS'}
            onRestoreFormTemplate={onRestoreFormTemplate}
          />
        </li>
      </ul>
    </div>
  );
};

export default SideBarFilter;
