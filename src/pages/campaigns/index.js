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
import { sortDateAsc } from 'global/functions';
import EventPreview from 'components/overlays/event-preview';
import { getContactCampaignEventPreview } from 'api/campaign';

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
  const [campaignId, setCampaignId] = useState();
  const [currentEvent, setCurrentEvent] = useState(1);
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
  const [currentCampaignsEvents, setCurrentCampaignsEvents] = useState([]);
  const [showEventPreview, setShowEventPreview] = useState(false);

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
        (el) => el != contact.email,
      );
      setSelectedContacts(selectedContactsCopy);
    }
  };

  // const handleEventPreview = async (event) => {
  //   setLoadingEventPreview(true);
  //   setShowEventPreview(true);
  //   setEventInfo({
  //     event_updated_at: event?.event_scheduled_time,
  //     event_name: event?.event_name,
  //   });
  //   console.log('event preview for', event);
  //   getContactCampaignEventPreview(event?.event_id).then((data) => {
  //     setEventToPreview(data.data);
  //     setLoadingEventPreview(false);
  //   });
  // };

  const fetchCampaignsEvents = async () => {
    try {
      const { data } = await campaignServices.getCampaignsEventsUpcoming();
      const sortData = sortDateAsc(data?.data, 'event_scheduled_time');
      setCampaignsEvents((prev) => ({ ...prev, thisWeek: sortData }));
      setCurrentCampaignsEvents(sortData);

      const { data: dataMonth } =
        await campaignServices.getCampaignsEventsUpcoming({
          period: 'this_month',
        });
      const sortDataMonth = sortDateAsc(
        dataMonth?.data,
        'event_scheduled_time',
      );
      setCampaignsEvents((prev) => ({ ...prev, thisMonth: sortDataMonth }));
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

  useEffect(() => {
    currentButton == 0
      ? setCurrentCampaignsEvents(campaignsEvents.thisWeek)
      : setCurrentCampaignsEvents(campaignsEvents.thisMonth);
  }, [currentButton]);

  return (
    <>
      <MainMenu fixed />
      <TopBar text="Campaigns" />
      <div className="bg-gray10 campaigns-custom-height">
        <div className="grid grid-cols-3 gap-6 p-6 h-full">
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
            ) : currentCampaignsEvents.length ? (
              <div className="relative h-full">
                <SimpleBar
                  autoHide
                  className="overflow-x-hidden"
                  style={{ maxHeight: '590px' }}
                >
                  <Table
                    tableFor="campaigns"
                    // data={
                    //   currentButton == 0
                    //     ? campaignsEvents.thisWeek
                    //     : campaignsEvents.thisMonth
                    // }
                    data={currentCampaignsEvents}
                    handleSelectAll={handleSelectAll}
                    handleClickRow={handleClickContact}
                    handleSelectContact={handleSelectContact}
                    setCurrentEvent={setCurrentEvent}
                    setCampaignId={(campaignId) => {
                      setCampaignId(campaignId);
                      setShowEventPreview(true);
                    }}
                  />
                </SimpleBar>
                <div>
                  {campaignId && (
                    <EventPreview
                      overlay
                      topClass={'top-[250px]'}
                      showEventPreview={showEventPreview}
                      setShowEventPreview={setShowEventPreview}
                      currentEvent={currentEvent}
                      setCurrentEvent={setCurrentEvent}
                      campaignId={campaignId}
                    />
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full mx-auto my-0">
                <Mail className="w-10 h-10 text-gray3"></Mail>
                <Text h3 className="text-gray7 mt-4 mb-2 text-center">
                  {`There are no upcoming events on this ${
                    currentButton == 0 ? 'week' : 'month'
                  }!`}
                </Text>
                <Text p className="text-gray4 relative text-center">
                  {`All upcoming events for this ${
                    currentButton == 0 ? 'week' : 'month'
                  } will be shown here.`}
                </Text>
              </div>
            )}
          </div>
          <div>
            <div className="flex mb-6">
              <Button
                bigButton
                label="Client Campaigns"
                className="bg-blue1 mr-6"
                onClick={() => Router.push('/campaigns/client-campaigns')}
              />
              <Button
                bigButton
                label="Professional Campaigns (coming soon)"
                disabled
                className="bg-lightBlue4"
                onClick={() =>
                  Router.push('/campaigns/professionals-campaigns')
                }
              />
            </div>
            <div className="relative border border-gray2 p-4 rounded-lg bg-white min-h-[425px]">
              {loadingStats ? (
                <Loader />
              ) : (
                <>
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
                  <div>
                    <hr className="-ml-4 -mr-4 my-4" />
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="text-base font-medium">
                          From in Campaign
                        </div>
                        <ButtonsSlider
                          small
                          noCount
                          buttons={chartTabs}
                          currentButton={currentChartTab}
                          onClick={setCurrentChartTab}
                        />
                      </div>
                      <div>
                        <PieChart
                          pieData={pieData}
                          type={currentChartTab == 0 ? 'percentage' : 'number'}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
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
