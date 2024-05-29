import React, { useState } from 'react';
import Search from '@components/shared/input/search';
import ButtonsSlider from '@components/shared/button/buttonsSlider';
import { SLIDER_BUTTONS } from './constants';
import ApplicationsTable from './Table';
import useDebounce from 'hooks/useDebounceValue';

const Applications = () => {
  const [searchInput, setSearchInput] = useState('');
  const [currentButton, setCurrentButton] = useState(0);
  const debouncedSearch = useDebounce(searchInput, 500);

  const handleButtonChange = (buttonId) => {
    setCurrentButton(buttonId);
  };

  return (
    <div className="h-full w-full">
      <div className="flex justify-between gap-2 py-[17px]  px-[24px] items-center border-b-[1px] overflow-hidden">
        <span>Applications</span>
        <div className="flex items-center gap-2 ">
          <div className="min-w-[200px]">
            <Search
              placeholder="Search"
              className="text-sm"
              value={searchInput}
              onInput={(event) => setSearchInput(event.target.value)}
            />
          </div>
          <div className="min-w-[306px]">
            <ButtonsSlider
              noCount
              buttons={SLIDER_BUTTONS}
              currentButton={currentButton}
              onClick={handleButtonChange}
              className="mr-4"
            />
          </div>
        </div>
      </div>

      <ApplicationsTable searchInput={debouncedSearch} />
    </div>
  );
};

export default Applications;
