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
import withAuth from '@components/withAuth';
import SpinnerLoader from '@components/shared/SpinnerLoader';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import LeaderboardTable from '@components/shared/table/LeaderboardTable';

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
      api_key: 'name_az',
    },
    {
      id: 2,
      key: 'full_name',
      type: 'desc',
      label: 'Name Z-A',
      api_key: 'name_za',
    },
    {
      id: 3,
      key: 'total_clients',
      type: 'desc',
      label: '# of Clients',
      api_key: 'num_clients',
    },
    {
      id: 4,
      key: 'clients_in_funnel',
      type: 'desc',
      label: 'Clients in the funnel',
      api_key: 'clients_funnel',
    },
    {
      id: 5,
      key: 'percentage_healthy_clients',
      type: 'desc',
      label: 'Highest Client Health',
      api_key: 'highest_client_health',
    },
    {
      id: 6,
      key: 'percentage_healthy_clients',
      type: 'asc',
      label: 'Lowest Client Health',
      api_key: 'lowest_client_health',
    },
    {
      id: 7,
      key: 'clients_closed',
      type: 'desc',
      label: 'Closed Clients',
      api_key: 'closed_clients',
    },
    {
      id: 8,
      key: 'conversion',
      type: 'desc',
      label: 'Conversion',
      api_key: 'conversion',
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


  const initializeData = () => {
    items.data.map((agent) => {
      agent.full_name = `${getEmailParts(agent.agent_id).firstName} ${getEmailParts(agent.agent_id).lastName}`;
      // agent.percentage_healthy_clients = calculateHealthyCommunication(
      //   agent.healthy_communication,
      //   agent.unhealthy_communication,
      // );
      // agent.percentage_closed_clients = calculateClosedClients(agent.clients_closed, agent.total_clients);
      agent.percentage_closed_clients = agent.conversion 
      return agent;
    });
  };
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortColumn, setSortColumn] = useState(0);
  const [currentButton, setCurrentButton] = useState(0);
  const [sortBy, setSortBy] = useState('');

  const [hasNextPage, setHasNextPage] = useState(true);
  const [error, setError] = useState();
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  // const [globalLoading, setGlobalLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getReports(10, offset, sortBy.api_key).then((data) => {
      setItems(data.data);
      setOffset(offset + data.data.count);
      setLoading(false);
    });
  }, []);

  const handleSelect = (item) => {
    setHasNextPage(true)
    setSortBy(item); // Update selected item
    // Pass the api_key of the selected item to the API
    // Make a call to your API passing the api_key
    // Example:
    setLoading(true);
    getReports(10, 0, item.api_key).then((data) => {
      setItems(data.data);
      setOffset(data.data.count);
      setLoading(false);
    });
  };

  useEffect(() => {
    items.data && initializeData();
  }, [items]);



  const loadItems = (offset) => {
    return getReports(10, offset, sortBy.api_key)
      .then((response) => {
        return {
          hasNextPage: true,
          data: response.data.data,
          count: response.data.count,
          total: response.data.total,
          // fistTimeLoad: true,
        };
      })
      .catch((error) => {
        toast.error('Error while loading items');
        throw error;
      });
  };

  async function loadMore() {
    try {
      const { total, data, count, hasNextPage: newHasNextPage } = await loadItems(offset);
      setItems((current) => {
        return {
          ...current,
          data: [...current.data, ...data],
          count: count,
        };
      });

      setOffset(offset + count);

      setHasNextPage(newHasNextPage);
      if (count == 0) {
        setHasNextPage(false);
        return;
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }
  const [infiniteRef, { rootRef }] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    disabled: !!error,
  });
  return (
    <>
      <MainMenu />
      <div className="mx-6 my-4 flex items-center justify-between">
        <div className="text-lg text-gray7 font-medium">Leaderboard</div>
        <div className="flex items-center">
          <Dropdown
            horizontal
            label="Sort by"
            className="mr-6"
            inputWidth="w-[220px]"
            placeHolder="Choose"
            options={sortColumns}
            handleSelect={handleSelect}
          />
        </div>
      </div>
      {loading ? (
        <div className="w-full h-full relative">
          <Loader />
        </div>
      ) : items?.total > 0 ? (
        <SimpleBar autoHide style={{ maxHeight: 'calc(100vh - 150px)' }}>
          <LeaderboardTable tableFor="leaderboard" data={items.data} ref={rootRef} />
          {hasNextPage && (
            <div ref={infiniteRef}>
              <SpinnerLoader />
            </div>
          )}
        </SimpleBar>
      ) : (
        <div className="w-full flex items-center justify-center" style={{ height: 'calc(100vh - 150px)' }}>
          No Agents in this table
        </div>
      )}
    </>
  );
};

export default withAuth(index);

// export async function getServerSideProps(context) {
//   return {
//     props: {
//       requiresAuth: true,
//     },
//   };
// }
