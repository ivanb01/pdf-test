import MainMenu from 'components/shared/menu';
import TopBar from 'components/shared/top-bar';
import Button from 'components/shared/button';
import Text from 'components/shared/text';
import ButtonsSlider from 'components/shared/button/buttonsSlider';
import { useEffect, useState } from 'react';
import SimpleBar from 'simplebar-react';
import Table from 'components/shared/table';
import DoughnutChart from 'components/charts/doughnut/index';
import PieChart from 'components/charts/pie/index';
import { Chart, ArcElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Router from 'next/router';
import * as campaignServices from 'api/campaign';
import Loader from 'components/shared/loader';
import Mail from '@mui/icons-material/Mail';

Chart.register(ArcElement, ChartDataLabels);

const buttons = [
  {
    id: 0,
    name: 'This Week',
    count: 10,
  },
  {
    id: 1,
    name: 'This Month',
    count: 1,
  },
];

const chartTabs = [
  {
    id: 0,
    name: 'Percentage',
  },
  {
    id: 1,
    name: 'Numbers',
  },
];

const Campaigns = () => {
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);
  const [clientsDoughnut, setClientsDoughnut] = useState([0, 0]);
  const [professionalsDoughnut, setProfessionalsDoughnut] = useState([0, 0]);
  const [currentButton, setCurrentButton] = useState(0);
  const [currentChartTab, setCurrentChartTab] = useState(0);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [campaignsEvents, setCampaignsEvents] = useState({
    thisWeek: [],
    thisMonth: [],
  });
  const [pieData, setPieData] = useState([
    {
      id: 0,
      label: 'Clients',
      value: 0,
      color: '#60A5FA',
    },
    {
      id: 1,
      label: 'Professionals',
      value: 0,
      color: '#0369A1',
    },
  ]);

  // const [contacts, setContacts] = useState({
  //   thisWeek: [
  //     {
  //       first_name: 'Lindsay',
  //       last_name: 'Walton',
  //       email: 'lindsay.walton@example.com',
  //       addedFrom: 'CSV',
  //       addedDate: '01/01/2022',
  //       type: 'Renter',
  //       status: 'In Communication',
  //     },
  //     {
  //       first_name: 'Lindsay',
  //       last_name: 'Walton',
  //       email: 'lindsay.waltonn@example.com',
  //       addedFrom: 'CSV',
  //       addedDate: '01/01/2022',
  //       type: 'Landloard',
  //       status: 'Attempted Contact',
  //     },
  //     {
  //       first_name: 'Lindsay',
  //       last_name: 'Walton',
  //       email: 'lindsay.waltons@example.com',
  //       addedFrom: 'CSV',
  //       addedDate: '01/01/2022',
  //       type: 'Renter',
  //       status: 'Attempted Contact',
  //     },
  //     {
  //       first_name: 'Lindsay',
  //       last_name: 'Walton',
  //       email: 'lindsay.waltoen@example.com',
  //       addedFrom: 'CSV',
  //       addedDate: '01/01/2022',
  //       type: 'Buyer',
  //       status: 'Contract Signed',
  //     },
  //     {
  //       first_name: 'Lindsay',
  //       last_name: 'Walton',
  //       email: 'lindsay.waltofn@example.com',
  //       addedFrom: 'CSV',
  //       addedDate: '01/01/2022',
  //       type: 'Renter',
  //       status: 'Contract Signed',
  //     },
  //     {
  //       first_name: 'Lindsay',
  //       last_name: 'Walton',
  //       email: 'lindsay.walhton@example.com',
  //       addedFrom: 'CSV',
  //       addedDate: '01/01/2022',
  //       type: 'Buyer',
  //       status: 'New Lead',
  //     },
  //     {
  //       first_name: 'Lindsay',
  //       last_name: 'Walton',
  //       email: 'lindsay.waltoqn@example.com',
  //       addedFrom: 'CSV',
  //       addedDate: '01/01/2022',
  //       type: 'Landloard',
  //       status: 'Attempted Contact',
  //     },
  //     {
  //       first_name: 'Lindsay',
  //       last_name: 'Walton',
  //       email: 'lindsay.waltzon@example.com',
  //       addedFrom: 'CSV',
  //       addedDate: '01/01/2022',
  //       type: 'Buyer',
  //       status: 'New Lead',
  //     },
  //     {
  //       first_name: 'Lindsay',
  //       last_name: 'Walton',
  //       email: 'lindsay.wallton@example.com',
  //       addedFrom: 'CSV',
  //       addedDate: '01/01/2022',
  //       type: 'Landloard',
  //       status: 'Attempted Contact',
  //     },
  //     {
  //       first_name: 'Lindsay',
  //       last_name: 'Walton',
  //       email: 'lindsay.waltoln@example.com',
  //       addedFrom: 'CSV',
  //       addedDate: '01/01/2022',
  //       type: 'Buyer',
  //       status: 'New Lead',
  //     },
  //   ],
  //   thisMonth: [
  //     {
  //       first_name: 'Lindsay',
  //       last_name: 'Walton',
  //       email: 'lindsay.walto1n@example.com',
  //       addedFrom: 'CSV',
  //       addedDate: '01/01/2022',
  //       type: 'Renter',
  //       status: 'New Lead',
  //     },
  //   ],
  // });

  const handleClickContact = (item, e) => {
    if (e.target.type == 'checkbox') {
      return;
    }
    console.log(item, e.target);
    e.target.closest('.contact-row').querySelector('[type="checkbox"]').click();
  };
  const handleSelectAll = () => {
    console.log('selected / deselected all');
  };
  const handleSelectContact = (event, contact) => {
    if (event.target.checked) {
      // add to array
      setSelectedContacts((prevState) => [...prevState, contact.email]);
    } else {
      // remove from array
      let selectedContactsCopy = selectedContacts;
      selectedContactsCopy = selectedContactsCopy.filter(
        (el) => el != contact.email
      );
      setSelectedContacts(selectedContactsCopy);
    }
  };

  const fetchCampaignsEvents = async () => {
    try {
      const { data } = await campaignServices.getCampaignsEventsUpcoming();
      setCampaignsEvents((prev) => ({ ...prev, thisWeek: data?.data }));
      const { data: dataMonth } =
        await campaignServices.getCampaignsEventsUpcoming({
          period: 'this_month',
        });
      setCampaignsEvents((prev) => ({ ...prev, thisMonth: dataMonth?.data }));
      console.log('dataWeek', data, 'dataMonth', dataMonth);
      setLoadingEvents(false);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCampaignsEnrollSummary = async () => {
    try {
      const { data } = await campaignServices.getCampaignsEnrollSummary();
      setClientsDoughnut([
        data.clients_assigned_count,
        data.clients_assigned_count +
          data.clients_never_assigned_count +
          data.clients_unassigned_count,
      ]);
      setProfessionalsDoughnut([
        data.professionals_assigned_count,
        data.professionals_assigned_count +
          data.professionals_never_assigned_count +
          data.professionals_unassigned_count,
      ]);
      const newPieData = pieData.map((obj) => {
        if (obj.id === 0) {
          return { ...obj, value: data.clients_assigned_count };
        }

        if (obj.id === 1) {
          return { ...obj, value: data.professionals_assigned_count };
        }
        return obj;
      });
      setPieData(newPieData);
      setLoadingStats(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCampaignsEvents();
    fetchCampaignsEnrollSummary();
  }, []);

  return (
    <>
      <MainMenu fixed />
      <TopBar text="Campaigns" />
      <div
        className="bg-gray10"
        style={{ height: 'calc(100vh - 76px - 68px) !important' }}
      >
        <div className="grid grid-cols-3 gap-6 p-6">
          <div className="col-span-2 bg-white rounded-lg border border-gray2 overflow-hidden relative">
            <div className="flex items-center px-6 py-4 justify-between border-b border-gray2">
              <Text h3>Upcoming Events</Text>
              <ButtonsSlider
                noCount
                buttons={buttons}
                currentButton={currentButton}
                onClick={setCurrentButton}
              />
            </div>
            {loadingEvents ? (
              <Loader />
            ) : campaignsEvents.thisWeek.length ? (
              <SimpleBar
                autoHide={true}
                className="overflow-x-hidden"
                style={{ maxHeight: '590px' }}
              >
                <Table
                  tableFor="campaigns"
                  data={
                    currentButton == 0
                      ? campaignsEvents.thisWeek
                      : campaignsEvents.thisMonth
                  }
                  handleSelectAll={handleSelectAll}
                  handleClickRow={handleClickContact}
                  handleSelectContact={handleSelectContact}
                />
              </SimpleBar>
            ) : (
              <div className="flex flex-col items-center justify-center h-full mx-auto my-0">
                <Mail className="w-10 h-10 text-gray3"></Mail>
                <Text h3 className="text-gray7 mt-4 mb-2 text-center">
                  {`There are no upcoming events on this ${currentButton == 0 ? 'week': 'month'}!`}
                </Text>
                <Text p className="text-gray4 relative text-center">
                  {`All upcoming events for this ${currentButton == 0 ? 'week': 'month'} will be shown here.`}
                </Text>
              </div>
            )}
          </div>
          <div>
            <div className="flex mb-6">
              <Button
                bigButton
                label="Professional Campaigns"
                className="bg-lightBlue4"
                onClick={() =>
                  Router.push('/campaigns/professionals-campaigns')
                }
              />
              <Button
                bigButton
                label="Client Campaigns"
                className="bg-blue1 ml-6"
                onClick={() => Router.push('/campaigns/client-campaigns')}
              />
            </div>
            {loadingStats ? (
              <Loader />
            ) : (
              <div className="border border-gray2 p-4 rounded-lg bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center w-1/2 border-r border-gray2 pr-6">
                    <DoughnutChart
                      data={clientsDoughnut}
                      className="w-[60px] mr-1"
                      color="#60A5FA"
                    />
                    <div>
                      <div className="text-base font-semibold text-gray8">
                        Clients
                      </div>
                      <div className=" text-sm font-normal text-gray4">
                        In Campaign
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center w-1/2 pl-6">
                    <DoughnutChart
                      data={professionalsDoughnut}
                      className="w-[60px] mr-1"
                      color="#0369A1"
                    />
                    <div>
                      <div className="text-base font-semibold text-gray8">
                        Professionals
                      </div>
                      <div className=" text-sm font-normal text-gray4">
                        In Campaign
                      </div>
                    </div>
                  </div>
                </div>
                {pieData[0].value != 0 && pieData[1].value != 0 && (
                  <>
                    <hr className="-ml-4 -mr-4 my-4" />
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="text-base font-medium">
                          From in Campaign
                        </div>
                        <ButtonsSlider
                          small
                          buttons={chartTabs}
                          currentButton={currentChartTab}
                          onClick={setCurrentChartTab}
                        />
                      </div>
                      <div className="">
                        <PieChart
                          pieData={pieData}
                          type={currentChartTab == 0 ? 'percentage' : 'number'}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Campaigns;

export async function getStaticProps(context) {
  return {
    props: {
      requiresAuth: true,
    },
  };
}
