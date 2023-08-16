import React, { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { SearchIcon } from '@heroicons/react/outline';
// import { useSelector } from 'react-redux';
const GlobalSearch = ({ open, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  // const contactsData = useSelector(state => state.contacts.allContacts.data);


  const cancelButtonRef = useRef(null);
  return (<Transition.Root show={open} as={Fragment}>
    <Dialog as='div' className='relative z-10' initialFocus={cancelButtonRef} onClose={onClose}>
      <Transition.Child
        as={Fragment}
        enter='ease-out duration-300'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='ease-in duration-200'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
      </Transition.Child>
      <div className='fixed inset-0 z-10 overflow-y-auto' style={{ marginTop: '139px' }}>
        <div className='flex justify-center text-center'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4'
            enterTo='opacity-100 translate-y-0'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 translate-y-4'
          >
            <Dialog.Panel
              className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all'
              style={{ width: '500px' }}
            >
              <div className='rounded-lg items-center bg-white px-[12px] py-[9px] flex gap-2.5'>
                <SearchIcon
                  className='h-[18px] w-[18px] text-gray3 box-content p-2 rounded-full hover:bg-menuHover' />
                <input onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
                       type={'text'}
                       value={searchTerm}
                       style={{ all: 'unset', flex: 1 }}
                       placeholder={'Search for a Contact...'} />
                {searchTerm && searchTerm.length > 0 &&
                  <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'
                       onClick={() => {
                         setSearchTerm('');
                       }}>
                    <g clipPath='url(#clip0_6398_120813)'>
                      <path
                        d='M10.0001 1.66663C5.39175 1.66663 1.66675 5.39163 1.66675 9.99996C1.66675 14.6083 5.39175 18.3333 10.0001 18.3333C14.6084 18.3333 18.3334 14.6083 18.3334 9.99996C18.3334 5.39163 14.6084 1.66663 10.0001 1.66663ZM14.1667 12.9916L12.9917 14.1666L10.0001 11.175L7.00841 14.1666L5.83342 12.9916L8.82508 9.99996L5.83342 7.00829L7.00841 5.83329L10.0001 8.82496L12.9917 5.83329L14.1667 7.00829L11.1751 9.99996L14.1667 12.9916Z'
                        fill='#9CA3AF' />
                    </g>
                    <defs>
                      <clipPath id='clip0_6398_120813'>
                        <rect width='20' height='20' fill='white' />
                      </clipPath>
                    </defs>
                  </svg>}
              </div>

            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition.Root>)
    ;
};

export default GlobalSearch;
