import { classNames } from '@global/functions';
import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';

const SidebarMenu = ({ navigation, setCurrentNavigation }) => {
  const router = useRouter();
  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-gray-200 bg-white p-6 border-r min-w-[350px]">
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  {!item.children ? (
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        router.push(item.href);
                        setCurrentNavigation(item.href);
                      }}
                      className={classNames(
                        item.current ? 'bg-lightBlue1 text-lightBlue3' : 'hover:bg-gray-50',
                        'cursor-pointer group flex gap-x-3 rounded-md p-2 text-sm leading-6 text-gray5',
                      )}>
                      {item.icon}
                      {item.name}
                    </div>
                  ) : (
                    <Disclosure as="div">
                      {({ open = true }) => (
                        <>
                          <Disclosure.Button
                            className={classNames(
                              item.current ? 'bg-lightBlue1 text-lightBlue3' : 'hover:bg-gray-50',
                              'flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 text-gray5',
                            )}>
                            {item.icon}
                            {item.name}
                            <ChevronRightIcon
                              className={classNames(
                                open ? 'rotate-90 text-gray-500' : 'text-gray-400',
                                'ml-auto h-5 w-5 shrink-0',
                              )}
                              aria-hidden="true"
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel as="ul" className="mt-1 px-2">
                            {item.children.map((subItem) => (
                              <li key={subItem.name}>
                                {/* 44px */}
                                <Disclosure.Button
                                  as="a"
                                  href={subItem.href}
                                  onClick={(e) => {
                                    console.log(subItem);
                                    e.preventDefault();
                                    router.push(subItem.href);
                                    setCurrentNavigation(subItem.href);
                                  }}
                                  className={classNames(
                                    subItem.current ? 'bg-lightBlue1 text-lightBlue3' : 'hover:bg-gray-50',
                                    'block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray5',
                                  )}>
                                  {subItem.name}
                                </Disclosure.Button>
                              </li>
                            ))}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  )}
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SidebarMenu;
