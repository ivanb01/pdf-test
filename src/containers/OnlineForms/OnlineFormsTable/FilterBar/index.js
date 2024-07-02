import React, { useEffect, useState } from 'react';
import Search from '@components/shared/input/search';
import PropTypes from 'prop-types';
import Button from '@components/shared/button';
import ButtonsSlider from '@components/shared/button/buttonsSlider';
import clsx from 'clsx';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import useElementDimensions from '@helpers/hooks/useElementDimensions';

const TITLE_MAX_WIDTH = 565;

const FilterBar = ({
  statusButtons,
  currentTab,
  setCurrentTab,
  onSendFormClick,
  setSearchValue,
  formTypeFilter,
  handlePreviewTemplate,
  searchValue,
}) => {
  const [titleDim, titleRef] = useElementDimensions();
  const slideClassname = clsx({ ['w-[193px] h-[49px]']: !statusButtons.length });

  return (
    <div className="h-[72px] flex justify-between items-center p-[25px] border-b">
      <div className="flex items-center gap-2 max-w-[562px] overflow-hidden">
        <div ref={titleRef} className="w-full color-gray8 overflow-hidden truncate">
          <span className="whitespace-nowrap">{formTypeFilter.name}</span>
        </div>
        {!!formTypeFilter.id && (
          <button
            onClick={() => {
              handlePreviewTemplate(formTypeFilter);
            }}
            className="flex items-center h-[30px] bg-lightBlue1 text-lightBlue3 text-[12px] rounded gap-2 py-[7px] px-[11px]">
            <RemoveRedEyeIcon className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex gap-[10px] items-center justify-end">
        <Search
          placeholder="Search..."
          onChange={(value) => {
            setSearchValue(value);
          }}
          value={searchValue}
          shrinkOn={titleDim.scrollWidth > TITLE_MAX_WIDTH - 30 - 10 - 45 - 25}
        />

        <div className="flex items-center gap-[10px]">
          <ButtonsSlider
            buttons={statusButtons}
            currentButton={currentTab}
            onClick={setCurrentTab}
            className={slideClassname}
          />
          <Button onClick={onSendFormClick} disabled={formTypeFilter.deleted} className={'min-w-[128px] w-[128px]'}>
            <div className="flex gap-2 justify-center items-center">
              <FeedOutlinedIcon className={'h-5 w-5'} />
              Send Form
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;

FilterBar.propTypes = {
  currentTab: PropTypes.number,
  setCurrentTab: PropTypes.func,
  setSearchValue: PropTypes.func,
  statusButtons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      count: PropTypes.number,
    }),
  ),
  onSendFormClick: PropTypes.func,
};
