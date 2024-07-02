import { Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/solid';
import { ChevronDownIcon } from '@heroicons/react/solid';
import NotificationAlert from '../../alert/notification-alert';
import Avatar from '@components/shared/avatar';
import { getInitials } from '@global/functions';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const ClientDropdown = ({
  inputWidth,
  top,
  horizontal,
  handleClick,
  options,
  optional,
  label,
  firsName,
  lastName,
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
  openClassName,
  afterLabel,
  menuHeight,
  minMaxUsed,
  border,
  name,
  value,
  ...props
}) => {
  const [selected, setSelected] = useState(
    initialSelect != undefined && initialSelect != null
      ? options?.find((item) => item.label === String(initialSelect) || item.value == initialSelect)
      : null,
  );
  const activeClasse = activeClasses ? activeClasses : 'text-white bg-lightblue1';

  console.log('VALUE', value);

  useEffect(() => {
    setSelected(initialSelect);
  }, [initialSelect]);

  return (
    <div className={className}>
      <Listbox
        value={selected}
        onChange={(val) => {
          props?.noOptionChange ? null : setSelected(val);
          handleSelect(val);
        }}>
        {({ open }) => (
          <>
            <div className={`${horizontal && 'flex items-center'}`}>
              {label && (
                <Listbox.Label className={`block text-sm font-medium text-gray6 mr-2 mb-1`}>
                  {label} {optional && <span className="text-gray3 ml-1">(Optional)</span>}
                </Listbox.Label>
              )}
              <div className={`relative ${open && openClassName}`}>
                <Listbox.Button
                  className={`${selectClasses ? selectClasses : 'bg-white border rounded-md'} ${inputWidth} relative ${
                    !inputWidth && 'w-full'
                  } ${!border ? ' border-borderColor' : border} h-[38px] pl-3 pr-10 py-[9px] text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue1 focus:border-blue1 sm:text-sm ${error && 'border-red-300 focus:border-red-600 focus:ring-red-600'}`}
                  name={name}>
                  {value?.label || ''}
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDownIcon
                      className={`transition-all h-5 w-5 text-gray3 ${open && 'rotate-180'}`}
                      aria-hidden="true"
                    />
                  </span>
                  {}
                </Listbox.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0">
                  <Listbox.Options
                    className={`absolute ${menuHeight} z-10 mt-1 w-full bg-white shadow-lg max-h-[250px] rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm  ${
                      top && top
                    }`}>
                    {options?.map((option) => (
                      <Listbox.Option
                        key={option.id}
                        className={({ active }) =>
                          classNames(
                            active ? activeClasse : 'text-gray7',
                            'cursor-pointer select-none relative p-4 hover:bg-lightBlue1',
                          )
                        }
                        value={option}>
                        {({ selected, active }) => (
                          <>
                            <span className={''}>
                              <div className="flex items-center gap-3">
                                <Avatar
                                  className={'w-[40px] h-[40px]'}
                                  initials={getInitials(option?.firstName + ' ' + option.lastName)}
                                  src={option?.profile_image_path}
                                />
                                <div className="flex flex-col text-gray7 font-medium leading-5 text-[14px]">
                                  <div>{`${option.firstName} ${option.lastName}`}</div>
                                  <div className="text-gray4  font-normal">{option.email}</div>
                                </div>
                              </div>
                            </span>
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
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

export default ClientDropdown;
