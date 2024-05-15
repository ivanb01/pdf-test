import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Button from '@components/shared/button';
import React from 'react';
import Tag from '@components/Tag';
import SimpleBar from 'simplebar-react';

const PropertyFilters = ({ open, setOpen, className, selectAmenities, selectedAmenities }) => {
  const amenities = [
    'Diplomats OK',
    'Furnished',
    'Live Work',
    'No Fee',
    'Pied a Terre',
    'Vacation Rental',
    'Bicycle Room',
    'Brownstone',
    'Business Center',
    'Children Playroom',
    'Common Outdoor Space',
    'Concierge',
    'Doorman',
    'Elevator',
    'Garage',
    'Health Club',
    'High-Speed Internet',
    'Live In Super',
    'Lounge',
    'Maid Service',
    'Nursery',
    'Pool',
    'Recreational Room',
    'Roof Deck',
    'Senior Housing',
    'Storage',
    'Valet',
    'Virtual Doorman',
    'Courtyard',
    'Dishwasher',
    'Driveway',
    'Fireplace',
    'High Ceilings',
    'Laundry',
    'Laundry In Unit',
    'Laundry Services',
    'Open Kitchen',
    'Subway',
    'Washer',
    'City View',
    'Lake View',
    'Open View',
    'Park View',
    'River View',
    'Skyline View',
  ];

  const [internalAmenities, setInternalAmenities] = useState([]);
  useEffect(() => {
    console.log(internalAmenities, 'internalAmenities', selectedAmenities, 'selectedAmenities');
  }, [internalAmenities, selectedAmenities]);

  useEffect(() => {
    if (open) {
      setInternalAmenities(selectedAmenities.length > 0 ? selectedAmenities.split(',') : []);
    }
  }, [open]);
  const [sections, setSections] = useState([
    {
      id: 1,
      name: 'General',
      expanded: true,
      value: amenities.slice(0, 6),
    },
    {
      id: 2,
      name: 'Building Amenities',
      expanded: true,
      value: amenities.slice(amenities.indexOf('Bicycle Room'), amenities.indexOf('Virtual Doorman') + 1),
    },
    {
      id: 3,
      expanded: true,
      name: 'Apartment Features',
      value: amenities.slice(amenities.indexOf('Courtyard'), amenities.indexOf('Washer') + 1),
    },
    {
      id: 4,
      expanded: true,
      name: 'Views',
      value: amenities.slice(amenities.indexOf('City View'), amenities.indexOf('Skyline View') + 1),
    },
  ]);

  const toggleAmenitySelection = (amenity) => {
    // console.log("alberina data", data)
    if (internalAmenities.includes(amenity)) {
      setInternalAmenities(internalAmenities.filter((selected) => selected !== amenity));
    } else {
      setInternalAmenities([...internalAmenities, amenity]);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setOpen}>
        <div className="fixed inset-0" />
        <div className={`fixed inset-0 overflow-hidden bg-transparentBlack ${className}`}>
          <div className="absolute inset-0 overflow-hidden">
            <div
              className={`pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 w-[420px] justify-between`}
            >
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className={`pointer-events-auto w-screen ${className}`}>
                  <div className={`flex flex-col bg-white shadow-xl overflow-y-auto h-full overflow-hidden`}>
                    <div className="flex flex-shrink-0 justify-between items-center p-[20px] pr-6 pl-4 w-[100%]">
                      <div className={'flex justify-between items-center  w-[100%]'}>
                        <Dialog.Title className="text-base font-medium text-gray-900">Filters</Dialog.Title>
                        <CloseIcon className={'h-4 w-4 text-[#8F95B2] cursor-pointer'} onClick={setOpen} />
                      </div>
                    </div>
                    <div className={'flex justify-between flex-col h-[100%]'}>
                      <div className={' py-6  w-[100%]'}>
                        <SimpleBar style={{ maxHeight: 'calc(100vh - 200px)', padding: '0px 16px' }}>
                          {sections.map((s) => (
                            <React.Fragment key={s.name}>
                              <div
                                className={'flex items-center justify-between border-b border-gray-2 py-[6px] mb-5'}
                                role={'button'}
                                onClick={() =>
                                  setSections((prev) => {
                                    const updatedSections = prev.map((section) => {
                                      if (section.id === s.id) {
                                        return {
                                          ...section,
                                          expanded: !section.expanded,
                                        };
                                      }
                                      return section;
                                    });
                                    return updatedSections;
                                  })
                                }
                              >
                                <p className={'text-xs leading-4 font-semibold tracking-wider uppercase text-gray-5'}>
                                  {s.name}
                                </p>
                                {!s.expanded ? (
                                  <KeyboardArrowDownIcon className={'h-4 w-4 text-gray-4'} />
                                ) : (
                                  <KeyboardArrowUpIcon className={'h-4 w-4 text-gray-4'} />
                                )}
                              </div>
                              {s.expanded && (
                                <div className={'flex flex-wrap gap-x-2 '}>
                                  {s.value.map((a) => (
                                    <Tag
                                      key={a}
                                      onClick={() => toggleAmenitySelection(a)}
                                      selected={internalAmenities?.includes(a)}
                                    >
                                      <span>{a}</span>
                                    </Tag>
                                  ))}
                                </div>
                              )}
                            </React.Fragment>
                          ))}
                        </SimpleBar>
                      </div>
                      <div className={'flex items-center justify-between px-6 py-4 fixed-categorize-menu'}>
                        <Button
                          white
                          label="Cancel"
                          disabled={internalAmenities.length === 0}
                          onClick={() => {
                            setInternalAmenities([]);
                            selectAmenities([]);
                          }}
                        >
                          Clear Filters
                        </Button>
                        <Button
                          disabled={internalAmenities.length === 0}
                          darkBlue
                          className={'bg-lightBlue3'}
                          onClick={() => {
                            if (internalAmenities.length > 0) {
                              selectAmenities(internalAmenities.join(','));
                            }
                            setOpen(false);
                          }}
                        >
                          Apply Filter
                        </Button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default PropertyFilters;
