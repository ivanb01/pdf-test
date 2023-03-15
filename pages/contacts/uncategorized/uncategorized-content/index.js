import categorizeImage from 'public/images/categorize.gif';
import Text from 'components/shared/text';
import Button from 'components/shared/button';
import Search from 'components/shared/input/search';
import SimpleBar from 'simplebar-react';
import FilterList from '@mui/icons-material/FilterList';
import Add from '@mui/icons-material/Add';
import {
  statuses,
  clientStatuses,
  professionalsStatuses,
  types,
} from 'global/variables';
import Table from 'components/shared/table';
import CircleStepNumber from 'components/shared/circle-step-number';
import ContactTypeSelect from 'components/contact/contact-type-select';
import StatusSelect from 'components/status-select';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ArrowForward from '@mui/icons-material/ArrowForward';
import Close from '@mui/icons-material/Close';
import noContactsSelected from 'public/images/categorize-no-contacts-selected.svg';
import noContactsSelectedArrow from 'public/images/categorize-no-contacts-selected-arrow.svg';
import noCategorized from 'public/images/no-categorized.svg';
import categorizedAll from 'public/images/categorized-all.gif';
import { bulkUpdateContacts } from 'api/contacts';
import { useSelector } from 'react-redux';

const Uncategorized = ({
  uncategorizedContacts,
  setUncategorizedContacts,
  selectedUncategorized,
  setSelectedUncategorized,
  selectedUncategorizedContactType,
  setSelectedUncategorizedContactType,
  selectedUncategorizedContactStatus,
  setSelectedUncategorizedContactStatus,
  handleSelectUncategorized,
  categorizing,
  setCategorizing,
  handleStartCategorizing,
  onSearch,
}) => {
  //* DATA *//

  const openedSubtab = useSelector((state) => state.global.openedSubtab);
  const [categorizedInThisSession, setCategorizedInThisSession] = useState([]);
  const [uncategorizedInitialState, setUncategorizedInitialState] = useState({
    contacts: [],
  });
  const [uncategorizedCopy, setUncategorizedCopy] = useState();

  //* FUNCTIONS *//
  const updateTypeStatus = async (status, type) => {
    let ids = selectedUncategorized.map((contact) => contact.id);
    let contacts = { contacts: [] };
    let contactsArray = [];
    ids.map((element) => {
      let contact = { id: null, category_id: null };
      contact.id = element;
      contact.category_id = type;
      contact.status_id = status;
      contactsArray.push(contact);
    });
    contacts.contacts = contactsArray;
    bulkUpdateContacts(contacts).then((data) => {
      const updatedContacts = uncategorizedContacts
        .map((contact) => {
          if (ids.includes(contact.id)) {
            return {
              ...contact,
              category_id: type,
              status_id: status,
            };
          }
        })
        .filter((contact) => contact !== undefined);
      // setUncategorizedContacts(updatedContacts);
      console.log('updated contacts', updatedContacts);
      console.log('categorizedinthissession', categorizedInThisSession);
      setCategorizedInThisSession(updatedContacts);
      afterCategorizationProcess(ids);
    });
    // console.log('update: ', ids, 'with status', status, 'with type: ', type);
  };

  const handleSelectUncategorizedType = (type) => {
    setSelectedUncategorizedContactType(type);
    if (selectedUncategorizedContactStatus || type === 2 || type === 3) {
      updateTypeStatus(1, type);
    }
  };
  const handleSelectUncategorizedStatus = (status) => {
    setSelectedUncategorizedContactStatus(status);
    updateTypeStatus(status, selectedUncategorizedContactType);
  };

  const afterCategorizationProcess = (ids) => {
    console.log('categorized in this session: ', categorizedInThisSession);
    selectFirstToCategorize();
    setSelectedUncategorizedContactStatus(null);
    setSelectedUncategorizedContactType(null);
    setSelectedUncategorized([]);
    let uncategorized = uncategorizedContacts.filter(
      (contact) => !ids.includes(contact.id)
    );
    setUncategorizedContacts(uncategorized);
  };

  const undoAllCategorizations = () => {
    console.log(uncategorizedInitialState);
    bulkUpdateContacts(uncategorizedInitialState).then(() => {
      setUncategorizedContacts(uncategorizedCopy);
      setCategorizedInThisSession([]);
      selectFirstToCategorize();
    });
  };

  const undoCategorization = (contactToUndo) => {
    let contact = uncategorizedInitialState.contacts.find(
      (element) => element.id === contactToUndo
    );
    bulkUpdateContacts({ contacts: [contact] }).then(() => {
      setCategorizedInThisSession(
        categorizedInThisSession.filter((el) => el.id != contactToUndo)
      );
      let contactInitial = uncategorizedCopy.find(
        (element) => element.id === contactToUndo
      );
      setUncategorizedContacts((prevState) => [contactInitial, ...prevState]);
      selectFirstToCategorize();
    });
  };

  const selectFirstToCategorize = () => {
    setTimeout(() => {
      if (document.querySelector('.contact-row input:checked'))
        document.querySelector('.contact-row input:checked').click();
      if (document.querySelector('.contact-row input'))
        document.querySelector('.contact-row input').click();
    }, 1);
  };

  const selectToCategorize = (rowId) => {
    setTimeout(() => {
      if (document.querySelector('.contact-row input:checked'))
        document.querySelector('.contact-row input:checked').click();
      if (rowId) document.querySelector('#' + rowId + ' input').click();
    }, 1);
  };

  const showCategorizedSection = () => {
    return (
      categorizedInThisSession.length > 0 || selectedUncategorized.length > 0
    );
  };
  //* USE EFFECT *//
  useEffect(() => {
    let contactsArray = [];
    uncategorizedContacts.map((element) => {
      let contact = {};
      contact.id = element.id;
      contact.category_id = element.category_id;
      contact.status_id = element.status_id;
      contactsArray.push(contact);
    });
    uncategorizedInitialState.contacts = contactsArray;
    setUncategorizedCopy(uncategorizedContacts);

    // let ids = [163, 166, 167, 168];
    // let contacts = { contacts: [] };
    // let contactsArray = [];
    // ids.map((element) => {
    //   let contact = {};
    //   contact.id = element;
    //   contact.category_id = 1;
    //   contact.status_id = 1;
    //   contactsArray.push(contact);
    // });
    // contacts.contacts = contactsArray;
    // // console.log(contacts);
    // bulkUpdateContacts(contacts).then((data) => {
    //   console.log(data);
    // });
  }, []);
  const uncategorizedMainPage = () => {
    return (
      <>
        {uncategorizedContacts.length ? (
          <>
            <div
              className={`border border-gray-200 overflow-hidden relative h-full w-3/5`}
            >
              <SimpleBar autoHide={true} style={{ maxHeight: '100%' }}>
                <Table
                  tableFor="uncategorized"
                  data={uncategorizedContacts}
                  handleClickRow={(event) => {
                    handleStartCategorizing(true);
                    selectToCategorize(event.closest('tr').id);
                  }}
                />
              </SimpleBar>
            </div>
            <div className="flex flex-col items-center justify-center w-2/5 border-t border-gray-200 bg-lightBlue1 px">
              <Image src={categorizeImage} alt="" height={300} width={300} />
              <Text h3 className="mt-7 mb-3 text-center">
                Start categorizing to improve communication
              </Text>
              <Text p className="mb-14 text-[#4CA6CD] text-center">
                “Categorized contacts are result of a healthy communication”
              </Text>
              <Text p className="mb-6 italic text-center">
                Why wait? Start categorization
              </Text>
              <Button
                className="bg-purple6"
                size="small"
                rightIcon={<ArrowForward className=" h-[18px] w-[18px]" />}
                onClick={() => handleStartCategorizing(true)}
              >
                Let's go
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full max-w-[290px] mx-auto my-0">
            <Image src={categorizedAll}></Image>
            <Text h3 className="text-gray7 my-4 text-center">
              Yay, well done! No uncategorized contact.
            </Text>
            <Text p className="text-gray4 relative text-center">
              You did a great job, seems you’re taking that seriously.
            </Text>
          </div>
        )}
      </>
    );
  };

  const categorizePage = () => {
    return (
      <>
        <div
          className={`border border-gray-200 overflow-hidden relative h-full w-3/12 pb-[72px]`}
        >
          <SimpleBar autoHide={true} style={{ maxHeight: '100%' }}>
            {console.log('subtab', openedSubtab)}
            <Table
              tableFor="in-categorization"
              data={uncategorizedContacts.filter(
                (contact) => contact.category_id == openedSubtab + 1
              )}
              handleClickRow={handleSelectUncategorized}
            />
          </SimpleBar>
        </div>
        <div
          className={`bg-white pb-[72px] border-t border-gray-200 relative ${
            showCategorizedSection ? 'w-6/12' : 'w-9/12'
          } `}
        >
          {selectedUncategorized.length > 0 ? (
            <SimpleBar
              autoHide={true}
              className="overflow-x-hidden"
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                bottom: '72px',
                maxHeight: '100%',
              }}
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
                          setSelectedType={handleSelectUncategorizedType}
                          selectedType={selectedUncategorizedContactType}
                        />
                      </div>
                    );
                  })}
                </div>
                {selectedUncategorizedContactType != null &&
                  selectedUncategorizedContactType != 2 &&
                  selectedUncategorizedContactType != 3 && (
                    <>
                      <div className="flex items-center mb-4">
                        <CircleStepNumber number={2} className="mr-2" />
                        <Text h3>In what stage of communication?</Text>
                      </div>
                      <StatusSelect
                        className="pl-9"
                        selectedStatus={selectedUncategorizedContactStatus}
                        setSelectedStatus={handleSelectUncategorizedStatus}
                        statuses={
                          [8, 9, 12].includes(selectedUncategorizedContactType)
                            ? professionalsStatuses
                            : clientStatuses
                        }
                      />
                    </>
                  )}
              </div>
            </SimpleBar>
          ) : uncategorizedContacts.length == 0 ? (
            <div className="flex flex-col items-center justify-center h-full max-w-[290px] mx-auto my-0">
              <Image src={categorizedAll}></Image>
              <Text h3 className="text-gray7 my-4 text-center">
                Yay, well done! No uncategorized contact.
              </Text>
              <Text p className="text-gray4 relative text-center">
                You did a great job, seems you’re taking that seriously.
              </Text>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full max-w-[290px] mx-auto my-0">
              <Image src={noContactsSelected}></Image>
              <Text h3 className="text-gray7 my-4 text-center">
                You haven’t selected any contact from left side panel yet
              </Text>
              <Text p className="text-gray4 relative text-center">
                <div className="absolute -left-40 bottom-1">
                  <Image src={noContactsSelectedArrow}></Image>
                </div>
                <strong>Select a contact</strong> to start the categorization
              </Text>
            </div>
          )}
        </div>

        {showCategorizedSection && (
          <div
            className={`border border-gray-200 overflow-hidden relative h-full w-3/12 pb-[72px]`}
          >
            {categorizedInThisSession.length > 0 ? (
              <SimpleBar autoHide={true} style={{ maxHeight: '100%' }}>
                <Table
                  tableFor="categorized"
                  data={categorizedInThisSession}
                  undoAllCategorizations={undoAllCategorizations}
                  undoCategorization={undoCategorization}
                />
              </SimpleBar>
            ) : (
              <div className="flex flex-col items-center justify-center h-full max-w-[290px] mx-auto my-0">
                <Image src={noCategorized}></Image>
                <Text h3 className="text-gray7 my-4 text-center">
                  You haven’t categorized any contact in this session yet
                </Text>
                <Text p className="text-gray4 relative text-center">
                  To categorize please specify type and status.
                </Text>
              </div>
            )}
          </div>
        )}
        <div
          style={{ zIndex: '99999 !important' }}
          className="bg-white absolute bottom-0 left-0 right-0 px-6 py-4 fixed-categorize-menu rounded-b-lg flex items-center justify-end"
        >
          <Button
            white
            label="Exit from categorization view"
            className="mr-4"
            onClick={() => handleStartCategorizing(false)}
          />
        </div>
      </>
    );
  };

  return (
    <>
      <div className="absolute left-0 top-0 right-0 bottom-0 flex flex-col">
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center justify-between w-full">
            {categorizing ? (
              <>
                <div className="flex items-center">
                  <Text h3 className="text-gray7">
                    Uncategorized Contacts
                  </Text>
                  <Search
                    placeholder="Search"
                    className="ml-4 text-sm"
                    onInput={(event) => onSearch(event.target.value)}
                  />
                </div>
                <div>
                  <Close
                    className="text-gray3 cursor-pointer"
                    onClick={() => handleStartCategorizing(false)}
                  />
                </div>
              </>
            ) : (
              <>
                <Text h3 className="text-gray7 text-xl">
                  {openedSubtab == 0
                    ? 'New Records'
                    : openedSubtab == 1
                    ? 'Unkown'
                    : 'Trash'}
                </Text>
                {uncategorizedContacts.length > 0 && (
                  <div className="flex items-center justify-self-end">
                    <Search
                      placeholder="Search"
                      className="mr-4 text-sm"
                      onInput={(event) => onSearch(event.target.value)}
                    />
                    {/* <Button
                    secondary
                    leftIcon={<FilterList className="w-4 h-4" />}
                    label="Filter"
                    className="mr-4"
                    onClick={() => setOpen(true)}
                  /> */}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <div
          className="w-auto relative flex"
          style={{ height: 'calc(100vh - 160px)' }}
        >
          {categorizing ? categorizePage() : uncategorizedMainPage()}
        </div>
      </div>
      {/* <SlideOver
        open={open}
        setOpen={setOpen}
        title="Uncategorized Filters"
        className="top-[70px]"
        buttons={
          <>
            <Button white label="Clear Filters" />
            <Button primary label="See Results" />
          </>
        }
      >
        <p>Types</p>
        <p>Status</p>
        <p>Communication</p>
        <p>Campaign</p>
        <p>Tags</p>
      </SlideOver> */}
    </>
  );
};

export default Uncategorized;
