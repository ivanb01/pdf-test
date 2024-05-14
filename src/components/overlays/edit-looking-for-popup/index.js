import Button from '@components/shared/button';
import Input from '@components/shared/input';
import Image from 'next/image';
import Overlay from '@components/shared/overlay';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { NYCneighborhoods, bathroomsOptions, roomsOptions, data as data1 } from '@global/variables';
import usd from '/public/images/usd.svg';
import * as contactServices from 'api/contacts';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setRefetchPart } from '@store/global/slice';
import { toast } from 'react-hot-toast';
import RadioChips from '@components/shared/radio/radio-chips';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useSelector } from 'react-redux';
import { setAmenities } from '@store/global/slice';
import { amenities } from '@global/variables';
import React from 'react';
import Tag from '@components/Tag';
import SimpleBar from 'simplebar-react';
import NeighbourhoodDropdown from '@components/NestedCheckbox/NeighbourhoodDropdown';

const EditLookingForPopup = ({ title, handleClose, className, contactId, data, action }) => {
  const dispatch = useDispatch();
  const [loadingButton, setLoadingButton] = useState(false);
  const reduxAmenities = useSelector((state) => state.global.amenities);
  const [amenitiesChange, setAmenitiesChange] = useState(false);

  const [internalAmenities, setInternalAmenities] = useState([]);

  useEffect(() => {
    setInternalAmenities(reduxAmenities.length > 0 ? reduxAmenities : []);
  }, []);

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
      bedrooms: data?.bedrooms_min || data?.bedrooms_min === 0 ? data.bedrooms_min : '',
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

        let bedrooms =
          values.bedrooms !== 'Any' && !isNaN(parseFloat(values.bedrooms)) ? parseFloat(values.bedrooms) : null;

        handleAddSubmit({
          neighborhood_ids: values.neighborhood_ids ? values.neighborhood_ids : null,
          looking_action: values.looking_action ? values.looking_action : null,
          bedrooms_min: bedrooms,
          bedrooms_max: bedrooms,
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
    if (internalAmenities.includes(amenity)) {
      setInternalAmenities(internalAmenities.filter((selected) => selected !== amenity));
    } else {
      setInternalAmenities([...internalAmenities, amenity]);
    }
    setAmenitiesChange(true);
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

        const allItemsChecked = updatedItems.every((neighborhood) => neighborhood.status === 1);
        const anyItemChecked = updatedItems.some((neighborhood) => neighborhood.status === 1);

        let cityStatus;
        if (allItemsChecked) {
          cityStatus = 1;
        } else if (anyItemChecked) {
          cityStatus = -1;
        } else {
          cityStatus = 0;
        }

        return { ...city, status: cityStatus, items: updatedItems };
      });

      return updatedMatchingNeighborhoods;
    });
  }, [contactId, data?.neighborhood_ids]);

  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);
  function arraysHaveSameElements(arr1, arr2) {
    const sortedArr1 = [...arr1].sort();
    const sortedArr2 = [...arr2].sort();

    if (sortedArr1.length !== sortedArr2.length) {
      return false;
    }

    for (let i = 0; i < sortedArr1.length; i++) {
      if (sortedArr1[i] !== sortedArr2[i]) {
        return false;
      }
    }

    return true;
  }

  return (
    <Overlay
      // className="w-[632px]"
      handleCloseOverlay={handleClose}
      height="md:max-h-[500px]"
      title={title}
      className={className}>
      <div className="relative">
        <form onSubmit={formik.handleSubmit} className="p-5">
          <SimpleBar autoHide className="px-[15px] max-h-full md:max-h-[330px]">
            <p className={'text-gray-700 text-sm font-medium mb-1'}>Neighborhood</p>
            <NeighbourhoodDropdown
              className={'max-w-[610px] '}
              style={{ maxHeight: '235px', height: '100%', paddingRight: '12px' }}
              border={datav2.length > 0}
              setIds={setIds}
              items={items}
              initializeStatus={initializeStatus}
              setItems={setItems}
              datav2={datav2}
              setDatav2={setDatav2}
            />
            <RadioChips
              options={roomsOptions}
              value={formik.values.bedrooms || formik.values.bedrooms === 0 ? formik.values.bedrooms : null}
              label="Bedrooms"
              className="mt-4"
              handleSelect={(val) => {
                formik.setFieldValue('bedrooms', val.value);
              }}
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
                        <Tag
                          key={a}
                          onClick={() => {
                            toggleAmenitySelection(a);
                          }}
                          selected={internalAmenities?.includes(a)}>
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
          className="text-right md:sticky left-0 right-0 bottom-0 bg-white p-5 flex justify-between h-[78px]"
          style={{
            boxShadow: '0px -2px 12px 1px rgba(0, 0, 0, 0.07)',
          }}>
          <div>
            <Button
              white
              label={'Clear'}
              onClick={() => {
                setDatav2([]);
                setIds('');
                setItems(data1);
                formik?.values?.neighborhood_ids.map((id) => compute(id, 0));
                filterData(data1, '');
                dispatch(setAmenities([]));
                setInternalAmenities([]);
                formik.setValues({
                  bathrooms: '',
                  bedrooms: '',
                  neighborhood_ids: [0],
                  budget_max: '',
                  budget_min: '',
                  looking_action: 1,
                });
              }}
            />
          </div>
          <div>
            <Button white label="Cancel" className="mr-2" onClick={handleClose} />
            <Button
              label="Save Changes"
              type="submit"
              primary
              className=""
              loading={loadingButton}
              disabled={!formik.dirty && arraysHaveSameElements(internalAmenities, reduxAmenities)}
              onClick={() => {
                dispatch(setAmenities([...reduxAmenities, ...internalAmenities]));
                formik.handleSubmit();
              }}
            />
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default EditLookingForPopup;
