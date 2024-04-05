import React from 'react';
import Search from '@components/shared/input/search';
import PropTypes from 'prop-types';
import Button from '@components/shared/button';
import NoteIcon from '@mui/icons-material/Note';
import ButtonsSlider from '@components/shared/button/buttonsSlider';
import clsx from 'clsx';

const FilterBar = ({ currentFormName, statusButtons, currentTab, setCurrentTab, onSendFormClick, setSearchValue }) => {
  const slideClassname = clsx({ ['w-[193px] h-[49px]']: !statusButtons.length });

  return (
    <div className="h-[72px] flex justify-between items-center p-[25px] ">
      <div className="color-gray8">{currentFormName}</div>
      <div className="flex gap-[10px] items-center">
        <Search placeholder="Search..." onChange={(e) => setSearchValue(e.target.value)} className={'text-[14px]'} />
        <ButtonsSlider
          buttons={statusButtons}
          currentButton={currentTab}
          onClick={setCurrentTab}
          className={slideClassname}
        />
        <Button onClick={onSendFormClick}>
          <div className="flex gap-2 justify-center items-center">
            <NoteIcon />
            Send New Form
          </div>
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;

FilterBar.propTypes = {
  currentFormName: PropTypes.string,
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
