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
  data,
  positionClass,
  buttonClassName,
}) => {
  return (
    <Menu as="div" className={'relative inline-block text-left ' + className}>
      <div>
        <Menu.Button
          className={`inline-flex ${
            buttonClassName ? buttonClassName : ''
          } justify-center w-full rounded-md py-2 bg-white text-sm font-medium text-[#696F8C] z-0 `}>
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
        leaveTo="transform opacity-0 scale-95">
        <Menu.Items
          className={`origin-top-right absolute ${
            positionClass ? positionClass : 'left-0'
          } mt-2 w-56 z-50 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}>
          <div className="py-1">
            {isFilter && (
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    onClick={() => handleClick(null)}
                    className={classNames(active ? 'bg-gray1 text-gray8' : 'text-gray6', 'block px-4 py-2 text-sm')}>
                    Show All
                  </a>
                )}
              </Menu.Item>
            )}
            {types.map((type, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <a
                    href="#"
                    onClick={() => type.handleClick(data)}
                    className={classNames(active ? 'bg-gray1 text-gray8' : 'text-gray6', 'block px-4 py-2 text-sm')}>
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
