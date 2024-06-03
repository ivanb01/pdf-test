import ButtonsSlider from '@components/shared/button/buttonsSlider';
import Search from '@components/shared/input/search';
import useDebounce from 'hooks/useDebounceValue';
import { useMemo, useState } from 'react';
import ApplicationsTable from './Table';
import { useFetchPropertyApplicationsForCount } from './queries/queries';

const Applications = () => {
  const [searchInput, setSearchInput] = useState('');
  const [currentButton, setCurrentButton] = useState(0);
  const debouncedSearch = useDebounce(searchInput, 500);

  const handleButtonChange = (buttonId) => {
    setCurrentButton(buttonId);
  };

  const { data: countApplicationData } = useFetchPropertyApplicationsForCount({});

  const statusButtons = useMemo(() => {
    if (countApplicationData) {
      if (countApplicationData?.data) {
        const allItemsCount = countApplicationData?.data.total_items ?? 0;
        const unsentCount = countApplicationData?.data.unsent_property_applications ?? 0;
        const sentCount = countApplicationData?.data.sent_property_applications ?? 0;

        return [
          {
            id: 0,
            name: 'All',
            count: allItemsCount,
          },
          {
            id: 1,
            name: 'Unsent',
            count: unsentCount,
          },
          {
            id: 2,
            name: 'Sent',
            count: sentCount,
          },
        ];
      }
    } else return [];
  }, [countApplicationData]);

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
              noCount={false}
              buttons={statusButtons}
              currentButton={currentButton}
              onClick={handleButtonChange}
              className="mr-4"
            />
          </div>
        </div>
      </div>

      <ApplicationsTable searchInput={debouncedSearch} currentButton={currentButton} />
    </div>
  );
};

export default Applications;
