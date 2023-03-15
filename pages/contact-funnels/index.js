// import {
//   ExternalLinkIcon,
//   InformationCircleIcon,
//   MailIcon,
//   SearchIcon,
// } from '@heroicons/react/outline';
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect, useState } from 'react';
// // import Onboarding from 'components/Onboarding/Onboarding';
// import Table from 'components/shared/table';
// import SimpleBarReact from 'simplebar-react';
// import Button from 'components/shared/button';
// import Input from 'components/shared/input';
// import AddClientOverlay from 'components/overlays/add-clients';
// import AddContactOverlay from 'components/overlays/add-contact';
// import SidebarDetailedInformation from 'components/overlays/sidebar-detailed-information';
// import AddDripCampaignCustomerOverlay from 'components/overlays/add-drip-campaign-customer';
// import SelectableTable from 'components/SelectableTable';
// import DeleteContactOverlay from 'components/overlays/delete-contact';
// import { removeClientFromArray } from 'global/functions';
// import { MinusCircleIcon } from '@heroicons/react/outline';
// import Snackbar from 'components/shared/snackbar';
// import { classNames } from 'global/functions';
// import {
//   getContacts,
//   addContact,
//   updateContact,
//   deleteContact,
//   bulkAddContacts,
//   bulkUpdateContactStatus,
//   bulkUpdateContactType,
// } from 'store/contact/actions';
// import {
//   getClients,
//   addClient,
//   updateClient,
//   deleteClient,
//   bulkAddClients,
//   bulkUpdateClientStatus,
//   bulkUpdateClientType,
// } from 'store/client/actions';
// import {
//   getCampaigns,
//   addClientToCampaign,
//   deleteClientFromCampaign,
// } from 'store/campaign/actions';
// import { removeCampaignFromClient } from 'store/event/slice';
// import { clientStatuses, contactStatuses } from 'global/variables';

// const ContactFunnels = () => {
//   const dispatch = useDispatch();
//   const { _data: contacts = [] } = useSelector((state) => state.contacts);
//   const { _data: campaigns = [] } = useSelector((state) => state.campaigns);
//   const { _data: clients = [] } = useSelector((state) => state.clients);

//   const [contactsLocal, setContactsLocal] = useState(contacts);
//   const [clientsLocal, setClientsLocal] = useState(clients);
//   const [campaignsLocal, setCampaignsLocal] = useState(campaigns);

//   useEffect(() => {
//     dispatch(getContacts({ active: 'active' }));
//     dispatch(getCampaigns());
//     dispatch(getClients());
//   }, []);

//   useEffect(() => {
//     if (contacts) setContactsLocal(contacts);
//     if (clients) setClientsLocal(clients);
//     if (campaigns) setCampaignsLocal(campaigns);
//   }, [contacts, clients, campaigns]);

//   useEffect(() => {
//     if (firstTimeUser) {
//       setTimeout(() => {
//         setOnboardingOverlayVisible(true);
//         setFirstTimeUser(false);
//       }, 2000);
//     }
//   }, []);

//   const [currentTab, setCurrentTab] = useState(0);
//   const [sidebarCurrentCustomer, setSidebarCurrentCustomer] = useState({});

//   const [onboardingOverlayVisible, setOnboardingOverlayVisible] =
//     useState(false);

//   const [firstTimeUser, setFirstTimeUser] = useState(true);

//   const [addClientsOverlayVisible, setAddClientsOverlayVisible] =
//     useState(false);

//   const [addContactsOverlayVisible, setAddContactsOverlayVisible] =
//     useState(false);
//   const isClient = currentTab === 0;
//   const [tabs, setTabs] = useState([
//     { id: 0, name: 'Clients', href: '#' },
//     { id: 1, name: 'Contacts', href: '#' },
//     { id: 2, name: 'Drip Campaigns', href: '#' },
//   ]);

//   const [currentEvent, setCurrentEvent] = useState(0);

//   const [currentCampaign, setCurrentCampaign] = useState(0);

//   const [currentEventFilter, setCurrentEventFilter] = useState(0);

//   const [openCustomerDetails, setOpenCustomerDetails] = useState(false);

//   const [clientDetailTabs, setClientDetailTabs] = useState([
//     { id: 0, name: 'General Information', href: '#' },
//     { id: 1, name: 'Campaigns', href: '#' },
//     { id: 2, name: 'Activity Log', href: '#' },
//   ]);

//   const handleAddContactsOverlayVisibility = (visible) => {
//     setAddContactsOverlayVisible(visible);
//   };

//   const handleAddClientsOverlayVisibility = (visible) => {
//     setAddClientsOverlayVisible(visible);
//   };

//   const handleOnboardingOverlayVisibile = (visible) => () => {
//     setOnboardingOverlayVisible(visible);
//   };

//   const handleAddClient = (client) => {
//     dispatch(addClient(client));
//     handleAddClientsOverlayVisibility(false);
//   };

//   const handleAddContact = (contact) => {
//     dispatch(addContact(contact));
//     handleAddContactsOverlayVisibility(false);
//   };

//   const handlePersonClick = (value, card) => {
//     setSidebarCurrentCustomer(card);
//     setTimeout(() => {
//       setOpenCustomerDetails(value);
//     }, 1);
//   };

//   const editCustomer = (customer) => () => {
//     if (isClient) dispatch(updateClient(customer));
//     else dispatch(updateContact(customer));
//     setOpenCustomerDetails(false);
//   };

//   const deleteCampaigns = (campaignIds, newCustomer) => {
//     deleteClientFromCampaignHandler(newCustomer?.email);
//     dispatch(removeCampaignFromClient(campaignIds[0]));
//   };
//   const bulkUpdateKey = isClient ? 'clients' : 'contacts';

//   const bulkFilterByStatus = (status) => {
//     const data = selectedCards.map((selectedEmail) => ({
//       tenant: 'oxford',
//       email: selectedEmail,
//       status,
//     }));
//     const payload = {
//       [bulkUpdateKey]: data,
//     };
//     isClient
//       ? dispatch(bulkUpdateClientStatus(payload))
//       : dispatch(bulkUpdateContactStatus(payload));
//   };

//   const bulkFilterByType = (type) => {
//     const data = selectedCards.map((selectedEmail) => ({
//       tenant: 'oxford',
//       email: selectedEmail,
//       type,
//     }));
//     const payload = {
//       [bulkUpdateKey]: data,
//     };
//     isClient
//       ? dispatch(bulkUpdateClientType(payload))
//       : dispatch(bulkUpdateContactType(payload));
//   };

//   const bulkDelete = () => {
//     const data = selectedCards.map((selectedEmail) => ({
//       tenant: 'oxford',
//       email: selectedEmail,
//       type: 'Trash',
//     }));
//     const payload = {
//       [bulkUpdateKey]: data,
//     };
//     isClient
//       ? dispatch(bulkUpdateClientType(payload))
//       : dispatch(bulkUpdateContactType(payload));
//   };

//   const addActivity = (activity, newCustomer) => {
//     let customersCopy = newCustomer.isClient ? [...clients] : [...contacts];
//     let objIndex = customersCopy.findIndex(
//       (customer) => customer.email == newCustomer.email
//     );

//     customersCopy[objIndex].activities.push(activity);
//     newCustomer.isClient
//       ? setClients(customersCopy)
//       : setContacts(customersCopy);
//   };

//   const handleDeleteCustomer = ({ tenant, email }) => {
//     if (isClient) dispatch(deleteClient({ tenant, email }));
//     else dispatch(deleteContact({ tenant, email }));

//     setOpenCustomerDetails(false);
//   };

//   const handleChangeCustomerType = (type, card) => () => {
//     const { created_at, modified_at, ...otherData } = card;
//     const payload = { ...otherData, type: type };
//     editCustomer(payload)();
//   };

//   const [addDripCampaignCustomerOverlay, setAddDripCampaignCustomerOverlay] =
//     useState(false);

//   const handleDripCampaignCustomerAdd = (customers) => {
//     customers.forEach((customer) => {
//       const payload = {
//         tenant: 'oxford',
//         campaign_id: campaigns[currentCampaign].id,
//         client_email: customer.email,
//       };
//       dispatch(addClientToCampaign(payload));
//     });
//     setAddDripCampaignCustomerOverlay(false);
//   };

//   const [
//     deleteFromCampaignOverlayVisibility,
//     setDeleteFromCampaignOverlayVisibility,
//   ] = useState(false);

//   const [selectedDripCustomers, setSelectedDripCustomers] = useState([]);

//   const handleAddUploadedClients = (clients, selectedEmails) => {
//     let uploadedClients = clients.filter((client) => {
//       return selectedEmails.includes(client.email);
//     });
//     dispatch(bulkAddClients(uploadedClients));
//     setAddClientsOverlayVisible(false);
//   };

//   const handleAddUploadedContacts = (contacts, selectedEmails) => {
//     let uploadedContacts = contacts.filter((contact) => {
//       return selectedEmails.includes(contact.email);
//     });
//     dispatch(bulkAddContacts(uploadedContacts));
//     setAddContactsOverlayVisible(false);
//   };

//   const [uncategorizedSnackbarShown, setUncategorizedSnackbarShown] =
//     useState(false);

//   const [selectedCards, setSelectedCards] = useState([]);

//   const handleSelect = (event, card) => {
//     if (event.target.checked) {
//       setSelectedCards((prevState) => [...prevState, card.email]);
//     } else {
//       setSelectedCards((prevState) =>
//         prevState.filter((element) => element != card.email)
//       );
//     }
//   };

//   const searchCustomers = (e) => {
//     let searchTerm = e.target.value.trim().toLowerCase();

//     if (e.key === 'Enter') {
//       if (currentTab == 0) {
//         setClientsLocal(
//           clients.filter(
//             (card) =>
//               card.first_name?.toLowerCase().indexOf(searchTerm) != -1 ||
//               card.last_name?.toLowerCase().indexOf(searchTerm) != -1
//           )
//         );
//       } else if (currentTab == 1) {
//         setContactsLocal(
//           contacts.filter(
//             (card) =>
//               card.first_name?.toLowerCase().indexOf(searchTerm) != -1 ||
//               card.last_name?.toLowerCase().indexOf(searchTerm) != -1
//           )
//         );
//       } else if (currentTab == 2) {
//         let campaignCopy = Object.assign({}, campaigns[currentCampaign]);
//         if (campaignCopy.clients) {
//           campaignCopy.clients = campaigns[currentCampaign].clients.filter(
//             (client) => client.toLowerCase().indexOf(searchTerm) != -1
//           );
//         } else if (campaignCopy.contacts) {
//           campaignCopy.contacts = campaigns[currentCampaign].contacts.filter(
//             (contact) => contact.toLowerCase().indexOf(searchTerm) != -1
//           );
//         }
//         setCampaignsLocal([campaignCopy]);
//       }
//     }
//   };

//   const deleteClientFromCampaignHandler = (clientEmail) => {
//     const payload = {
//       tenant: 'oxford',
//       campaign_id: campaigns[currentCampaign].id,
//       client_email: clientEmail,
//     };
//     dispatch(deleteClientFromCampaign(payload));
//   };

//   const DripCampaignsTab = (props) => {
//     return (
//       <div
//         className={
//           'tabs-wrapper__tab ' +
//           (props.tab.id == currentTab ? 'd-block' : 'hidden')
//         }
//       >
//         {uncategorizedSnackbarShown && (
//           <Snackbar
//             bottomRight
//             handleClose={() => setUncategorizedSnackbarShown(false)}
//             title="Uncategorized Contacts."
//             description="It seems you have a lot of uncategorized client. Set the client type and then the status by drag and drop on the right pannels."
//           />
//         )}
//         <div className="tabs-wrapper__subtabs flex items-start">
//           <ul className="tabs-wrapper__subtab-links max-w-[210px] w-1/4 border-r border-[#E6E8F0] h-screen">
//             <li>
//               <p
//                 href="#"
//                 className="block text-xs py-5 px-4 uppercase text-[#696F8C] font-medium"
//               >
//                 Campaigns
//               </p>
//             </li>
//             {campaignsLocal.map((campaign, key) => {
//               return (
//                 <li key={key}>
//                   <a
//                     href="#"
//                     onClick={() => setCurrentCampaign(key)}
//                     className={
//                       'block text-sm py-3 px-4 ' +
//                       (currentCampaign == key
//                         ? 'text-primaryOxford bg-indigo-50 border-l-2 border-primaryOxford'
//                         : '')
//                     }
//                   >
//                     {campaign.campaign_name}
//                   </a>
//                 </li>
//               );
//             })}
//           </ul>
//           <div className="tabs-wrapper__subtab-content w-full">
//             {campaignsLocal.map((campaign, key) => {
//               return (
//                 <div
//                   key={key}
//                   className={
//                     'tab-pane border-b border-[#E6E8F0] ' +
//                     (key != currentCampaign ? 'hidden' : '')
//                   }
//                 >
//                   <div className="tab-pane__information-accordion p-6">
//                     <div className="tab-pane__accordion-header flex">
//                       <InformationCircleIcon
//                         color="#696F8C"
//                         width={20}
//                         className="mr-1"
//                       />
//                       <p className="text-sm text-[#696F8C]">
//                         <strong>Information:</strong> To be part of this
//                         campaign, clients must need to be:
//                       </p>
//                     </div>
//                     <div className="tab-pane__accordion-content mt-[28px] flex">
//                       <div className="type-wrapper mr-[25px]">
//                         <p className="p-0 mb-[5px] font-medium text-[#101840] text-sm">
//                           Type
//                         </p>
//                         <div className="leading-none chip rounded-[4px] bg-[#EDEFF5] text-xs text-[#474D66] uppercase inline-block px-[25px] py-[5px] font-medium">
//                           {campaign.campaign_for_type}
//                         </div>
//                       </div>
//                       <div className="type-wrapper">
//                         <p className="p-0 mb-[5px] font-medium text-[#101840] text-sm">
//                           Status
//                         </p>
//                         <div className="leading-none text-sm text-[#474D66] font-medium flex items-center py-[5px]">
//                           <span className="h-[6px] w-[6px] rounded-full ring-2 ring-white bg-green-400 mr-[8px]" />
//                           {campaign.campaign_for_status}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="tab-pane__events-section">
//                     <div className="tab-pane__events-header flex border-y border-gray-300">
//                       <div className="flex align-center border-r border-gray-300 min-w-[270px] justify-between px-6 py-5">
//                         <p className="text-sm text-[#474D66] font-medium">
//                           Events: {campaign?.preconfigured_events?.length}
//                         </p>
//                         {/* <p className="text-sm text-[#474D66] font-medium">
//                           Clients: 0
//                         </p> */}
//                       </div>
//                       <div className="flex items-center w-full px-6 justify-between">
//                         <div className="flex align-center text-sm text-[#474D66] font-medium">
//                           In This Campaign: {campaign?.clients?.length}
//                         </div>

//                         <div className="search-wrapper flex items-center">
//                           <div className="ml-4">
//                             <Input
//                               type="search"
//                               name="search"
//                               id="search-value"
//                               placeholder="Search Clients / Contacts"
//                               iconBefore={
//                                 <SearchIcon
//                                   height={20}
//                                   className="text-[#727986]"
//                                 />
//                               }
//                               onKeyDown={searchCustomers}
//                             />
//                           </div>
//                           <div className="table-add-client ml-4">
//                             <button
//                               type="button"
//                               className="bg-primaryOxford rounded text-white px-4 py-2 font-medium text-sm"
//                               onClick={() =>
//                                 setAddDripCampaignCustomerOverlay(true)
//                               }
//                             >
//                               Add Clients / Contacts
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="tab-pane__events-wrapper flex">
//                       <div className="tab-pane__events-menu min-w-[270px] border-r border-gray-300">
//                         <ul>
//                           <SimpleBarReact
//                             style={{ maxHeight: 500 }}
//                             autoHide={true}
//                           >
//                             {campaign?.preconfigured_events?.map(
//                               (event, key) => {
//                                 return (
//                                   <li
//                                     key={event.id}
//                                     className={
//                                       'cursor-pointer py-3 px-4 ' +
//                                       (currentEvent == event.id
//                                         ? 'text-primaryOxford bg-indigo-50 border-l-2 border-primaryOxford'
//                                         : '')
//                                     }
//                                   >
//                                     <div className="flex items-center text-sm mb-2">
//                                       <a
//                                         href="#"
//                                         className={
//                                           'font-semibold ' +
//                                           (currentEvent == event.id
//                                             ? 'text-primaryOxford'
//                                             : 'text-[#474D66]')
//                                         }
//                                       >
//                                         {event.name}
//                                       </a>
//                                       <ExternalLinkIcon
//                                         className="ml-1 text-primaryOxford"
//                                         height={15}
//                                       />
//                                     </div>
//                                     <div className="flex items-center text-[#696F8C]">
//                                       <span className="flex items-center text-xs leading-none">
//                                         <MailIcon
//                                           height={15}
//                                           className="mr-1"
//                                         />{' '}
//                                         {event.to_execute}
//                                       </span>
//                                     </div>
//                                   </li>
//                                 );
//                               }
//                             )}
//                           </SimpleBarReact>
//                         </ul>
//                       </div>
//                       <div className="tab-pane__events-content w-full h-auto">
//                         {campaign?.preconfigured_events?.map((event, key) => {
//                           return (
//                             <SimpleBarReact
//                               style={{ maxHeight: 450 }}
//                               autoHide={true}
//                               key={key}
//                             >
//                               <div
//                                 className={
//                                   'h-full flex flex-col text-center tab-pane__event ' +
//                                   (key != currentEvent ? 'hidden' : '')
//                                 }
//                               >
//                                 {(
//                                   campaign?.clients
//                                     ? campaign?.clients?.length > 0
//                                     : campaign?.contacts?.length > 0
//                                 ) ? (
//                                   <SelectableTable
//                                     headers={[
//                                       'Contact / Client name',
//                                       'added in campaign',
//                                       'last communication',
//                                       'next communication',
//                                     ]}
//                                     dripCampaignCustomers={
//                                       campaign?.clients
//                                         ? campaign?.clients
//                                         : campaign?.contacts
//                                     }
//                                     deleteClientFromCampaign={
//                                       deleteClientFromCampaignHandler
//                                     }
//                                   ></SelectableTable>
//                                 ) : (
//                                   'No Clients Added'
//                                 )}
//                               </div>
//                             </SimpleBarReact>
//                           );
//                         })}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="contact-funnels-page mt-6">
//       {/* {onboardingOverlayVisible && (
//         <Onboarding
//           handleOnboardingOverlayVisibile={handleOnboardingOverlayVisibile}
//           visible={onboardingOverlayVisible}
//         />
//       )} */}
//       <AddDripCampaignCustomerOverlay
//         visible={addDripCampaignCustomerOverlay}
//         handleDripCampaignCustomerOverlay={(visibility) =>
//           setAddDripCampaignCustomerOverlay(visibility)
//         }
//         currentCampaign={campaigns[currentCampaign]}
//         clients={clients}
//         contacts={contacts}
//         handleDripCampaignCustomerAdd={handleDripCampaignCustomerAdd}
//       />
//       <AddClientOverlay
//         handleAddClientsOverlayVisibility={handleAddClientsOverlayVisibility}
//         visible={addClientsOverlayVisible}
//         handleAddClient={handleAddClient}
//         handleAddUploadedClients={handleAddUploadedClients}
//       />
//       <AddContactOverlay
//         handleAddContactsOverlayVisibility={handleAddContactsOverlayVisibility}
//         visible={addContactsOverlayVisible}
//         handleAddContact={handleAddContact}
//         handleAddUploadedContacts={handleAddUploadedContacts}
//       />
//       <SidebarDetailedInformation
//         isClient={isClient}
//         key={sidebarCurrentCustomer.email}
//         tabs={clientDetailTabs}
//         open={openCustomerDetails}
//         setOpen={(value) => setOpenCustomerDetails(value)}
//         currentCustomer={sidebarCurrentCustomer}
//         setCurrentCustomer={setSidebarCurrentCustomer}
//         editCustomer={(customerId) => editCustomer(customerId)}
//         deleteCampaigns={(campaignIds, newCustomer) =>
//           deleteCampaigns(campaignIds, newCustomer)
//         }
//         handleAddActivity={(activity, newCustomer) =>
//           addActivity(activity, newCustomer)
//         }
//         handleDeleteCustomer={handleDeleteCustomer}
//       />
//       <div className="title px-6">
//         <h5 className="text-xl font-medium">Contact Funnels</h5>
//       </div>
//       <div className="tabs">
//         <div className="tabs__tabs-header border-b border-gray-300 px-6">
//           <div className="sm:hidden">
//             <label htmlFor="tabs" className="sr-only">
//               Select a tab
//             </label>
//             {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
//             <select
//               id="tabs"
//               name="tabs"
//               className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primaryOxford focus:border-primaryOxford sm:text-sm rounded-md"
//               // defaultValue={tabs.find((tab) => tab.current).name}
//               onChange={() => setCurrentTab(tab.id)}
//             >
//               {tabs.map((tab) => (
//                 <option key={tab.name}>{tab.name}</option>
//               ))}
//             </select>
//           </div>
//           <div className="hidden sm:block">
//             <div className="">
//               <nav className="-mb-px flex space-x-8" aria-label="Tabs">
//                 {tabs.map((tab) => (
//                   <a
//                     key={tab.name}
//                     href={tab.href}
//                     className={classNames(
//                       currentTab == tab.id
//                         ? 'border-primaryOxford text-primary'
//                         : 'border-none text-gray-500 hover:text-gray-700 hover:border-gray-300 text-inactiveMainMenuColor',
//                       'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm '
//                     )}
//                     onClick={() => {
//                       setCurrentTab(tab.id);
//                     }}
//                   >
//                     {tab.name}
//                   </a>
//                 ))}
//               </nav>
//             </div>
//           </div>
//         </div>
//         <div className="tabs__tabs-wrapper">
//           {tabs.map((tab) => {
//             if (tab.id == 0) {
//               return (
//                 <Table
//                   isClient={isClient}
//                   key={tab.id}
//                   cards={clientsLocal}
//                   currentTab={currentTab}
//                   tab={tab}
//                   tableHeaders={clientStatuses}
//                   handleAddClientsOverlayVisibility={
//                     handleAddClientsOverlayVisibility
//                   }
//                   handlePersonClick={handlePersonClick}
//                   handleChangeCustomerType={handleChangeCustomerType}
//                   selectedCards={selectedCards}
//                   handleSelect={handleSelect}
//                   bulkFilterByStatus={bulkFilterByStatus}
//                   bulkFilterByType={bulkFilterByType}
//                   bulkDelete={bulkDelete}
//                   handleKeyDown={searchCustomers}
//                   forClients
//                 />
//               );
//             } else if (tab.id == 1) {
//               return (
//                 <Table
//                   isClient={isClient}
//                   key={tab.id}
//                   cards={contactsLocal}
//                   currentTab={currentTab}
//                   tab={tab}
//                   tableHeaders={contactStatuses}
//                   handleAddContactsOverlayVisibility={
//                     handleAddContactsOverlayVisibility
//                   }
//                   handlePersonClick={handlePersonClick}
//                   handleChangeCustomerType={handleChangeCustomerType}
//                   selectedCards={selectedCards}
//                   handleSelect={handleSelect}
//                   bulkFilterByStatus={bulkFilterByType}
//                   bulkFilterByType={bulkFilterByStatus}
//                   bulkDelete={bulkDelete}
//                   handleKeyDown={searchCustomers}
//                 />
//               );
//             } else {
//               return <DripCampaignsTab key={tab.id} tab={tab} />;
//             }
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactFunnels;
