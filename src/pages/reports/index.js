import MainMenu from 'components/shared/menu';
import ButtonsSlider from 'components/shared/button/buttonsSlider';
import { useState } from 'react';
import Dropdown from 'components/shared/dropdown';
import SimpleBar from 'simplebar-react';
import Table from 'components/shared/table';
import { getReports } from 'api/team';
import { useEffect } from 'react';
import Loader from 'components/shared/loader';
import { getEmailParts } from 'global/functions';
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
      key: 'full_name',
      type: 'asc',
      label: 'Name A-Z',
    },
    {
      id: 2,
      key: 'full_name',
      type: 'desc',
      label: 'Name Z-A',
    },
    {
      id: 3,
      key: 'total_clients',
      type: 'desc',
      label: '# of Clients',
    },
    {
      id: 4,
      key: 'clients_in_funnel',
      type: 'desc',
      label: 'Clients in the funnel',
    },
    {
      id: 5,
      key: 'percentage_healthy_clients',
      type: 'desc',
      label: 'Highest Client Health',
    },
    {
      id: 6,
      key: 'percentage_healthy_clients',
      type: 'asc',
      label: 'Lowest Client Health',
    },
    {
      id: 7,
      key: 'clients_closed',
      type: 'desc',
      label: 'Closed Clients',
    },
    {
      id: 8,
      key: 'percentage_closed_clients',
      type: 'desc',
      label: 'Conversion',
    },
  ]);

  const calculateClosedClients = (closedClients, totalClients) => {
    if (totalClients === 0) {
      return 0;
    }

    let percentage = (closedClients / totalClients) * 100;
    return Math.round(percentage);
  };

  const calculateHealthyCommunication = (healthyCount, unhealthyCount) => {
    let totalValue = healthyCount + unhealthyCount;
    if (!Math.round((100 * healthyCount) / totalValue)) {
      return 0;
    }
    return Math.round((100 * healthyCount) / totalValue);
  };

  const sortData = () => {
    let sortedData = [...data.data].sort((a, b) => {
      if (typeof a[sortColumn.key] === 'number') {
        return sortColumn.type === 'asc'
          ? a[sortColumn.key] - b[sortColumn.key]
          : b[sortColumn.key] - a[sortColumn.key];
      } else if (typeof a[sortColumn.key] === 'string') {
        return sortColumn.type === 'asc'
          ? a[sortColumn.key].localeCompare(b[sortColumn.key])
          : b[sortColumn.key].localeCompare(a[sortColumn.key]);
      } else {
        throw new Error('Invalid sort key. Key should be a string or a number.');
      }
    });
    setData((prevState) => {
      return { ...prevState, data: sortedData };
    });
  };

  const initializeData = () => {
    data.data.map((agent) => {
      agent.full_name = `${getEmailParts(agent.agent_id).firstName} ${getEmailParts(agent.agent_id).lastName}`;
      agent.percentage_healthy_clients = calculateHealthyCommunication(
        agent.healthy_communication,
        agent.unhealthy_communication,
      );
      agent.percentage_closed_clients = calculateClosedClients(agent.clients_closed, agent.total_clients);
      return agent;
    });
  };
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortColumn, setSortColumn] = useState(0);
  const [currentButton, setCurrentButton] = useState(0);

  useEffect(() => {
    setLoading(true);
    getReports().then((data) => {
      setData(data.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    data.data && initializeData();
  }, [data]);

  useEffect(() => {
    sortColumn && sortData(sortColumn);
  }, [sortColumn]);

  return (
    <>
      <MainMenu />
      <div className="mx-6 my-4 flex items-center justify-between">
        <div className="text-lg text-gray7 font-medium">Agent Reports</div>
        <div className="flex items-center">
          <Dropdown
            horizontal
            label="Sort by"
            className="mr-6"
            inputWidth="w-[220px]"
            placeHolder="Choose"
            options={sortColumns}
            handleSelect={(item) => setSortColumn(item)}
          />
          {/* <ButtonsSlider
            noCount
            buttons={tabs}
            currentButton={currentButton}
            onClick={setCurrentButton}
          /> */}
        </div>
      </div>
      {loading ? (
        <div className="w-full h-full relative">
          <Loader />
        </div>
      ) : data?.count ? (
        <SimpleBar autoHide style={{ maxHeight: 'calc(100vh - 150px)' }}>
          <Table tableFor="reports" data={data.data} />
        </SimpleBar>
      ) : (
        <div className="w-full flex items-center justify-center" style={{ height: 'calc(100vh - 150px)' }}>
          No Agents in this table
        </div>
      )}
    </>
  );
};

export default index;

export async function getServerSideProps(context) {
  return {
    props: {
      requiresAuth: true,
    },
  };
}
