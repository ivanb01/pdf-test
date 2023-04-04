import SimpleBar from 'simplebar-react';
import Table from 'components/shared/table';
import StatusSelect from 'components/status-select';
import ContactTypeSelect from 'components/contact/contact-type-select';
import Image from 'next/image';
import Button from 'components/shared/button';
import CircleStepNumber from 'components/shared/circle-step-number';
import Text from 'components/shared/text';
import { types } from 'global/variables';
import { professionalsStatuses, clientStatuses } from 'global/variables';
import noContactsSelected from 'public/images/categorize-no-contacts-selected.svg';
import noContactsSelectedArrow from 'public/images/categorize-no-contacts-selected-arrow.svg';
import noCategorized from 'public/images/no-categorized.svg';
import { useState } from 'react';
import { bulkUpdateContacts } from 'api/contacts';

const CategorizePage = ({
  uncategorizedContacts,
  setUncategorizedContacts,
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
  const [categorizedInThisSession, setCategorizedInThisSession] = useState([]);

  const undoAllCategorizations = () => {
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
      setCategorizedInThisSession((prevState) => [
        ...updatedContacts,
        ...prevState,
      ]);
      afterCategorizationProcess(ids);
    });
    // console.log('update: ', ids, 'with status', status, 'with type: ', type);
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

  const showCategorizedSection = () => {
    return (
      categorizedInThisSession?.length > 0 || selectedUncategorized?.length > 0
    );
  };

  const selectFirstToCategorize = () => {
    setTimeout(() => {
      if (document.querySelector('.contact-row input:checked'))
        document.querySelector('.contact-row input:checked').click();
      if (document.querySelector('.contact-row input'))
        document.querySelector('.contact-row input').click();
    }, 1);
  };

  const toggleAllUncategorized = (event) => {
    console.log(event.target.checked);
    if (event.target.checked) {
      document
        .querySelectorAll("[id^='row_'] input:not(:checked)")
        .forEach((el) => el.click());
    } else {
      document
        .querySelectorAll("[id^='row_'] input:checked")
        .forEach((el) => el.click());
      setSelectedUncategorized([]);
    }
  };

  return (
    <>
      <div
        className={`border border-gray-200 overflow-hidden relative h-full w-[20%] pb-[72px]`}
      >
        <SimpleBar autoHide={true} style={{ maxHeight: '100%' }}>
          <Table
            tableFor="in-categorization"
            data={uncategorizedContacts.filter(
              (contact) => contact.category_id == openedSubtab + 1
            )}
            handleClickRow={handleSelectUncategorized}
            handleSelectAll={toggleAllUncategorized}
          />
        </SimpleBar>
      </div>
      <div
        className={`bg-white pb-[72px] border-t border-gray-200 relative ${
          showCategorizedSection ? 'w-[55%]' : 'w-[80%]'
        } `}
      >
        {selectedUncategorized?.length > 0 ? (
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
        ) : uncategorizedContacts?.length == 0 ? (
          <div className="flex flex-col items-center justify-center h-full mx-auto my-0">
            <lottie-player
              src="https://assets2.lottiefiles.com/packages/lf20_lnc7r5pw.json"
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
          className={`border border-gray-200 overflow-hidden relative h-full w-[25%] pb-[72px]`}
        >
          {categorizedInThisSession?.length > 0 ? (
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
              <Text h3 className="text-gray7 mt-4 mb-2 text-center">
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

export default CategorizePage;
