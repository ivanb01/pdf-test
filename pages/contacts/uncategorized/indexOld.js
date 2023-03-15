import TabsSlider from 'components/shared/button/buttonsSlider';
import { useState } from 'react';
import Search from 'components/shared/input/search';
import Button from 'components/shared/button';
import { PlusIcon } from '@heroicons/react/outline';
import Table from 'components/shared/table';
import SimpleBar from 'simplebar-react';
import Text from 'components/shared/text';
import trophyImg from 'public/images/trophy.svg';
import Image from 'next/image';
import Link from 'components/Link';
import CircleStepNumber from 'components/shared/circle-step-number';
import { types } from 'global/variables';
import { statuses } from 'global/variables';
import ContactTypeSelect from 'components/contact/contact-type-select';
import StatusSelect from 'components/status-select';
import { useEffect } from 'react';
import CategorizedSuccessfullyOverlay from 'components/overlays/categorized-successfully';

const Uncategorized = () => {
  const [newRecordsContacts, setNewRecordsContacts] = useState([
    {
      first_name: 'Lindsay',
      last_name: 'Walton',
      email: 'lindsay.walton@example.com',
      addedFrom: 'CSV',
      addedDate: '01/01/2022',
      type: null,
      status: null,
    },
    {
      first_name: 'Lindsay',
      last_name: 'Walton',
      email: 'lindsay.waltonn@example.com',
      addedFrom: 'CSV',
      addedDate: '01/01/2022',
      type: null,
      status: null,
    },
    {
      first_name: 'Lindsay',
      last_name: 'Walton',
      email: 'lindsay.waltons@example.com',
      addedFrom: 'CSV',
      addedDate: '01/01/2022',
      type: null,
      status: null,
    },
    {
      first_name: 'Lindsay',
      last_name: 'Walton',
      email: 'lindsay.waltoen@example.com',
      addedFrom: 'CSV',
      addedDate: '01/01/2022',
      type: null,
      status: null,
    },
    {
      first_name: 'Lindsay',
      last_name: 'Walton',
      email: 'lindsay.waltofn@example.com',
      addedFrom: 'CSV',
      addedDate: '01/01/2022',
      type: null,
      status: null,
    },
    {
      first_name: 'Lindsay',
      last_name: 'Walton',
      email: 'lindsay.walhton@example.com',
      addedFrom: 'CSV',
      addedDate: '01/01/2022',
      type: null,
      status: null,
    },
    {
      first_name: 'Lindsay',
      last_name: 'Walton',
      email: 'lindsay.waltoqn@example.com',
      addedFrom: 'CSV',
      addedDate: '01/01/2022',
      type: null,
      status: null,
    },
    {
      first_name: 'Lindsay',
      last_name: 'Walton',
      email: 'lindsay.waltzon@example.com',
      addedFrom: 'CSV',
      addedDate: '01/01/2022',
      type: null,
      status: null,
    },
    {
      first_name: 'Lindsay',
      last_name: 'Walton',
      email: 'lindsay.wallton@example.com',
      addedFrom: 'CSV',
      addedDate: '01/01/2022',
      type: null,
      status: null,
    },
    {
      first_name: 'Lindsay',
      last_name: 'Walton',
      email: 'lindsay.waltoln@example.com',
      addedFrom: 'CSV',
      addedDate: '01/01/2022',
      type: null,
      status: null,
    },
  ]);
  const [unknownContacts, setUnknownContacts] = useState([
    {
      first_name: 'Lindsay',
      last_name: 'Walton',
      email: 'lindsay.walto1n@example.com',
      addedFrom: 'CSV',
      addedDate: '01/01/2022',
      type: null,
      status: null,
    },
  ]);
  const [trashContacts, setTrashContacts] = useState([
    {
      first_name: 'Blendar',
      last_name: 'Kabashi',
      email: 'blendar.kabashi@gmail.com',
      addedFrom: 'CSV',
      addedDate: '01/01/2022',
      type: null,
      status: null,
    },
  ]);
  const tabs = [
    {
      id: 0,
      name: 'New Records',
      count: newRecordsContacts.length,
    },
    {
      id: 1,
      name: 'Unknown',
      count: unknownContacts.length,
    },
    {
      id: 2,
      name: 'Trash',
      count: trashContacts.length,
    },
  ];
  const [currentTab, setCurrentTab] = useState(0);
  const [expandSearch, setExpandSearch] = useState(false);

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
  const handleClickContact = (contact, event) => {
    event.target
      .closest('.contact-row')
      .querySelector('[type="checkbox"]')
      .click();
  };

  const [selectedContacts, setSelectedContacts] = useState([]);

  useEffect(() => {
    if (selectedContacts.length > 0) {
      setShowCategorize(true);
    } else {
      setShowCategorize(false);
    }
  }, [selectedContacts]);

  const [selectedType, setSelectedType] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const handleCloseCategorize = () => {
    setSelectedType(0);
    setSelectedStatus(0);
    setSelectedContacts([]);
  };

  const [showCategorize, setShowCategorize] = useState(false);

  const handleCloseCategorizedSuccessfully = () => {
    setShowCategorizedSuccessfully(false);
  };
  const [showCategorizedSuccessfully, setShowCategorizedSuccessfully] =
    useState(false);

  const handleSetType = (id) => {
    let newRecordsContactsCopy = [...newRecordsContacts];
    let contactsToBeChanged = newRecordsContactsCopy.filter((contact) =>
      selectedContacts.includes(contact.email)
    );
    contactsToBeChanged.map((contact) => {
      contact.type = id;
    });
    setNewRecordsContacts(newRecordsContactsCopy);
    setSelectedType(id);
  };

  const handleSetStatus = (id) => {
    let newRecordsContactsCopy = [...newRecordsContacts];
    let contactsToBeChanged = newRecordsContactsCopy.filter((contact) =>
      selectedContacts.includes(contact.email)
    );
    contactsToBeChanged.map((contact) => {
      contact.status = id;
    });
    setNewRecordsContacts(newRecordsContactsCopy);
    setSelectedStatus(id);
  };

  const saveCategorization = () => {
    console.log('save categorization', newRecordsContacts);
  };

  return (
    <div
      className="h-[571px] w-full bg-gray10 p-6"
      // style={{ height: 'calc(100vh-246px)' }}
    >
      <div className="rounded-lg h-full w-full flex bg-white border border-gray11 relative">
        <div className="w-full border-r border-gray11">
          <div className="flex items-center justify-between h-20 px-6 py-5">
            {!expandSearch ? (
              <TabsSlider
                tabs={tabs}
                currentTab={currentTab}
                onClick={setCurrentTab}
              />
            ) : (
              <div></div>
            )}
            <div className="flex items-center justify-self-end">
              <Search expandable placeholder="Search" className="mr-2" />
              <Button
                primary
                leftIcon={<PlusIcon className="w-4" />}
                label="Import CSV"
                className="ml-2"
              />
            </div>
          </div>
          <div className="">
            <SimpleBar
              autoHide={true}
              className="overflow-x-hidden"
              style={{ maxHeight: selectedContacts.length > 0 ? 371 : 441 }}
            >
              <Table
                tableFor="uncategorized"
                data={
                  currentTab == 0
                    ? newRecordsContacts
                    : currentTab == 1
                    ? unknownContacts
                    : trashContacts
                }
                handleSelectAll={handleSelectAll}
                handleSelectContact={handleSelectContact}
                handleClickRow={handleClickContact}
                showCategorize={showCategorize}
              />
            </SimpleBar>
          </div>
        </div>
        <div className="w-full">
          {showCategorize ? (
            <SimpleBar
              autoHide={true}
              className="overflow-x-hidden"
              style={{ maxHeight: 451 }}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <CircleStepNumber number={1} className="mr-2" />
                  <Text h3>What type of contact is this for you?</Text>
                </div>
                <div className="grid grid-cols-3 gap-4 pl-9 mb-6">
                  {types.map((type, index) => {
                    return (
                      <div key={index}>
                        <ContactTypeSelect
                          type={type}
                          setSelectedType={handleSetType}
                          selectedType={selectedType}
                        />
                      </div>
                    );
                  })}
                </div>
                {selectedType != null && (
                  <>
                    <div className="flex items-center mb-4">
                      <CircleStepNumber number={2} className="mr-2" />
                      <Text h3>In what stage of communication?</Text>
                    </div>
                    <StatusSelect
                      className="pl-9"
                      selectedStatus={selectedStatus}
                      setSelectedStatus={handleSetStatus}
                      statuses={statuses}
                    />
                  </>
                )}
              </div>
            </SimpleBar>
          ) : (
            <>
              <div className="flex min-h-[150px] border-b border-gray11">
                <div className="w-full border-r border-gray11 p-6 flex-col items-center">
                  <div className="text-gray7 font-normal text-base">
                    Categorized
                  </div>
                  <div className="flex items-center border-b border-b-borderColor pb-1 mb-4">
                    <div className="bg-gray-200 rounded-full w-full mr-4">
                      <div
                        className="h-2 bg-lightBlue3 rounded-full"
                        style={{ width: '37.5%' }}
                      />
                    </div>
                    <div className="font-bold text-[22px]">37.5%</div>
                  </div>
                  <div className="text-[#7C828A] font-normal text-base">
                    0 Categorized
                  </div>
                </div>
                <div className="w-full p-6 flex-col items-center">
                  <div className="text-gray7 font-normal text-base">
                    Categorized Today
                  </div>
                  <div className="flex items-center border-b border-b-borderColor pb-1 mb-4">
                    <div className="font-semibold text-[22px]">0 Contacts</div>
                  </div>
                  <div className="text-[#7C828A] font-medium text-base">
                    0 Clients, 0 Professionals
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center h-[371px]">
                <div className="text-[20px] font-medium text-gray7 mb-6">
                  Life is easier with categorized contacts.
                </div>
                <Button
                  primary
                  className="bg-orange1 mb-6"
                  label="Start with 10!"
                />
                <div className="text-sm text-[#6B7280] mb-6">
                  And win{' '}
                  <span className="font-bold text-[#2B3549]">
                    "The Agent Trophy"
                  </span>
                </div>
                <Image height={130} width={130} src={trophyImg} />
                <Text p className="text-gray8 mt-6">
                  Don't know how?{' '}
                  <Link href="#" underline>
                    Watch the video
                  </Link>
                </Text>
              </div>
            </>
          )}
        </div>
        {showCategorize && (
          <div
            style={{ zIndex: '99999 !important' }}
            className="bg-white absolute bottom-0 left-0 right-0 px-6 py-4 fixed-categorize-menu rounded-b-lg flex items-center justify-end"
          >
            <Button
              white
              label="Cancel"
              className="mr-4"
              onClick={() => handleCloseCategorize()}
            />
            <Button
              primary
              label="Save and Exit"
              onClick={() => saveCategorization()}
            />
          </div>
        )}
      </div>
      {showCategorizedSuccessfully && (
        <CategorizedSuccessfullyOverlay
          handleCloseOverlay={handleCloseCategorizedSuccessfully}
        />
      )}
    </div>
  );
};

export default Uncategorized;
