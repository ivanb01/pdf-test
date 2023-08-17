import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/solid';
import { ChevronDownIcon } from '@heroicons/react/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Dropdown = ({
  options,
  optional,
  label,
  className,
  id,
  activeClasses,
  handleSelect,
  activeIcon,
  placeHolder,
  selectClasses,
  iconLabel,
  dropdownValue,
  handleChange,
  handleDropdownClosed,
  ...props
}) => {
  const activeClasse = activeClasses ? activeClasses : 'text-white bg-blue2';

  const firstSelect = dropdownValue ? options.find((item) => item.name === dropdownValue) : null;
  const [selected, setSelected] = useState(firstSelect);
  return (
    <div className={className}>
      <Listbox
        value={selected}
        onChange={(val) => {
          handleSelect(val);
          props.noOptionChange ? null : setSelected(val);
        }}
      >
        {({ open }) => (
          <>
            {label && (
              <Listbox.Label className="block text-sm font-medium text-gray6">
                {label} {optional && <span className="text-gray3 ml-1">(Optional)</span>}
              </Listbox.Label>
            )}
            <div className="relative">
              {iconLabel ? (
                <Listbox.Button className={`flex`}>{iconLabel}</Listbox.Button>
              ) : (
                <Listbox.Button
                  className={`${
                    selectClasses ? selectClasses : 'bg-white border rounded-md'
                  }  relative w-full  border-gray-300 pl-3 pr-10 py-[9px] text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue1 focus:border-blue1 sm:text-sm`}
                >
                  <span className="block truncate capitalize">
                    {!dropdownValue && placeHolder && placeHolder}
                    {dropdownValue && dropdownValue.name}
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </Listbox.Button>
              )}

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => handleDropdownClosed(open)}
              >
                <Listbox.Options className=" z-50 absolute mt-1 top-[20px] right-[50%] w-auto bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                  {options?.map((option) => (
                    <Listbox.Option
                      key={option.id}
                      className={({ selected, active }) =>
                        classNames(
                          selected || active ? activeClasse : 'text-gray-900',
                          'cursor-pointer select-none relative py-2 pl-3 pr-9',
                        )
                      }
                      value={option}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={classNames(
                              selected ? 'font-semibold' : 'font-normal',
                              'block truncate capitalize',
                            )}
                          >
                            {option.name}
                          </span>

                          {selected && activeIcon ? (
                            <span
                              className={classNames(
                                active ? 'text-white' : 'text-blue2',
                                'absolute inset-y-0 right-0 flex items-center pr-4 capitalize',
                              )}
                            >
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
    </div>
  );
};

export default Dropdown;
