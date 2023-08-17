import React, { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { SearchIcon } from '@heroicons/react/outline';
import { useSelector } from 'react-redux';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import { useRouter } from 'next/router';
import SimpleBar from 'simplebar-react';
import { getInitials } from '@global/functions';

const GlobalSearch = ({ open, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const contactsData = useSelector((state) => state.contacts.allContacts.data);
  const router = useRouter();
  const uniqueCategories = [...new Set(contactsData.map((item) => item.category_1))];
  const cancelButtonRef = useRef(null);

  const renderSearchResults = () => {
    return uniqueCategories.map((category) => {
      const filteredItems = searchItems(category);
      if (filteredItems.length > 0) {
        return (
          <div key={category}>
            <h2 className="text-xs leading-5 font-medium py-2.5 px-[13px] bg-gray-50">{category.toUpperCase()}</h2>
            <ul className="bg-white z-10">
              {filteredItems.map((item) => (
                <li
                  key={item.id}
                  role="button"
                  onClick={() =>
                    router.push({
                      pathname: '/contacts/details',
                      query: { id: item?.id },
                    })
                  }
                  className="py-2 px-3 flex gap-3 justify-between items-center hover:bg-lightBlue1 cursor-pointer"
                >
                  {item.profile_image_path ? (
                    <img
                      className="inline-block h-6 w-6 rounded-full"
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
                    <h1 className="text-xs font-medium text-gray-800 font-sf-pro-text uppercase leading-4">
                      {item.category_2}
                    </h1>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        );
      }

      return null;
    });
  };

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
  const renderNoResultsMessage = () => {
    const noResults = uniqueCategories.every((category) => {
      const filteredItems = searchItems(category);
      return filteredItems.length === 0;
    });

    if (searchTerm.length > 0 && noResults) {
      return (
        <div className="p-3 bg-white text-center h-[200px] flex flex-col items-center justify-center rounded-lg">
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
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative" initialFocus={cancelButtonRef} onClose={onClose} style={{ zIndex: '9999' }}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity backdrop-blur-2.5px" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto" style={{ marginTop: '139px' }}>
          <div className="flex justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4"
              enterTo="opacity-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-4"
            >
              <Dialog.Panel
                className="relative transform overflow-hidden rounded-lg text-left transition-all"
                style={{ width: '500px' }}
              >
                <div
                  className="rounded-lg items-center px-[12px] py-[9px] flex gap-2.5 border border-gray-300 bg-white shadow-md"
                  style={{ height: '50px' }}
                >
                  <SearchIcon className="h-5 w-5 text-gray3 cursor-pointer" />
                  <input
                    onChange={(e) => setSearchTerm(e.target.value)}
                    type="text"
                    value={searchTerm}
                    style={{ all: 'unset' }}
                    placeholder="Search for a Contact..."
                    className="flex-1 placeholder:text-sm placeholder:leading-5 placeholder:font-normal placeholder:text-gray-500 text-sm leading-5 font-normal text-gray-900"
                  />
                  {searchTerm && searchTerm.length > 0 && (
                    <CancelSharpIcon
                      onClick={() => setSearchTerm('')}
                      className="h-5 w-5 text-gray-400 cursor-pointer"
                    />
                  )}
                </div>
                {searchTerm.length > 0 && (
                  // <div
                  //   className="rounded-lg bg-white overflow-y-auto overflow-x-hidden"
                  //   style={{ marginTop: '5px', maxHeight: '276px' }}>
                  <SimpleBar
                    className="rounded-lg bg-white overflow-y-auto overflow-x-hidden"
                    style={{ marginTop: '5px', maxHeight: '276px' }}
                  >
                    {renderSearchResults()}
                  </SimpleBar>
                  // </div>
                )}
                {searchTerm.length > 0 && renderNoResultsMessage()}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default GlobalSearch;
