import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { classNames } from 'global/functions';

const FilterDropdown = ({
  label,
  types,
  handleClick,
  icon,
  className,
  isFilter,
  data
}) => {
  return (
    <Menu
      as="div"
      className={'relative inline-block text-left ' + className}
    >
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md px-4 py-2 bg-white text-sm font-medium text-[#696F8C] hover:text-primaryOxford hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-primaryOxford z-0">
          <div>{icon}</div>
          {label}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute left-0 mt-2 w-56 z-50 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {isFilter && (
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    onClick={() => handleClick(null)}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Show All
                  </a>
                )}
              </Menu.Item>
            )}
            {types.map((type) => (
              <Menu.Item key={type.id}>
                {({ active }) => (
                  <a
                    href="#"
                    onClick={() => type.handleClick(data)}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    {type.name}
                  </a>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default FilterDropdown;
