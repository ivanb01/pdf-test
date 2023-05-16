import MainMenu from 'components/shared/menu';
import TopBar from 'components/shared/top-bar';
// import Router from 'next/router';
import { useRouter } from 'next/router';
import Search from 'components/shared/input/search';
import ButtonsSlider from 'components/shared/button/buttonsSlider';
import { useEffect, useState, useRef } from 'react';
import Text from 'components/shared/text';
import ContactCampaignsSidebar from 'components/shared/accordion/contact-campaigns-sidebar';
import Table from 'components/shared/table';
import SimpleBar from 'simplebar-react';
import Button from 'components/shared/button';
import UnassignOverlay from 'components/overlays/unassign';
import AssignCampaignOverlay from 'components/overlays/assign-campaign';
import noClientCampaigns from 'public/images/no-client-campaigns.svg';
import Image from 'next/image';
import {
  getCampaign,
  getCampaignsByCategory,
  unassignContactFromCampaign,
  assignContactToCampaign,
} from 'api/campaign';
import Loader from 'components/shared/loader';
import EventPreview from 'components/overlays/event-preview';
import { getContactCampaignEventPreview } from 'api/campaign';

const ContactCampaigns = ({ isClient, campaigns }) => {
  const [eventInfo, setEventInfo] = useState(null);
  const [loadingEventPreview, setLoadingEventPreview] = useState(false);
  const [eventToPreview, setEventToPreview] = useState(null);
  const [showEventPreview, setShowEventPreview] = useState(false);
  const [showUnassignOverlay, setShowUnassignOverlay] = useState(false);
  const [showAssignOverlay, setShowAssignOverlay] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [contactToUnassign, setContactToUnassign] = useState();
  const [contactToAssign, setContactToAssign] = useState();
  const [loading, setLoading] = useState(true);
  const [loadingAssign, setLoadingAssign] = useState(false);
  const [currentButton, setCurrentButton] = useState(0);
  const [currentCampaign, setCurrentCampaign] = useState();
  const [openedCampaignCategory, setOpenedCampaignCategory] = useState([0]);
  const [openedCampaign, setOpenedCampaign] = useState(0);
  const [assignedContacts, setAssignedContacts] = useState();
  const [unassignedContacts, setUnassignedContacts] = useState();
  const [campaignViewContacts, setCampaignViewContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const router = useRouter();
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

  const handleOpenCategory = (tab, campaignId = null) => {
    console.log('llll', tab, campaignId);
    console.log(campaigns);
    setOpenedCampaignCategory(tab);

    // campaigns[tab].subtab.find(campaign=> campaign.campaign_id == campaignId)
    if (campaignId === null) {
      console.log('its null', campaigns[tab].subtab[0].campaign_id);
      handleOpenCampaign(campaigns[tab].subtab[0].campaign_id);
    } else {
      handleOpenCampaign(campaignId);
    }

    localStorage.setItem('openCampaignCategory', tab);
  };

  const handleOpenCampaign = async (campaignId) => {
    setOpenedCampaign(campaignId);
    setLoading(true);

    getCampaign(campaignId).then((data) => {
      setCurrentCampaign(data.data);
      tabs[0].count = data.data.contacts_assigned_count;
      tabs[1].count = data.data.contacts_never_assigned_count;
      tabs[2].count = data.data.contacts_unassigned_count;
      setLoading(false);
      localStorage.setItem('openCampaign', campaignId);
    });
    // fetch data
  };
  const handleUnassign = async (contactId) => {
    unassignContactFromCampaign(openedCampaign, contactId).then((data) => {
      fetchData(openedCampaignCategory);
      setShowUnassignOverlay(false);
    });
  };

  const handleAssignToCampaign = () => {
    setLoadingAssign(true);
    assignContactToCampaign(openedCampaign, contactToAssign).then((data) => {
      fetchData(openedCampaignCategory);
      setShowAssignOverlay(false);
      setLoadingAssign(false);
    });
  };

  const [tabs, setTabs] = useState([
    {
      id: 0,
      name: 'In Campaign',
      count: 0,
    },
    {
      id: 1,
      name: 'Not in Campaign',
      count: 0,
    },
    {
      id: 2,
      name: 'Unassigned',
      count: 0,
    },
  ]);

  const fetchData = async (openCategory) => {
    setLoading(true);
    getCampaignsByCategory(isClient ? 'Client' : 'Professional').then(
      (data) => {
        campaigns.forEach((campaign, index) => {
          campaigns[index].subtab = data.data.campaigns
            .filter(
              (fetchedCampaign) =>
                fetchedCampaign.contact_category_2 == campaign.value
            )
            .sort((a, b) => (a.campaign_id > b.campaign_id ? 1 : -1));
        });
        let campaignId = localStorage.getItem('openCampaign')
          ? localStorage.getItem('openCampaign')
          : null;
        // console.log('ttttttttttt', openedCampaign, campaignId);
        handleOpenCategory(openCategory, campaignId);
      }
    );
  };

  useEffect(() => {
    let category = localStorage.getItem('openCampaignCategory')
      ? localStorage.getItem('openCampaignCategory')
      : 0;
    fetchData(category);
  }, []);

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (url !== router.asPath) {
        localStorage.removeItem('openCampaignCategory');
        localStorage.removeItem('openCampaign');
      }
    };

    router.events.on('routeChangeStart', handleRouteChange);
  }, [router]);

  const handleEventPreview = async (event, event_name) => {
    setLoadingEventPreview(true);
    setShowEventPreview(true);
    setEventInfo({
      event_updated_at: event.event_updated_at,
      event_name: event_name,
    });
    console.log('event preview for', event);
    getContactCampaignEventPreview(event.event_id).then((data) => {
      setEventToPreview(data.data);
      setLoadingEventPreview(false);
    });
  };
  // useEffect(() => {
  //   let category = localStorage.getItem('openCampaignCategory');
  //   let campaignId = localStorage.getItem('openCampaign');
  //   console.log('category', category);
  //   console.log('campaignID', campaignId);
  //   // handleOpenCategory(category);
  //   // handleOpenCampaign(campaignId);
  // }, []);

  const handleSearch = (term, contacts) => {
    const trimmedSearchValue = term.replace(/\s+/g, '').toLowerCase();
    let filteredArray = contacts?.filter((item) => {
        const fullName = `${item.contact_name}`.toLowerCase();
        const fullEmail = `${item.contact_email}`.toLowerCase();
        return (
            fullName.includes(trimmedSearchValue) ||
            fullEmail.includes(trimmedSearchValue) 
        )
    });
    // setCampaignViewContacts(filteredArray);
    return filteredArray;
  }

  useEffect(() => {
    console.log('testing');
    const contactsInCurrentCampaign = currentButton == 0
        ? currentCampaign?.contacts?.filter(
            (contact) =>
              contact.contact_campaign_status == 'assigned'
          )
        : currentButton == 1
        ? currentCampaign?.contacts?.filter(
            (contact) =>
              contact.contact_campaign_status ==
              'never_assigned'
          )
        : currentCampaign?.contacts?.filter(
            (contact) =>
              contact.contact_campaign_status == 'unassigned'
          )
    
    const filteredArr = handleSearch(searchTerm, contactsInCurrentCampaign);

    setCampaignViewContacts(filteredArr);
  }, [currentCampaign, currentButton, searchTerm]);


  return (
    <>
      <MainMenu />
      <TopBar
        text={isClient ? 'Client Campaigns' : 'Professionals Campaigns'}
        onBackClick={() => router.push('/campaigns')}
      />
      <div className="border-t border-gray2 flex contact-campaigns-fixed-height">
        <div className="h-auto border-r border-gray2">
          <ContactCampaignsSidebar
            tabs={campaigns}
            openedTab={openedCampaignCategory}
            openedSubtab={openedCampaign}
            setOpenedTab={handleOpenCategory}
            setOpenedSubtab={(id) => handleOpenCampaign(id)}
            categoryType={isClient ? 'clients' : 'professionals'}
          />
        </div>
        <div className="w-full relative">
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="py-3 px-6 flex items-center justify-between">
                <div>
                  <Text>{currentCampaign.campaign_name}</Text>
                </div>
                <div className="flex items-center">
                  <Search
                    placeholder={`Search ${
                      campaigns.find(
                        (campaign) => campaign.id === openedCampaignCategory
                      )?.value
                        ? campaigns.find(
                            (campaign) => campaign.id === openedCampaignCategory
                          )?.value
                        : ''
                    }`}
                    className="mr-3"
                    onInput={(event) => setSearchTerm(event.target.value)}
                    value={searchTerm}

                  />
                  <ButtonsSlider
                    buttons={tabs}
                    currentButton={currentButton}
                    onClick={setCurrentButton}
                  ></ButtonsSlider>
                </div>
              </div>
              <div className={`w-auto h-auto`}>
                <div
                  className={`border border-gray-200 overflow-hidden relative h-full border-l-0 border-b-0`}
                >
                  <SimpleBar autoHide={true} style={{ maxHeight: '520px' }}>
                    <Table
                      tableFor="contact-campaigns"
                      handleSelectContact={handleSelectContact}
                      handleAction={(id, action) => {
                        if (action == 'unassign') {
                          setContactToUnassign(id);
                          setShowUnassignOverlay(true);
                        } else {
                          setContactToAssign(id);
                          setShowAssignOverlay(true);
                        }
                      }}
                      currentButton={currentButton}
                      handleEventPreview={handleEventPreview}
                      data={campaignViewContacts}
                      searchTerm={searchTerm}
                    />
                  </SimpleBar>
                  <EventPreview
                    eventInfo={eventInfo}
                    loading={loadingEventPreview}
                    event={eventToPreview}
                    showEventPreview={showEventPreview}
                    setShowEventPreview={setShowEventPreview}
                  />
                  {/* {selectedContacts.length > 1 && (
                    <div
                      style={{ zIndex: '99999 !important' }}
                      className="bg-white absolute bottom-0 left-0 right-0 px-6 py-4 fixed-categorize-menu rounded-b-lg flex items-center justify-end"
                    >
                      <Button
                        white
                        label="Cancel"
                        className="mr-4"
                        // onClick={() => handleCloseCategorize()}
                      />
                      <Button
                        primary
                        label={
                          'Unassign ' + selectedContacts.length + ' Client(s)'
                        }
                        danger
                        // onClick={() => saveCategorization()}
                      />
                    </div>
                  )} */}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {showUnassignOverlay && (
        <UnassignOverlay
          onSubmit={() => handleUnassign(contactToUnassign)}
          handleCloseOverlay={() => setShowUnassignOverlay(false)}
        />
      )}
      {showAssignOverlay && (
        <AssignCampaignOverlay
          loading={loadingAssign}
          onSubmit={handleAssignToCampaign}
          handleCloseOverlay={() => setShowAssignOverlay(false)}
        />
      )}
    </>
  );
};

export default ContactCampaigns;

export async function getStaticProps(context) {
  return {
    props: {
      requiresAuth: true,
    },
  };
}
