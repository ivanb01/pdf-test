import { useState, Fragment, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveFilterOfProperties } from '@store/global/slice';

const FilterPropertiesDropdown = ({ onFiltersChange }) => {
  const filterNewest = () => {
    onFiltersChange('newest');
  };
  const sortOldest = () => {
    onFiltersChange('oldest');
  };
  const sortCheapest = () => {
    onFiltersChange('minPrice');
  };
  const sortMostExpensive = () => {
    onFiltersChange('maxPrice');
  };
  const dispatch = useDispatch();
  const activeFilterOfProperties = useSelector((state) => state.global.activeFilterOfProperties);

  const options = [
    { id: 1, name: 'Newest first', callback: filterNewest },
    { id: 2, name: 'Oldest first', callback: sortOldest },
    { id: 3, name: 'Price (low to high)', callback: sortCheapest },
    { id: 4, name: 'Price (high to low)', callback: sortMostExpensive },
  ];
  const [selected, setSelected] = useState(activeFilterOfProperties);
  useEffect(() => {
    setSelected(options.find((option) => option.id === activeFilterOfProperties));
  }, [activeFilterOfProperties]);

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <Listbox
        value={selected}
        defaultValue={'Newest first'}
        onChange={(item) => {
          setSelected(item);
          dispatch(setActiveFilterOfProperties(item.id));
        }}>
        <div className="relative mt-1 w-[220px]">
          <Listbox.Button
            onClick={handleToggle}
            className=" flex justify-between w-[220px] border rounded-md border-borderColor px-3 py-[9px] text-left cursor-pointer focus:outline-none focus:ring-0 focus:ring-lightBlue3 focus:border-lightBlue3 sm:text-sm">
            <span
              className={
                selected === null
                  ? 'text-gray4 italic text-sm font-normal leading-5'
                  : 'text-sm leading-5 font-normal text-gray7'
              }>
              {selected.name}
            </span>
            <ArrowDropUpIcon className={` transition-all h-5 w-5 text-gray-400 ${!isOpen ? 'rotate-180' : ''}`} />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100 "
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <Listbox.Options className="absolute mt-1 z-10 max-h-60 w-full overflow-auto rounded-md bg-white py-3 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option, personIdx) => (
                <Listbox.Option
                  onClick={() => {
                    option.callback();
                    handleClose();
                  }}
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2.5 px-3 text-gray7  ${active ? 'bg-lightBlue1' : ''}`
                  }
                  value={option}>
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                        {option.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">icon2</span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default FilterPropertiesDropdown;
