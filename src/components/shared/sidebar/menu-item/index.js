import { Disclosure } from '@headlessui/react';
import { classNames } from 'global/functions';

export default function MenuItem({ item, open, ...props }) {
  return (
    <Disclosure.Button
      className={classNames(
        item.current ? 'bg-gray-100 text-gray-900' : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
        !item.children
          ? 'group w-full flex items-center pl-7 pr-2 py-2 text-sm font-medium rounded-md'
          : 'group w-full flex items-center pr-2 py-2 text-left text-sm font-medium rounded-md',
      )}
    >
      {item.children && (
        <svg
          className={classNames(
            open ? 'text-gray-400 rotate-90' : 'text-gray-300',
            'mr-2 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150',
          )}
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
        </svg>
      )}
      {item.name}
    </Disclosure.Button>
  );
}
