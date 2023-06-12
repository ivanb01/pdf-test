import MainMenu from 'components/shared/menu';
import ButtonsSlider from 'components/shared/button/buttonsSlider';
import { useState } from 'react';
import Dropdown from 'components/shared/dropdown';
import SimpleBar from 'simplebar-react';
import Table from 'components/shared/table';
import { getReports } from 'api/team';
import { useEffect } from 'react';
const index = () => {
  const [tabs, setTabs] = useState([
    {
      id: 0,
      name: 'All',
    },
    {
      id: 1,
      name: 'This Week',
    },
    {
      id: 2,
      name: 'Monthly',
    },
  ]);

  const [sortColumns, setSortColumns] = useState([
    {
      id: 1,
      name: 'Name A-Z',
    },
    {
      id: 2,
      name: 'Name Z-A',
    },
    {
      id: 3,
      name: '# of Clients',
    },
    {
      id: 4,
      name: 'Clients in the funnel',
    },
    {
      id: 5,
      name: 'Highest Client Health',
    },
    {
      id: 6,
      name: 'Lowest Client Health',
    },
    {
      id: 7,
      name: 'Closed Clients',
    },
    {
      id: 8,
      name: 'Time Spent in the CRM',
    },
  ]);

  const [data, setData] = useState([]);

  useEffect(() => {
    getReports().then((data) => setData(data.data));
  }, []);
  const [sortColumn, setSortColumn] = useState(0);
  const [currentButton, setCurrentButton] = useState(0);
  return (
    <>
      <MainMenu />
      <div className="mx-6 my-4 flex items-center justify-between">
        <div className="text-lg text-gray4 font-medium">Agent Reports</div>
        <div className="flex items-center">
          <Dropdown
            horizontal
            label="Sort by"
            className="mr-6"
            inputWidth="w-[200px]"
            placeHolder="Choose"
            options={sortColumns}
            handleSelect={(item) => setSortColumn(item.id)}
          />
          <ButtonsSlider
            noCount
            buttons={tabs}
            currentButton={currentButton}
            onClick={setCurrentButton}
          />
        </div>
      </div>
      <SimpleBar autoHide={true} style={{ maxHeight: 'calc(100vh - 150px)' }}>
        <Table tableFor="reports" data={data} />
      </SimpleBar>
    </>
  );
};

export default index;
