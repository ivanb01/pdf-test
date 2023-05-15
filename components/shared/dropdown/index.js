import { Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/solid';
import { ChevronDownIcon } from '@heroicons/react/solid';
import NotificationAlert from '../alert/notification-alert';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Dropdown = ({
  handleClick,
  options,
  optional,
  label,
  className,
  id,
  activeClasses,
  handleSelect,
  activeIcon,
  placeHolder,
  initialSelect,
  selectClasses,
  selectedOption,
  white,
  error,
  errorText,
  ...props
}) => {
  const firstSelect = initialSelect
    ? options.find((item) => item.name === initialSelect)
    : null;
  const [selected, setSelected] = useState(firstSelect);
  const activeClasse = activeClasses ? activeClasses : 'text-white bg-blue2';

  useEffect(() => {
    setSelected(firstSelect);
  }, [initialSelect]);

  return (
    <div className={className}>
      <Listbox
        value={selected}
        onChange={(val) => {
          props?.noOptionChange ? null : setSelected(val);
          handleSelect(val);
        }}
      >
        {({ open }) => (
          <>
            {label && (
              <Listbox.Label className="block text-sm font-medium text-gray6">
                {label}{' '}
                {optional && (
                  <span className="text-gray3 ml-1">(Optional)</span>
                )}
              </Listbox.Label>
            )}
            <div className="mt-1 relative">
              <Listbox.Button
                className={`${
                  selectClasses ? selectClasses : 'bg-white border rounded-md'
                }  relative w-full  border-gray-300 pl-3 pr-10 py-[9px] text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue1 focus:border-blue1 sm:text-sm`}
              >
                <span
                  className={`${
                    selectedOption === 'statusColor' &&
                    `absolute top-4 ${selected?.color} w-2 h-2 mr-2 rounded-full`
                  }`}
                ></span>

                {/* <span className={`flex items-center truncate capitalize ${selectedOption === 'statusColor' &&  `before:${selected.color} before:content-[''] before:w-2 before:h-2 before:mr-2 before:rounded-full`}` }> */}
                <span
                  className={`flex items-center truncate capitalize ${
                    !selected && placeHolder && 'text-gray6'
                  } ${selected && selected.name && 'text-gray8'} ${
                    selectedOption === 'statusColor' && 'pl-4'
                  }`}
                >
                  {!selected && placeHolder && placeHolder}
                  {selected && selected.name}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDownIcon
                    className="h-5 w-5 text-gray3"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                  {options.map((option) => (
                    <Listbox.Option
                      key={option.id}
                      className={({ active }) =>
                        classNames(
                          active ? activeClasse : 'text-gray7',
                          'cursor-pointer select-none relative py-2 pl-3 pr-9'
                        )
                      }
                      value={option}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={classNames(
                              selected ? 'font-semibold' : 'font-normal',
                              'block truncate capitalize'
                            )}
                          >
                            {option.name}
                          </span>

                          {selected && activeIcon ? (
                            <span
                              className={classNames(
                                active ? 'text-white' : 'text-blue2',
                                'absolute inset-y-0 right-0 flex items-center pr-4 capitalize'
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>

      {error && errorText && (
        <NotificationAlert className="mt-2 p-2" type={'error'}>
          {errorText}
        </NotificationAlert>
      )}
    </div>
  );
};

export default Dropdown;
