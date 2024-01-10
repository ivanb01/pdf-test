import Button from '@components/shared/button';
import Input from '@components/shared/input';
import Image from 'next/image';
import SearchSelectInput from '@components/shared/search-select-input';
import Overlay from '@components/shared/overlay';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { NYCneighborhoods, bathroomsOptions, roomsOptions, data as data1 } from '@global/variables';
import bedroom from '/public/images/bedroom.svg';
import bathroom from '/public/images/bathroom.svg';
import usd from '/public/images/usd.svg';
import * as contactServices from 'api/contacts';
import { valueOptions } from '@global/functions';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setRefetchPart } from '@store/global/slice';
import { toast } from 'react-hot-toast';
import Dropdown from '@components/shared/dropdown';
import RadioGroup from '@components/shared/radio/radio-chips';
import RadioChips from '@components/shared/radio/radio-chips';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useSelector } from 'react-redux';
import { setAmenities } from '@store/global/slice';
import { amenities } from '@global/variables';
import React from 'react';
import Tag from '@components/Tag';
import SimpleBar from 'simplebar-react';
import Search from '@components/shared/input/search';
import CloseIcon from '@mui/icons-material/Close';
import { ChevronDownIcon } from '@heroicons/react/solid';
import List from '@components/NestedCheckbox/List';
import MinMaxPrice from '@components/shared/dropdown/MinMaxPrice';

const EditLookingForPopup = ({ title, handleClose, className, contactId, data, action }) => {
  const dispatch = useDispatch();
  const [loadingButton, setLoadingButton] = useState(false);
  const reduxAmenities = useSelector((state) => state.global.amenities);
  const LookingPropertySchema = Yup.object().shape({
    neighborhood_ids: Yup.array()
      .required('Neighborhood IDs are required')
      .min(1, 'Please select at least one neighborhood'),
    bedrooms: Yup.string().notRequired().nullable(),
    bathrooms: Yup.string().notRequired().nullable(),
    budget_min: Yup.number()
      .min(0, 'Budget Min should be greater than 0')
      .typeError('Budget Min should be an integer')
      .transform((value, originalValue) =>
        typeof originalValue === 'string' && originalValue.trim() === '' ? undefined : isNaN(value) ? undefined : value,
      )
      .notRequired(),
    budget_max: Yup.number()
      .typeError('Budget Max should be an integer')
      .when('budget_min', (budget_min, schema) => {
        if (budget_min === undefined || isNaN(budget_min)) {
          return;
        } else {
          return schema
            .typeError('Budget Max should be an integer')
            .moreThan(budget_min, 'Budget Max should be greater than Budget Min');
        }
      })
      .transform((value, originalValue) =>
        typeof originalValue === 'string' && originalValue.trim() === '' ? undefined : isNaN(value) ? undefined : value,
      )
      .notRequired(),
  });

  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      neighborhood_ids: data?.neighborhood_ids ? data.neighborhood_ids : '',
      looking_action: action,
      bedrooms: data?.bedrooms_min ? data.bedrooms_min : '',
      bathrooms: data?.bathrooms_min ? data.bathrooms_min : '',
      budget_min: data?.budget_min ? data.budget_min : '',
      budget_max: data?.budget_max ? data.budget_max : '',
    },
    validationSchema: LookingPropertySchema,
    onSubmit: (values, { setFieldValue }) => {
      setFieldValue('budget_min', values.budget_min ? parseFloat(values.budget_min) : null);
      setFieldValue('budget_max', values.budget_max ? parseFloat(values.budget_max) : null);

      if (formik.isValid) {
        let bathrooms = values.bathrooms && values.bathrooms != 'Any' ? parseFloat(values.bathrooms) : null;

        let bedrooms = values.bedrooms && values.bedrooms != 'Any' ? parseFloat(values.bedrooms) : null;
        handleAddSubmit({
          neighborhood_ids: values.neighborhood_ids ? values.neighborhood_ids : null,
          looking_action: values.looking_action ? values.looking_action : null,
          bedrooms_min: bedrooms,
          bedrooms_max: null,
          bathrooms_min: bathrooms,
          bathrooms_max: null,
          budget_min: values.budget_min === '' || values.budget_min === 0 ? null : Number(values.budget_min),
          budget_max: values.budget_max === '' || values.budget_max === 0 ? null : Number(values.budget_max),
        });
      }
    },
  });

  const { errors, touched } = formik;

  const handleAddSubmit = async (values) => {
    setLoadingButton(true);
    try {
      const res = await contactServices.addContactLookingProperty(contactId, values);
      toast.success('Changes were successfully saved');
      dispatch(setRefetchPart('looking-for'));
      setTimeout(() => {
        setLoadingButton(false);
        handleClose();
      }, 1000);
    } catch (error) {
      console.log(error);
      setLoadingButton(false);
    }
  };
  const [sections, setSections] = useState([
    {
      id: 1,
      name: 'General',
      expanded: true,
      value: amenities.slice(0, 5),
    },
    {
      id: 2,
      name: 'Building Amenities',
      expanded: true,
      value: amenities.slice(amenities.indexOf('Doorman'), amenities.indexOf('Maid Service') + 1),
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
    if (reduxAmenities.includes(amenity)) {
      dispatch(setAmenities(reduxAmenities.filter((selected) => selected !== amenity)));
    } else {
      dispatch(setAmenities([...reduxAmenities, amenity]));
    }
  };
  const [datav2, setDatav2] = useState([]);
  const [ids, setIds] = useState();
  const statuss = Object.freeze({
    unchecked: 0,
    checked: 1,
    indeterminate: -1,
  });
  const setStatuss = (root, status) => {
    root.status = status;
    if (Array.isArray(root.items)) {
      return root.items.forEach((item) => {
        setStatuss(item, status);
      });
    }
  };

  const computeStatus = (items) => {
    let checked = 0;
    let indeterminate = 0;

    items.forEach((item) => {
      if (item.status && item.status === statuss?.checked) checked++;
      if (item.status && item.status === statuss?.indeterminate) indeterminate++;
    });

    if (checked === items.length) {
      return statuss.checked;
    } else if (checked > 0 || indeterminate > 0) {
      return statuss.indeterminate;
    }
  };

  const traverse = (root, needle, status) => {
    let id;
    let items;

    if (Array.isArray(root)) {
      items = root;
    } else {
      id = root.id;
      items = root.items;
    }

    // return if needle is found
    // we don't have to compute the status of the items if root.id === needle
    if (id === needle) {
      return setStatuss(root, status);
    }

    if (!items) {
      return root;
    } else {
      items.forEach((item) => traverse(item, needle, status));
      root.status = computeStatus(items);
    }
  };

  const [items, setItems] = useState(data1);
  const compute = (checkboxId, status) => {
    traverse(items, checkboxId, status);
    setItems(items.slice());
  };
  const initializeStatus = () => {
    const updatedData = items.map((category) => ({
      ...category,
      status: 0,
      items: category.items.map((item) => ({ ...item, status: 0 })),
    }));

    setItems(updatedData);
  };
  const [openDropdown, setOpenDropdown] = useState(false);
  useEffect(() => {
    initializeStatus();
  }, []);
  useEffect(() => {
    const newData = [];
    const idsOfNeighboorhoods = [];

    items.forEach((d) => {
      if (d.status === 1) {
        newData.push(d.name);
        d.items.forEach((i) => {
          if (i.status === 1) {
            idsOfNeighboorhoods.push(i.id);
          }
        });
      } else {
        d.items.forEach((i) => {
          if (i.status === 1) {
            newData.push(i.name);
            idsOfNeighboorhoods.push(i.id);
          }
        });
      }
    });

    const idsString = idsOfNeighboorhoods.join(',');
    formik.setFieldValue('neighborhood_ids', idsString.split(',').map(Number));
    setIds(idsString);

    setDatav2(newData);
  }, [items, contactId]);
  const [neighborhoodsSearch, setNeighborhoodsSearch] = useState('');

  const filterData = (data, searchTerm) => {
    return data.reduce((result, item) => {
      const isParentMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());

      const filteredItems = item.items.filter((subItem) =>
        subItem.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );

      if (isParentMatch && filteredItems.length === 0) {
        result.push(item);
      } else if (filteredItems.length > 0) {
        result.push({ ...item, items: filteredItems });
      }

      return result;
    }, []);
  };

  useEffect(() => {
    if (!data?.neighborhood_ids) {
      return;
    }
    const matchingNames = [];
    items.forEach((city) => {
      city.items.forEach((neighborhood) => {
        if (data?.neighborhood_ids.includes(neighborhood.id)) {
          matchingNames.push(neighborhood.name);
        }
      });
    });
    setDatav2(matchingNames);
  }, [contactId, data?.neighborhood_ids]);
  useEffect(() => {
    if (!data?.neighborhood_ids) {
      return;
    }
    setItems((prevMatchingNeighborhoods) => {
      const updatedMatchingNeighborhoods = prevMatchingNeighborhoods.map((city) => {
        const updatedItems = city.items.map((neighborhood) => {
          if (data?.neighborhood_ids.includes(neighborhood.id)) {
            return { ...neighborhood, status: 1 };
          }
          return neighborhood;
        });

        return { ...city, items: updatedItems };
      });

      return updatedMatchingNeighborhoods;
    });
  }, [contactId, data?.neighborhood_ids]);

  useEffect(() => {
    setNeighborhoodsSearch('');
  }, [openDropdown]);

  return (
    <Overlay
      // className="w-[632px]"
      handleCloseOverlay={handleClose}
      height="max-h-[500px]"
      title={title}
      className={className}>
      <div className="relative">
        <form onSubmit={formik.handleSubmit} className="p-5">
          <SimpleBar autoHide style={{ maxHeight: '330px' }}>
            <div
              className={
                'min-w-[170px]  cursor-pointer flex justify-between h-[38px] px-2 py-[9px] relative border border-gray-300 text-sm font-medium text-[#808080] rounded-md'
              }
              style={{ flex: 1, position: 'relative' }}
              onClick={() => setOpenDropdown(!openDropdown)}>
              <div className={'overflow-hidden whitespace-nowrap overflow-ellipsis'}>
                {datav2.length > 0 ? datav2.join(', ') : 'Select'}
              </div>
              <div className={'flex'}>
                {datav2.length > 0 && (
                  <CloseIcon
                    className={`transition-all h-5 w-5 text-gray3`}
                    aria-hidden="true"
                    onClick={(e) => {
                      e.stopPropagation();
                      initializeStatus();
                      setDatav2([]);
                    }}
                  />
                )}
                <ChevronDownIcon
                  className={`transition-all h-5 w-5 text-gray3 ${openDropdown && 'rotate-180'}`}
                  aria-hidden="true"
                />
              </div>
              {openDropdown && (
                <div
                  className={
                    'flex-1 left-0 py-3 pl-[10px] z-10 absolute top-[45px] shadow-lg max-w-[598px] bg-white w-full max-h-[250px] rounded-md  text-base ring-1 ring-black ring-opacity-5  focus:outline-none sm:text-sm'
                  }>
                  <SimpleBar style={{ maxHeight: '235px', height: '100%', paddingRight: '12px' }}>
                    <input
                      className={` text-sm mb-2 text-gray8 pl-3 border border-gray2 rounded-lg bg-white px-[13px] h-[35px] w-full  mt-1 ml-0.5 outline-none focus:ring-1 focus:ring-blue1 focus:border-blue1 z-[9999999]`}
                      type={'text'}
                      placeholder={'Search'}
                      onChange={(e) => setNeighborhoodsSearch(e.target.value)}
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setOpenDropdown(true);
                      }}
                    />
                    {filterData(items, neighborhoodsSearch).length > 0 ? (
                      <div className={'mt-2'}>
                        <List
                          items={filterData(items, neighborhoodsSearch)}
                          compute={compute}
                          setOpenDropdown={setOpenDropdown}
                        />
                      </div>
                    ) : (
                      <div className={'text-sm mb-1 text-gray8 text-center mt-2'}>No Neighborhood with this name</div>
                    )}
                  </SimpleBar>
                </div>
              )}
            </div>
            {/*<SearchSelectInput*/}
            {/*  label="Neighborhood*"*/}
            {/*  options={NYCneighborhoods}*/}
            {/*  value={valueOptions(formik.values.neighborhood_ids, NYCneighborhoods)}*/}
            {/*  onChange={(choice) => {*/}
            {/*    let choices = choice.map((el) => el.value);*/}
            {/*    formik.setFieldValue('neighborhood_ids', choices);*/}
            {/*  }}*/}
            {/*  error={errors.neighborhood_ids && touched.neighborhood_ids}*/}
            {/*  errorText={errors.neighborhood_ids}*/}
            {/*/>*/}
            <RadioChips
              options={roomsOptions}
              value={formik.values.bedrooms ? formik.values.bedrooms : null}
              label="Bedrooms"
              className="mt-4"
              handleSelect={(val) => formik.setFieldValue('bedrooms', val.value)}
            />
            <RadioChips
              options={bathroomsOptions}
              value={formik.values.bathrooms ? formik.values.bathrooms : null}
              label="Bathrooms"
              className="mt-4"
              handleSelect={(val) => formik.setFieldValue('bathrooms', val.value)}
            />
            <div className="grid grid-cols-2 gap-4 mt-4">
              {/* <Dropdown
              white
              top={'top-[40px]'}
              menuHeight={'h-[150px]'}
              label="Bedrooms"
              initialSelect={String(`${formik.values.bedrooms}+`)}
              value={formik.values.bedrooms}
              activeIcon={false}
              options={roomsOptions}
              error={errors.bedrooms && touched.bedrooms}
              errorText={errors.bedrooms}
              handleSelect={(val) => formik.setFieldValue('bedrooms', val.label)}
              placeHolder={'Choose'}
            />
            <Dropdown
              white
              top={'top-[40px]'}
              menuHeight={'h-[150px]'}
              label="Bathrooms"
              initialSelect={String(`${formik.values.bathrooms}+`)}
              value={formik.values.bathrooms}
              activeIcon={false}
              options={bathroomsOptions}
              error={errors.bathrooms && touched.bathrooms}
              errorText={errors.bathrooms}
              handleSelect={(val) => formik.setFieldValue('bathrooms', val.label)}
              placeHolder={'Choose'}
            /> */}
              <Input
                id="budget_min"
                type="money"
                label="Budget Min"
                iconAfter={<Image src={usd} height={20} />}
                className="col-span-1"
                onChange={(val) => formik.setFieldValue('budget_min', val)}
                value={formik.values.budget_min}
                error={errors.budget_min && touched.budget_min}
                errorText={errors.budget_min}
              />
              <Input
                id="budget_max"
                type="money"
                label="Budget Max"
                iconAfter={<Image src={usd} height={20} />}
                className="col-span-1"
                onChange={(val) => formik.setFieldValue('budget_max', val)}
                value={formik.values.budget_max}
                error={errors.budget_max && touched.budget_max}
                errorText={errors.budget_max}
              />
            </div>
            <div className={'w-[100%] mt-6'}>
              {sections.map((s) => (
                <React.Fragment key={s.name}>
                  <div
                    className={'flex items-center justify-between border-b border-gray-2 py-[6px] mb-5'}
                    role={'button'}
                    onClick={() =>
                      setSections((prev) => {
                        const updatedSections = prev.map((section) => {
                          if (section.id === s.id) {
                            return { ...section, expanded: !section.expanded };
                          }
                          return section;
                        });
                        return updatedSections;
                      })
                    }>
                    <p className={'text-xs leading-4 font-semibold tracking-wider uppercase text-gray-5'}>{s.name}</p>
                    {!s.expanded ? (
                      <KeyboardArrowDownIcon className={'h-4 w-4 text-gray-4'} />
                    ) : (
                      <KeyboardArrowUpIcon className={'h-4 w-4 text-gray-4'} />
                    )}
                  </div>
                  {s.expanded && (
                    <div className={'flex flex-wrap gap-x-2 '}>
                      {s.value.map((a) => (
                        <Tag key={a} onClick={() => toggleAmenitySelection(a)} selected={reduxAmenities.includes(a)}>
                          <span>{a}</span>
                        </Tag>
                      ))}
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </SimpleBar>
        </form>
        <div
          className="text-right sticky left-0 right-0 bottom-0 bg-white p-5"
          style={{
            boxShadow: '0px -2px 12px 1px rgba(0, 0, 0, 0.07)',
          }}>
          <Button white label="Cancel" className="mr-2" onClick={handleClose} />
          <Button
            label="Save Changes"
            type="submit"
            primary
            className=""
            loading={loadingButton}
            disabled={!formik.isValid || ids?.length === 0}
            onClick={() => {
              setOpenDropdown(false);
              formik.handleSubmit();
            }}
          />
        </div>
      </div>
    </Overlay>
  );
};

export default EditLookingForPopup;
