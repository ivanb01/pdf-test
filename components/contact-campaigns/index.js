import MainMenu from 'components/shared/menu';
import TopBar from 'components/shared/top-bar';
import Router from 'next/router';
import Search from 'components/shared/input/search';
import ButtonsSlider from 'components/shared/button/buttonsSlider';
import { useEffect, useState } from 'react';
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

const ContactCampaigns = ({ isClient, campaigns }) => {
  console.log('campaigns', campaigns);
  const [showUnassignOverlay, setShowUnassignOverlay] = useState(false);
  const [showAssignOverlay, setShowAssignOverlay] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [contactToUnassign, setContactToUnassign] = useState();
  const [contactToAssign, setContactToAssign] = useState();
  const [loading, setLoading] = useState(true);
  const [currentButton, setCurrentButton] = useState(2);
  const [currentCampaign, setCurrentCampaign] = useState();
  const [openedCampaignCategory, setOpenedCampaignCategory] = useState([0]);
  const [openedCampaign, setOpenedCampaign] = useState(0);

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

  const handleOpenCategory = (tab) => {
    setOpenedCampaignCategory(tab);
    handleOpenCampaign(campaigns[tab].subtab[0].campaign_id);
  };

  const handleOpenCampaign = async (campaignId) => {
    setOpenedCampaign(campaignId);
    setLoading(true);

    getCampaign(campaignId).then((data) => {
      console.log(data.data);
      setCurrentCampaign(data.data);
      tabs[0].count = data.data.contacts.length;
      tabs[1].count = data.data.contacts_assigned_count;
      tabs[2].count =
        data.data.contacts_unassigned_count +
        data.data.contacts_never_assigned_count;
      setLoading(false);
      console.log('campaign', data.data);
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
    assignContactToCampaign(openedCampaign, contactToAssign).then((data) => {
      fetchData(openedCampaignCategory);
      setShowAssignOverlay(false);
    });
  };

  const [tabs, setTabs] = useState([
    {
      id: 2,
      name: 'All',
      count: 0,
    },
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
  ]);

  const fetchData = async (openCategory) => {
    setLoading(true);
    getCampaignsByCategory(isClient ? 'Client' : 'Professional').then(
      (data) => {
        campaigns.forEach((campaign, index) => {
          campaigns[index].subtab = data.data.campaigns.filter(
            (fetchedCampaign) =>
              fetchedCampaign.contact_category_2 == campaign.value
          );
        });
        handleOpenCategory(openCategory);
      }
    );
  };

  useEffect(() => {
    fetchData(0);
  }, []);

  return (
    <>
      <MainMenu />
      <TopBar
        text={isClient ? 'Client Campaigns' : 'Professionals Campaigns'}
        onBackClick={() => Router.push('/campaigns')}
      />
      <div className="border-t border-gray2 flex h-auto min-h-full">
        <div className="h-auto border-r border-gray2">
          <ContactCampaignsSidebar
            tabs={campaigns}
            openedTab={openedCampaignCategory}
            openedSubtab={openedCampaign}
            setOpenedTab={handleOpenCategory}
            setOpenedSubtab={(id) => handleOpenCampaign(id)}
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
                  <Search placeholder="Search Seller" className="mr-3" />
                  <ButtonsSlider
                    buttons={tabs}
                    currentButton={currentButton}
                    onClick={setCurrentButton}
                  ></ButtonsSlider>
                </div>
              </div>
              <div
                className={`w-auto bg-gray10 ${
                  currentCampaign.contacts.length ? 'h-auto' : 'h-full'
                }`}
              >
                <div
                  className={`border border-gray-200 overflow-hidden relative h-full`}
                >
                  {currentCampaign.contacts.length ? (
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
                        data={
                          currentButton == 0
                            ? currentCampaign.contacts.filter(
                                (contact) =>
                                  contact.contact_campaign_status == 'assigned'
                              )
                            : currentButton == 1
                            ? currentCampaign.contacts.filter(
                                (contact) =>
                                  contact.contact_campaign_status ==
                                    'unassigned' ||
                                  contact.contact_campaign_status ==
                                    'never_assigned'
                              )
                            : currentCampaign.contacts
                        }
                      />
                    </SimpleBar>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full max-w-[350px] mx-auto my-0">
                      <Image src={noClientCampaigns}></Image>
                      <Text h3 className="text-gray7 mb-2 mt-4 text-center">
                        You don’t have any client assigned here
                      </Text>
                      <Text p className="text-gray4 relative text-center mb-6">
                        Clients that are part of this campaign will be listed
                        here
                      </Text>
                    </div>
                  )}
                  {selectedContacts.length > 1 && (
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
                  )}
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
