import categorizeImage from 'public/images/categorize.gif';
import Text from 'components/shared/text';
import Button from 'components/shared/button';
import Search from 'components/shared/input/search';
import SimpleBar from 'simplebar-react';
import {
  statuses,
  clientStatuses,
  professionalsStatuses,
  types,
} from 'global/variables';
import Table from 'components/shared/table';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ArrowForward from '@mui/icons-material/ArrowForward';
import Close from '@mui/icons-material/Close';
import { bulkUpdateContacts } from 'api/contacts';
import { useSelector } from 'react-redux';
import CategorizePage from './categorize-page';

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
  const [uncategorizedInitialState, setUncategorizedInitialState] = useState({
    contacts: [],
  });
  const [uncategorizedCopy, setUncategorizedCopy] = useState();

  //* FUNCTIONS *//

  const selectToCategorize = (rowId) => {
    setTimeout(() => {
      if (document.querySelector('.contact-row input:checked'))
        document.querySelector('.contact-row input:checked').click();
      if (rowId) document.querySelector('#' + rowId + ' input').click();
    }, 1);
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
  const selectAll = (event) => {
    console.log('test');
  };
  const uncategorizedMainPage = () => {
    return (
      <>
        {uncategorizedContacts?.length ? (
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
                rightIcon={<ArrowForward className=" h-[18px] w-[18px]" />}
                onClick={() => handleStartCategorizing(true)}
              >
                Let's go
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full mx-auto my-0">
            <lottie-player
              src="https://assets2.lottiefiles.com/packages/lf20_lnc7r5pw.json"
              loop
              autoplay
              style={{ width: '420px', height: '300px' }}
            ></lottie-player>
            <Text h3 className="text-gray7 mt-4 mb-2 text-center">
              {openedSubtab == 0
                ? 'Yay, well done! No uncategorized new records.'
                : 'Yay, well done! No uncategorized unknown contacts.'}
            </Text>
            <Text p className="text-gray4 relative text-center">
              You did a great job, seems you’re taking that seriously.
            </Text>
          </div>
        )}
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
                <div className="flex items-center justify-between w-full">
                  <Text h3 className="text-gray7">
                    Uncategorized Contacts
                  </Text>
                  <Search
                    placeholder="Search"
                    className="mr-5 ml-4 text-sm"
                    onInput={(event) => {
                      setSelectedUncategorized([]);

                      onSearch(event.target.value);
                    }}
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
                  {openedSubtab == 0 ? 'New Records' : 'Unkown'}
                </Text>
                {uncategorizedContacts?.length > 0 && (
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
          {categorizing ? (
            <CategorizePage
              uncategorizedContacts={uncategorizedContacts}
              setUncategorizedContacts={setUncategorizedContacts}
              selectedUncategorized={selectedUncategorized}
              setSelectedUncategorized={setSelectedUncategorized}
              handleSelectUncategorized={handleSelectUncategorized}
              selectedUncategorizedContactType={
                selectedUncategorizedContactType
              }
              setSelectedUncategorizedContactType={
                setSelectedUncategorizedContactType
              }
              selectedUncategorizedContactStatus={
                selectedUncategorizedContactStatus
              }
              setSelectedUncategorizedContactStatus={
                setSelectedUncategorizedContactStatus
              }
              uncategorizedInitialState={uncategorizedInitialState}
              uncategorizedCopy={uncategorizedCopy}
              openedSubtab={openedSubtab}
              handleStartCategorizing={handleStartCategorizing}
            />
          ) : (
            uncategorizedMainPage()
          )}
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
