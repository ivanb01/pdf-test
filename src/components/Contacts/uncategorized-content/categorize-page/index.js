import SimpleBar from 'simplebar-react';
import Table from 'components/shared/table';
import StatusSelect from 'components/status-select';
import ContactTypeSelect from 'components/contact/contact-type-select';
import Image from 'next/image';
import CircleStepNumber from 'components/shared/circle-step-number';
import Text from 'components/shared/text';
import { types } from 'global/variables';
import { professionalsStatuses, clientStatuses } from 'global/variables';
import noContactsSelected from '/public/images/categorize-no-contacts-selected.svg';
import noContactsSelectedArrow from '/public/images/categorize-no-contacts-selected-arrow.svg';
import noCategorized from '/public/images/no-categorized.svg';
import { useEffect, useState } from 'react';
import { bulkUpdateContacts } from 'api/contacts';
import { useDispatch, useSelector } from 'react-redux';
import { setRefetchData } from '@store/global/slice';
import { updateAllContacts, updateContactLocally, updateContacts } from '@store/contacts/slice';
import DropdownWithSearch from '@components/dropdownWithSearch';
import UncategorizedTable from '@components/shared/table/UncategorizedTable';
import CategorizedTable from '@components/shared/table/CategorizedTable';

const CategorizePage = ({
  uncategorizedContacts,
  setUncategorizedContacts,
  setUncategorizedCopy,
  selectedUncategorized,
  setSelectedUncategorized,
  handleSelectUncategorized,
  selectedUncategorizedContactType,
  setSelectedUncategorizedContactType,
  selectedUncategorizedContactStatus,
  setSelectedUncategorizedContactStatus,
  uncategorizedInitialState,
  uncategorizedCopy,
  openedSubtab,
  handleStartCategorizing,
}) => {
  const dispatch = useDispatch();
  const vendorSubtypes = useSelector((state) => state.global.vendorSubtypes);
  const [vendorSubtypesFormatted, setVendorSubtypesFormatted] = useState();
  useEffect(() => {
    setVendorSubtypesFormatted(
      vendorSubtypes?.map((item) => ({
        value: item.id,
        label: item.name,
      })),
    );
  }, [vendorSubtypes]);
  const [categorizedInThisSession, setCategorizedInThisSession] = useState([]);
  const [categorizationInProcess, setCategorizationInProcess] = useState(false);
  const allContacts = useSelector((state) => state.contacts.allContacts.data);

  const undoAllCategorizations = () => {
    dispatch(updateContacts(uncategorizedInitialState.contacts));
    setUncategorizedContacts(uncategorizedCopy);
    setCategorizedInThisSession([]);
    // selectFirstToCategorize();
    dispatch(setRefetchData(true));
    bulkUpdateContacts(uncategorizedInitialState);
  };

  const undoCategorization = (contactToUndo) => {
    let contact = uncategorizedInitialState.contacts.find((element) => element.id === contactToUndo);
    setCategorizedInThisSession(categorizedInThisSession.filter((el) => el.id != contactToUndo));
    dispatch(updateContactLocally(contact));
    let contactInitial = uncategorizedCopy.find((element) => element.id === contactToUndo);
    setUncategorizedContacts((prevState) => [contactInitial, ...prevState]);
    // selectFirstToCategorize();
    dispatch(setRefetchData(true));
    bulkUpdateContacts({ contacts: [contact] });
  };

  const handleSelectUncategorizedType = (type) => {
    let vendorSubtypesArray = vendorSubtypes?.map((subtype) => subtype.id);
    setSelectedUncategorizedContactType(type);
    console.log(vendorSubtypesArray, type);
    if (
      selectedUncategorizedContactStatus ||
      vendorSubtypesArray?.includes(type) ||
      [2, 3, 9, 12, 13, 14].includes(type)
    ) {
      updateTypeStatus(1, type);
    }
  };
  const handleSelectUncategorizedStatus = (status) => {
    setSelectedUncategorizedContactStatus(status);
    updateTypeStatus(status, selectedUncategorizedContactType);
  };
  const updateTypeStatus = async (status, type) => {
    setCategorizationInProcess(true);
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
    setCategorizedInThisSession((prevState) => [...updatedContacts, ...prevState]);
    afterCategorizationProcess(ids);
    contactsArray.forEach((contact) => {
      dispatch(updateContactLocally(contact));
    });
    // dispatch(updateContacts(contactsArray));
    bulkUpdateContacts(contacts);
    // console.log('update: ', ids, 'with status', status, 'with type: ', type);
  };
  const afterCategorizationProcess = (ids) => {
    let uncategorized = uncategorizedContacts.filter((contact) => !ids.includes(contact.id));
    setUncategorizedContacts(uncategorized);
    dispatch(updateAllContacts(allContacts.filter((contact) => !ids.includes(contact.id))));
    // selectFirstToCategorize();
    setSelectedUncategorizedContactStatus(null);
    setSelectedUncategorizedContactType(null);
    setSelectedUncategorized([]);
    setCategorizationInProcess(false);
  };

  const showCategorizedSection = () => {
    return categorizedInThisSession?.length > 0 || selectedUncategorized?.length > 0;
  };

  const selectFirstToCategorize = () => {
    setTimeout(() => {
      if (document.querySelector('.contact-row input:checked'))
        document.querySelector('.contact-row input:checked').click();
      if (document.querySelector('.contact-row input')) document.querySelector('.contact-row input').click();
    }, 650);
  };

  const toggleAllUncategorized = (event) => {
    console.log(event.target.checked);
    if (event?.target.checked) {
      document.querySelectorAll("[id^='row_'] input:not(:checked)").forEach((el) => el.click());
    } else {
      document.querySelectorAll("[id^='row_'] input:checked").forEach((el) => el.click());
      setSelectedUncategorized([]);
    }
  };

  return (
    <>
      {uncategorizedContacts.length > 0 && (
        <div
          className={`border border-gray-200 overflow-hidden overflow-x-clip relative h-full sm:w-[250%] md:w-[350px]  xl:w-[27%]`}
        >
          {/*<SimpleBar autoHide style={{ maxHeight: 'calc(100vh - 143px)', overflowX: 'hidden' }}>*/}
          <UncategorizedTable
            tableFor="in-categorization"
            data={uncategorizedContacts}
            handleClickRow={handleSelectUncategorized}
            handleSelectAll={toggleAllUncategorized}
          />
          {/*</SimpleBar>*/}
        </div>
      )}
      <div
        className={`bg-white border-t border-gray-200 relative ${
          uncategorizedContacts.length
            ? 'sm:w-[100%] md:w-[60%] xl:w-[55%] xxl:w-[50%]'
            : uncategorizedContacts.length === 0 && categorizedInThisSession.length === 0
              ? 'w-[100%]'
              : 'w-[75%]'
        } `}
      >
        {categorizationInProcess || selectedUncategorized?.length > 0 ? (
          <SimpleBar
            autoHide
            className="overflow-x-hidden"
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              bottom: '0',
              maxHeight: '100%',
              height: '100%',
            }}
          >
            <div className="p-6 pb-[77px]">
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
              {!categorizationInProcess &&
                selectedUncategorizedContactType != null &&
                ![2, 3, 9, 12, 13, 14].includes(selectedUncategorizedContactType) && (
                  <>
                    <div className="flex items-center mb-4">
                      <CircleStepNumber number={2} className="mr-2" />
                      <Text h3>
                        {selectedUncategorizedContactType == 8
                          ? 'What kind of vendor is this?'
                          : 'In what stage of communication?'}
                      </Text>
                    </div>
                    {selectedUncategorizedContactType !== 8 ? (
                      <>
                        <StatusSelect
                          className="pl-9"
                          selectedStatus={selectedUncategorizedContactStatus}
                          setSelectedStatus={handleSelectUncategorizedStatus}
                          statuses={
                            [9, 12].includes(selectedUncategorizedContactType) ? professionalsStatuses : clientStatuses
                          }
                        />
                      </>
                    ) : (
                      // <div className="flex flex-wrap">
                      //   {vendorSubtypes.map((type) => (
                      //     <Chip
                      //       selectedStatus={type.id == selectedUncategorizedContactType}
                      //       key={type.id}
                      //       label={type.name}
                      //       className="mr-3 mb-3"
                      //       onClick={() => handleSelectUncategorizedType(type.id)}
                      //     />
                      //   ))}
                      // </div>
                      <div className={`mb-[-120px]`}>
                        <DropdownWithSearch
                          options={vendorSubtypesFormatted}
                          position={'initial'}
                          placeholder="Start typing to search or select one of the options"
                          label="What kind of vendor is this for you?"
                          onChange={(type) => {
                            console.log(type);
                            handleSelectUncategorizedType(type.value);
                          }}
                          // onChange={(type) => {
                          //   formikStep2.setFieldValue('selectedContactSubtype', type.value);
                          // }}
                          maxMenuHeight={230}
                        />
                      </div>
                    )}
                  </>
                )}
            </div>
          </SimpleBar>
        ) : uncategorizedContacts?.length == 0 ? (
          <div className="flex flex-col items-center justify-center h-full mx-auto my-12">
            <lottie-player
              src="/animations/categorize.json"
              style={{ width: '420px', height: '300px' }}
              loop
              autoplay
            ></lottie-player>
            <Text h3 className="text-gray7 mt-4 mb-2 text-center">
              Yay, well done! No uncategorized contact.
            </Text>
            <Text p className="text-gray4 relative text-center">
              You did a great job, seems you’re taking that seriously.
            </Text>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full max-w-[290px] mx-auto my-0">
            <Image src={noContactsSelected} />
            <Text h3 className="text-gray7 my-4 text-center text-[15px]">
              You haven’t selected any contact from left side panel yet
            </Text>
            <Text p className="text-gray4 relative text-center">
              <div className="absolute left-[-110px] bottom-1 w-24">
                <Image src={noContactsSelectedArrow}></Image>
              </div>
              <span className={''}>
                <strong>Select a contact</strong> to start the categorization
              </span>
            </Text>
          </div>
        )}
      </div>

      {categorizedInThisSession?.length > 0 ? (
        <div className={`border border-gray-200 overflow-hidden relative h-full sm:w-[250%] md:w-[270px] xl:w-[25%]`}>
          {/*<SimpleBar autoHide style={{ maxHeight: '100%' }}>*/}
          <CategorizedTable
            tableFor="categorized"
            data={categorizedInThisSession}
            undoAllCategorizations={undoAllCategorizations}
            undoCategorization={undoCategorization}
          />
          {/*</SimpleBar>*/}
        </div>
      ) : null}

      {categorizedInThisSession.length === 0 && uncategorizedContacts.length > 0 && (
        <div className={`border border-gray-200 overflow-hidden relative h-full sm:w-[250%] md:w-[270px] xl:w-[25%]`}>
          <div className="flex flex-col items-center justify-center h-full max-w-[290px] mx-auto my-0 p-3">
            <Image src={noCategorized} />
            <Text h3 className="text-gray7 mt-4 mb-2 text-center text-[15px]">
              You haven’t categorized any contact in this session yet
            </Text>
            <Text p className="text-gray4 relative text-center text-sm">
              To categorize, please specify type and {selectedUncategorizedContactType == 8 ? 'subtype' : 'status'}.
            </Text>
          </div>
        </div>
      )}
      {/* {(categorizedInThisSession.length > 0 || uncategorizedContacts.length > 0) && (
        <div
          style={{ zIndex: '99999 !important' }}
          className="bg-white absolute bottom-0 left-0 right-0 px-6 py-4 fixed-categorize-menu  flex items-center justify-end">
          <Button
            primary
            label="Save"
            className="mr-4"
            onClick={() => {
              setSelectedUncategorized([]);
              setCategorizedInThisSession([]);
              if (uncategorizedContacts.length === 0) {
                setUncategorizedCopy([]);
              }
              // handleStartCategorizing(false);
            }}
          />
        </div>
      )} */}
    </>
  );
};

export default CategorizePage;
