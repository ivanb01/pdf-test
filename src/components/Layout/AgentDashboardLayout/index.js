import { useSelector } from 'react-redux';
import Button from '@components/shared/button';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Search from '@components/shared/input/search';
import SimpleBar from 'simplebar-react';
import { getInitials } from '@global/functions';
import SuccessContactsContainers from '@components/AgentDashboardComponents/SuccessContactsContainers';
import NeedHelpContainer from '@components/AgentDashboardComponents/NeedHelpContainer';
import ContactsContainers from '@components/AgentDashboardComponents/ContactsContainer';

const AgentDashboardLayout = ({ success, needToContactCount, needToReview }) => {
  const userInfo = useSelector((state) => state.global.userInfo);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const contactsData = useSelector((state) => state.contacts.allContacts.data);

  const uniqueCategories = [...new Set(contactsData?.map((item) => item.category_1))];
  const renderSearchResults = () => {
    const searchItems = (category) => {
      return contactsData.filter(
        (d) =>
          searchTerm.split(' ').every((word) => {
            const lowercaseWord = word.toLowerCase();
            return (
              d.email.toLowerCase().includes(lowercaseWord) ||
              d.first_name.toLowerCase().includes(lowercaseWord) ||
              d.last_name.toLowerCase().includes(lowercaseWord)
            );
          }) && d.category_1 === category,
      );
    };
    const noResults = uniqueCategories.every((category) => {
      const filteredItems = searchItems(category);
      return filteredItems.length === 0;
    });

    if (searchTerm.length > 0 && noResults) {
      return (
        <div className="min-w-[300px] md:min-w-[600px]  z-[9999]  p-3 bg-white text-center h-[200px] flex flex-col items-center justify-center rounded-lg">
          <h6 className="text-sm leading-5 font-medium text-gray-900 mb-[11px]">No results found</h6>
          <p className="text-sm leading-5 font-normal text-gray-600">
            We can’t find anything with that term at the moment,
            <br />
            try searching something else.
          </p>
        </div>
      );
    }
    return uniqueCategories.map((category) => {
      const filteredItems = searchItems(category);
      if (filteredItems.length > 0) {
        return (
          <>
            <h2 className="text-xs leading-5 font-medium py-2.5 px-[13px] bg-gray-50">{category.toUpperCase()}</h2>
            <ul className="bg-white z-10">
              {filteredItems.map((item) => (
                <li
                  key={item.id}
                  role="button"
                  onClick={() => {
                    router.push({
                      pathname: '/contacts/details',
                      query: { id: item?.id },
                    });
                  }}
                  className="py-2 px-3 flex gap-3 justify-between items-center hover:bg-lightBlue1 cursor-pointer">
                  {item.profile_image_path ? (
                    <img
                      className="inline-block h-7 w-7 rounded-full"
                      src={item.profile_image_path}
                      alt={item.first_name}
                    />
                  ) : (
                    <span className="inline-flex h-6 w-6  items-center justify-center rounded-full bg-gray-400">
                      <span className="text-sm font-medium leading-none text-white">
                        {getInitials(item.first_name + ' ' + item.last_name).toUpperCase()}
                      </span>
                    </span>
                  )}
                  <div className="flex-1">
                    <h5 className="text-sm leading-5 font-normal">
                      {item.first_name} {item.last_name}
                    </h5>
                    <h6 className="text-xs leading-4 font-normal text-gray-500">{item.email}</h6>
                  </div>
                  <div className="px-1.5 py-1 rounded bg-gray-100">
                    <h1 className="font-medium text-gray-800 uppercase leading-4 text-[10px]">{item.category_2}</h1>
                  </div>
                </li>
              ))}
            </ul>
          </>
        );
      }

      return null;
    });
  };
  const renderNoResultsMessage = () => {
    const searchItems = (category) => {
      return contactsData.filter(
        (d) =>
          searchTerm.split(' ').every((word) => {
            const lowercaseWord = word.toLowerCase();
            return (
              d.email.toLowerCase().includes(lowercaseWord) ||
              d.first_name.toLowerCase().includes(lowercaseWord) ||
              d.last_name.toLowerCase().includes(lowercaseWord)
            );
          }) && d.category_1 === category,
      );
    };
    const noResults = uniqueCategories.every((category) => {
      const filteredItems = searchItems(category);
      return filteredItems.length === 0;
    });

    if (searchTerm.length > 0 && noResults) {
      return (
        <div className="min-w-[300px] md:min-w-[600px] border border-gray2 mt-[5px] z-[9999] absolute p-3 bg-white text-center h-[200px] flex flex-col items-center justify-center rounded-lg">
          <h6 className="text-sm leading-5 font-medium text-gray-900 mb-[11px]">No results found</h6>
          <p className="text-sm leading-5 font-normal text-gray-600">
            We can’t find anything with that term at the moment,
            <br />
            try searching something else.
          </p>
        </div>
      );
    }
    return null;
  };
  return (
    <div className={'flex flex-col flex-1'}>
      <div
        className={'bg-marketing-header-gradient flex items-center justify-center flex-col gap-7 pb-14 pt-14'}
        style={{ height: '270px' }}>
        <div className={'flex max-w-[570px] flex-col justify-center items-center gap-5'}>
          <h3 className={'text-4xl leading-9 font-semibold text-white'}>Welcome {userInfo?.first_name ?? ''}!</h3>
          <p className={'text-[12px] text-center font-medium mt-4 text-white px-3'}>
            We’re here to help you close more deals, stay on top of your client relationships & make sure you love where
            you work! Any feedback on how we can improve is encouraged and welcome!
          </p>
        </div>
        <div className={'relative'}>
          <Search
            disabled={!contactsData}
            placeholder="Search for a contact..."
            className="text-sm min-w-[300px] md:min-w-[600px]"
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          {searchTerm.length > 0 && (
            <div
              className="absolute rounded-lg bg-white overflow-y-auto overflow-x-hidden min-w-[300px] md:min-w-[600px] z-50 border border-gray2"
              style={{ marginTop: '5px', maxHeight: '276px' }}>
              {renderSearchResults()}
            </div>
          )}
          {/*{searchTerm.length > 0 && renderNoResultsMessage()}*/}
        </div>
      </div>
      <div className={'flex gap-3 mx-9 mt-5'}>
        <Button
          className={'h-[45px]'}
          leftIcon={<ThumbUpOffAltIcon className={'-mt-1 -ml-1'} />}
          primary
          label={'Submit a deal'}
          onClick={() => router.push('/deals')}
        />
        <Button
          className={'h-[45px]'}
          onClick={() => window.open('https://dashboard.robinpowered.com/5west37/login')}
          leftIcon={<AddIcon className={'-mt-1'} />}
          white
          label={'Book a conference room '}
        />
      </div>
      <div className={'bg-[#F1F6F8] my-7 h-full mx-4 rounded-[22px] flex flex-col flex-1 gap-8 py-8  flex-wrap'}>
        <div className={'flex mx-4 md:mx-6 lg:mx-[22px] gap-4 md:gap-6 lg:gap-[22px] flex-wrap'}>
          <NeedHelpContainer />
          {success && needToReview == 0 ? (
            <SuccessContactsContainers needToReview={needToReview} needToContactCount={needToContactCount} />
          ) : (
            <ContactsContainers needToReview={needToReview} needToContactCount={needToContactCount} />
          )}
          {success && needToContactCount == 0 ? (
            <SuccessContactsContainers
              needToCommunicateBox
              needToReview={needToReview}
              needToContactCount={needToContactCount}
            />
          ) : (
            <ContactsContainers
              needToCommunicateBox
              needToReview={needToReview}
              needToContactCount={needToContactCount}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentDashboardLayout;
