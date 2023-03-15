import { Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/solid';
import { ChevronDownIcon } from '@heroicons/react/solid';

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
  white,
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
          setSelected(val);
          handleSelect(val);
        }}
      >
        {({ open }) => (
          <>
            {label && (
              <Listbox.Label className="block text-sm font-medium text-gray-700">
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
                }  relative w-full  border-gray-300 shadow-sm pl-3 pr-10 py-[9px] text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue1 focus:border-blue1 sm:text-sm`}
              >
                <span className="block truncate capitalize">
                  {!selected && placeHolder && placeHolder}
                  {selected && selected.name}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDownIcon
                    className="h-5 w-5 text-gray-400"
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
                          active ? activeClasse : 'text-gray-900',
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
    </div>
  );
};

export default Dropdown;
