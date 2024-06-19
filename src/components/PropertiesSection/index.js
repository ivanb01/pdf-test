import { useFormik } from 'formik';
import filter from '/public/images/filter.svg';
import lookingForEmpty from '/public/images/looking-for-empty.svg';
import React, { useEffect, useState, Fragment, useLayoutEffect } from 'react';
import Button from 'components/shared/button';
import * as contactServices from 'api/contacts';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import SimpleBar from 'simplebar-react';
import Loader from '@components/shared/loader';
import PropertyCard from '@components/property-card';
import { useSelector } from 'react-redux';
import { setRefetchPart } from '@store/global/slice';
import { useDispatch } from 'react-redux';
import fetchJsonp from 'fetch-jsonp';
import { useRouter } from 'next/router';
import EditLookingForPopup from '@components/overlays/edit-looking-for-popup';
import AddLookingForPopup from '@components/overlays/add-looking-for-popup';
import TabsWithPills from '@components/shared/tabs/tabsWithPills';
import { addPropertiesInPortfolio, deletePropertyFromPortfolio, getPortfolioByContactId } from '@api/portfolio';
import { EmptyPortfolioClientDetails } from '@components/Portfolio/empty-portfolio-state';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SendPropertiesFooter from '@components/SendPropertiesFooter/send-properties-footer';
import { sendEmail } from '@api/marketing';
import { render } from '@react-email/components';
import { generateSMSFooter, getBaseUrl, getLookingAction } from '@global/functions';
import { sendSMS } from '@api/email';
import { fetchCurrentUserInfo } from '@helpers/auth';
import PropertiesSlideOver from '@components/PropertiesSlideover/properties-slideover';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { addContactActivity } from '@api/contacts';
import { updateContactLocally } from '@store/contacts/slice';
import PortfolioEmailTemplate from '@components/Portfolio/PortfolioEmailTemplate/portfolio-email-template';
import PropertiesSkeleton from '@components/SkeletonLoaders/PropertiesSkeleton';
import { getContactNotes, updateContact } from 'api/contacts';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import SpinnerLoader from '@components/shared/SpinnerLoader';

export default function PropertiesSection({ contactId, category, noSelect }) {
  const refetchPart = useSelector((state) => state.global.refetchPart);
  const router = useRouter();
  const dispatch = useDispatch();
  const LookingPropertySchema = Yup.object().shape({
    neighborhood_ids: Yup.array().required('Field is required'),
    bedrooms: Yup.number().integer('Must be integer').min(0, 'Minimum value is 0'),
    bathrooms: Yup.number().integer('Must be integer').min(0, 'Minimum value is 0'),
    budget_min: Yup.number().min(0, 'Budget Min should be greater than 0').typeError('Budget Min should be an integer'),
    budget_max: Yup.number()
      .typeError('Budget Max should be an integer')
      .when('budget_min', (budget_min, schema) => {
        if (budget_min === undefined || isNaN(budget_min)) {
          return;
        } else {
          return schema
            .required('Field can not be left blank.')
            .typeError('Budget Max should be an integer')
            .moreThan(budget_min, 'Budget Max be greater than Budget Min');
        }
      }),
  });
  const contacts = useSelector((state) => state.contacts.allContacts.data);

  const [lookingForData, setLookingForData] = useState();
  const [filtersCount, setFiltersCount] = useState(0);
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [propertiesSent, setPropertiesSent] = useState(false);
  const [sendMethod, setSendMethod] = useState(1);

  useEffect(() => {
    const contact = contacts.filter((c) => {
      return c.id == contactId;
    })[0];
    if (contact.phone_number !== null && contact.phone_number !== '' && sendMethod === 2) {
      setSelectedContacts([
        {
          value: contact.id,
          label: `${contact.first_name} ${contact.last_name} - ${contact.email}`,
          first_name: contact.first_name,
          last_name: contact.last_name,
          email: contact.email,
          phone_number: contact.phone_number,
          profile_image_path: contact.profile_image_path,
        },
      ]);
    } else if (sendMethod === 1 || sendMethod === 3) {
      setSelectedContacts([
        {
          value: contact.id,
          label: `${contact.first_name} ${contact.last_name} - ${contact.email}`,
          first_name: contact.first_name,
          last_name: contact.last_name,
          email: contact.email,
          phone_number: contact.phone_number,
          profile_image_path: contact.profile_image_path,
        },
      ]);
    } else {
      setSelectedContacts([]);
    }
  }, [contactId, contacts, sendMethod, propertiesSent]);

  function filterAndSortContacts(contacts, condition) {
    return contacts
      ?.filter(condition)
      .sort((a, b) => a.first_name.localeCompare(b.first_name))
      .map((contact) => ({
        value: contact.id,
        label: `${contact.first_name} ${contact.last_name} - ${contact.email}`,
        first_name: contact.first_name,
        last_name: contact.last_name,
        email: contact.email,
        phone_number: contact.phone_number,
        profile_image_path: contact.profile_image_path,
      }));
  }

  function isClientContact(contact) {
    //prettier-ignore
    return (
      contact.category_1 == 'Client' ||
      contact.category_1 == 'Professional' &&
      !(contact.import_source_text == 'Smart Sync A.I.' && contact.approved_ai === null)
    );
  }

  useEffect(() => {
    setFilteredContacts(
      sendMethod !== 2
        ? filterAndSortContacts(contacts, (contact) => contact.email && isClientContact(contact))
        : filterAndSortContacts(contacts, (contact) => contact.phone_number && isClientContact(contact)),
    );
  }, [contacts, sendMethod]);

  const getLookingFor = () => {
    return new Promise((resolve, reject) => {
      contactServices
        .getContactLookingProperties(contactId)
        .then((propertiesResponse) => {
          const propertiesData = propertiesResponse.data;
          setLookingForData(propertiesData.data);
          let newFiltersCount = 0;
          if (propertiesData.data[0]) {
            if (propertiesData.data[0].bathrooms_min || propertiesData.data[0].bathrooms_max) {
              newFiltersCount += 1;
            }
            if (
              propertiesData.data[0].bedrooms_min ||
              propertiesData.data[0].bedrooms_min === 0 ||
              propertiesData.data[0].bedrooms_max
            ) {
              newFiltersCount += 1;
            }
            if (propertiesData.data[0].budget_min || propertiesData.data[0].budget_max) {
              newFiltersCount += 1;
            }
            if (propertiesData.data[0].neighborhood_ids && !propertiesData.data[0].neighborhood_ids.includes(0) > 0) {
              newFiltersCount += 1;
            }
            if (propertiesData.data[0]?.general_tags?.length > 0) {
              propertiesData?.data[0]?.general_tags?.forEach((tag) => {
                newFiltersCount += 1;
              });
            }
            if (Number(propertiesData.data[0]?.looking_action) != getLookingAction()) {
              newFiltersCount += 1;
            }
          }
          setFiltersCount(newFiltersCount);
          resolve(propertiesData.data);
        })
        .catch((error) => {
          console.log(error, 'Err');
          toast.error('Error fetching looking for');
          reject(error);
        });
    });
  };

  // const lookingForData = useSelector((state) => state.clientDetails.lookingForData);

  //* FORMIK *//
  const [page, setPage] = useState(1);
  const [allPropertiesCount, setAllPropertiesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const [propertyInterests, setPropertyInterests] = useState();
  const [filterValue, setFilterValue] = useState('newest');
  const [userProperties, setUserProperties] = useState([]);
  const [loadingPropertyInterests, setLoadingPropertyInterests] = useState(true);
  const [open, setOpen] = useState(false);
  const [loadingEmails, setLoadingEmails] = useState(false);
  const [showProperties, setShowProperties] = useState(true);
  const [previewMode, setPreviewMode] = useState(false);
  const [isDeleting, setIsDeleting] = useState({ loading: false, id: undefined });
  const [propertiesLoading, setPropertiesLoading] = useState(true);
  const [propertiesOffset, setPropertiesOffset] = useState(0);
  const [propertiesHasNextPage, setPropertiesHasNextPage] = useState(true);
  const [error, setError] = useState();
  const isSelected = (option) => selectedContacts.some((selected) => selected.value === option.value);
  const allContacts = useSelector((state) => state.contacts.allContacts.data);
  const userInfo = useSelector((state) => state.global.userInfo);

  const sortedOptions = filteredContacts?.sort((a, b) => {
    const aIsSelected = isSelected(a);
    const bIsSelected = isSelected(b);

    if (aIsSelected && !bIsSelected) {
      return -1;
    } else if (!aIsSelected && bIsSelected) {
      return 1;
    }
    return 0;
  });
  const resetPropertySelection = () => {
    setSelectedContacts([]);
    setSelectedProperties([]);
  };
  const _sendEmail = () => {
    setLoadingEmails(true);
    addPropertiesInPortfolio(
      selectedContacts.map((contact) => contact.value),
      selectedProperties.map((property) => property.ID),
    ).then(async (res) => {
      setLoadingEmails(false);

      setLoading(false);

      if (res?.data.length === 0) {
        setPropertiesSent(true);
        resetPropertySelection();
        return;
      }
      const newArray = res.data.map((item) => ({
        portfolio_sharable_id: item.portfolio_sharable_id,
        contact_id: item.contact_id,
      }));
      const uniqueArray = newArray.filter(
        (item, index, array) =>
          index ===
          array.findIndex(
            (obj) => obj.portfolio_sharable_id === item.portfolio_sharable_id && obj.contact_id === item.contact_id,
          ),
      );

      uniqueArray.forEach((item) => {
        selectedContacts.forEach((c) => {
          if (c.value === parseInt(item.contact_id) && sendMethod !== 2) {
            sendEmail(
              [c.email],
              `${c.first_name}'s Portfolio: Ready for Review!`,
              render(
                <PortfolioEmailTemplate
                  agent_first_name={
                    userInfo && userInfo?.first_name?.length > 0 && userInfo?.last_name?.length > 0
                      ? `${userInfo?.first_name}`
                      : userInfo?.email
                  }
                  first_name={c?.first_name}
                  portfolioLink={`${getBaseUrl()}/portfolio?share_id=${item?.portfolio_sharable_id ?? ''}`}
                />,
                {
                  pretty: true,
                },
              ),
            ).then(async (res) => {
              const contact = allContacts.find((con) => con.id === c?.value);
              let activity = {
                type_of_activity_id: 28,
                description: `Properties Sent via Email: to ${c.first_name} - ${getBaseUrl()}/portfolio?share_id=${
                  item?.portfolio_sharable_id ?? ''
                }`,
              };
              const contactToBeUpdated = allContacts.find((c) => c.id == contactId);
              setPropertiesSent(true);
              resetPropertySelection();

              await addContactActivity(item.contact_id, activity)
                .then(() => {})
                .then(async () => {
                  if (!((sendMethod === 2 && c.phone_number) || (sendMethod === 3 && c.phone_number))) {
                    await updateContact(contactToBeUpdated.id, { last_communication_date: new Date() }).then(() => {
                      dispatch(updateContactLocally({ ...contactToBeUpdated, last_communication_date: new Date() }));
                      getPortfolioByContactId(contactId, 0, 'all').then((res) => {
                        setUserProperties(res?.data);
                      });
                    });
                  }
                });
            });
          }
          if (
            parseInt(c.value) === parseInt(item.contact_id) &&
            ((sendMethod === 2 && c.phone_number) || (sendMethod === 3 && c.phone_number))
          ) {
            sendSMS(
              [c.phone_number],
              `Hey ${c.first_name}, new properties have been added in your portfolio. View here: ${getBaseUrl()}/portfolio?share_id=${item?.portfolio_sharable_id ?? ''}.${generateSMSFooter(userInfo)}`,
            )
              .then(async (res) => {
                let activity = {
                  type_of_activity_id: 34,
                  description: `Properties Sent via SMS: to ${c.first_name} - ${getBaseUrl()}/portfolio?share_id=${
                    item?.portfolio_sharable_id ?? ''
                  }`,
                };

                const contact = allContacts.find((c) => c.id == contactId);
                setPropertiesSent(true);
                resetPropertySelection();

                await addContactActivity(contact?.id, activity).then(() => {
                  updateContact(contact.id, { last_communication_date: new Date() }).then(() => {
                    getPortfolioByContactId(contactId, 0, 'all').then((res) => {
                      setUserProperties(res?.data);
                    });
                    dispatch(updateContactLocally({ ...contact, last_communication_date: new Date() }));
                  });
                });
              })
              .catch((error) => {
                console.error('Error sending SMS:', error);
                // Handle the error if needed
              });
          }
        });
      });
    });
  };
  const getLookingAction = () => {
    const lowerCaseCategory = category.toLowerCase();
    if (lowerCaseCategory === 'buyer') {
      return 1;
    } else if (lowerCaseCategory === 'landlord') {
      return 22;
    } else if (lowerCaseCategory === 'seller') {
      return 19;
    } else {
      return 2;
    }
  };

  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      neighborhood_ids: '',
      looking_action: getLookingAction(),
      bedrooms: '',
      bathrooms: '',
      budget_min: '',
      budget_max: '',
    },
    validationSchema: LookingPropertySchema,
    onSubmit: (values) => {
      if (formik.isValid) {
        handleAddSubmit({
          neighborhood_ids: values.neighborhood_ids,
          looking_action: values?.looking_action ?? getLookingAction(),
          bedrooms_min: values.bedrooms,
          bedrooms_max: values.bedrooms,
          bathrooms_min: values.bathrooms,
          bathrooms_max: values.bathrooms,
          budget_min: values.budget_min === '' || values.budget_min === 0 ? null : Number(values.budget_min),
          budget_max: values.budget_max === '' || values.budget_max === 0 ? null : Number(values.budget_max),
        }).then(() => {
          toast.success('Property interests saved successfully!');
        });
      }
    },
  });

  const { resetForm } = formik;

  const handleAddSubmit = async (values) => {
    setLoadingButton(true);
    try {
      await contactServices.addContactLookingProperty(contactId, values);
      setLoadingButton(false);
      dispatch(setRefetchPart('looking-for'));
      resetForm();
    } catch (error) {
      console.log(error);
      setLoadingButton(false);
    }
  };

  const initializePropertyInterests = async () => {
    try {
      const lookingProperties = await getLookingFor();

      if (lookingProperties && lookingProperties[0]) {
        formik.setValues({
          neighborhood_ids: lookingProperties[0].neighborhood_ids,
          bedrooms: lookingProperties[0].bedrooms_min != 0 ? lookingProperties[0].bedrooms_min : '',
          bathrooms: lookingProperties[0].bathrooms_min != 0 ? lookingProperties[0].bathrooms_min : '',
          budget_min: lookingProperties[0].budget_min != 0 ? lookingProperties[0].budget_min : '',
          budget_max: lookingProperties[0].budget_max != 0 ? lookingProperties[0].budget_max : '',
        });
        fetchProperties(lookingProperties[0], page, filterValue);
      } else {
        fetchProperties(formik.values, page, filterValue);
      }
      setLoadingPropertyInterests(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProperties = async (values, page, filterValue) => {
    let filters = values;
    let params = {
      apikey: '4d7139716e6b4a72',
      callback: 'callback',
      limit: 21,
      page: page,
    };
    if (filters?.general_tags?.length > 0) {
      params['amenities'] = filters?.general_tags.join(',');
    }
    if (filterValue === 'newest') {
      params['sort'] = 'date';
      params['order'] = 'desc';
    }
    if (filterValue === 'oldest') {
      params['sort'] = 'date';
      params['order'] = 'asc';
    }
    if (filterValue === 'minPrice') {
      params['sort'] = 'price';
      params['order'] = 'asc';
    }
    if (filterValue === 'maxPrice') {
      params['sort'] = 'price';
      params['order'] = 'desc';
    }
    params['status'] = filters?.looking_action ?? getLookingAction();

    if (Array.isArray(filters?.neighborhood_ids) && !filters?.neighborhood_ids?.includes(0)) {
      params['neighborhood_id'] = filters?.neighborhood_ids?.join(',');
    }
    if (filters?.budget_min) params['priceMin'] = filters.budget_min;
    if (filters?.budget_max) params['priceMax'] = filters.budget_max;
    if (filters?.bedrooms_min || filters?.bedrooms_min === 0) {
      params['bedsMin'] = filters.bedrooms_min;
      if (filters?.bedrooms_min === 0) {
        params['bedsMax'] = 0;
      }
    }
    // if (filters?.bedrooms_max) {
    //   params['bedsMax'] = filters.bedrooms_max;
    // }

    if (filters?.bathrooms_min) {
      params['bathMin'] = filters.bathrooms_min;
    }
    if (filters?.bathrooms_max) {
      params['bathMax'] = filters.bathrooms_max;
    }
    const urlParams = new URLSearchParams({
      ...params,
    });

    const url = 'https://dataapi.realtymx.com/listings?' + urlParams.toString();
    const options = {
      timeout: 30000,
    };
    const data = await fetchJsonp(url, options)
      .then((res) => res.json())
      .then((data) => {
        setPropertyInterests(data.LISTINGS);
        setAllPropertiesCount(data.TOTAL_COUNT);
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
        setLoadingPropertyInterests(false);
        return data;
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  };

  const getFromNumber = () => {
    return (page - 1) * 21 + 1;
  };
  const getToNumber = () => {
    return Math.min(page * 21, allPropertiesCount);
  };

  useEffect(() => {
    resetForm();
  }, [router.pathname]);

  useEffect(() => {
    initializePropertyInterests();
  }, [category]);

  useEffect(() => {
    if (refetchPart == 'looking-for') {
      initializePropertyInterests();
      dispatch(setRefetchPart(null));
    }
  }, [refetchPart]);

  useLayoutEffect(() => {
    if (formik.isValid) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [formik]);

  const tabs = [
    { name: 'All', href: '#' },
    {
      name: 'Portfolio',
      href: '#',
      count: userProperties?.portfolio_count,
    },
    {
      name: 'Liked',
      href: '#',
      count: userProperties?.liked_count,
    },
    {
      name: 'Disliked',
      href: '#',
      count: userProperties?.disliked_count,
    },
  ];

  const [propertiesCurrentTab, setPropertiesCurrentTab] = useState(0);

  const status =
    propertiesCurrentTab === 1
      ? 'all'
      : propertiesCurrentTab === 2
        ? 'liked'
        : propertiesCurrentTab === 3
          ? 'disliked'
          : 'all';

  useEffect(() => {
    console.log(propertiesCurrentTab, 'propertiesCurrentTab');
  }, [propertiesCurrentTab]);

  useEffect(() => {
    const fetchProperties = () => {
      setPropertiesLoading(true);
      setPropertiesOffset(0);
      setPropertiesHasNextPage(true);
      getPortfolioByContactId(contactId, 0, status)
        .then((res) => {
          setUserProperties(res?.data);
          setPropertiesLoading(false);
          setPropertiesOffset(res?.data.count);
        })
        .catch(() => {
          toast.error('Error while loading items');
          setPropertiesLoading(false);
        });
    };

    fetchProperties();
  }, [propertiesCurrentTab]);

  const updateUserProperties = () => {
    let properties = [];
    if (propertiesCurrentTab === 2) {
      properties = userProperties?.properties?.filter((p) => p?.property_details !== undefined && p.status === 'liked');
    } else if (propertiesCurrentTab === 3) {
      properties = userProperties?.properties?.filter(
        (p) => p?.property_details !== undefined && p.status === 'disliked',
      );
    } else if (propertiesCurrentTab === 1) {
      properties = userProperties?.properties?.filter((p) => p?.property_details !== undefined);
    }
    return properties;
  };

  useEffect(() => {
    updateUserProperties();
  }, [propertiesCurrentTab, userProperties]);

  const _deletePropertyFromPortfolio = (deleteId, undoId) => {
    setIsDeleting({ loading: true, id: undoId });
    const propertyStatus = userProperties.properties.find((p) => p.id === deleteId).status;
    console.log(propertyStatus, 'property');
    deletePropertyFromPortfolio(deleteId)
      .then(() => {
        setIsDeleting({ loading: false, id: undoId });
        setUserProperties((prev) => {
          return {
            ...prev,
            properties: prev.properties.filter((p) => p.id !== deleteId),
            portfolio_count: propertyStatus === 'saved' ? prev.portfolio_count - 1 : prev.portfolio_count,
            disliked_count: propertyStatus === 'disliked' ? prev.disliked_count - 1 : prev.disliked_count,
            liked_count: propertyStatus === 'liked' ? prev.liked_count - 1 : prev.liked_count,
          };
        });
        const toastId = toast.custom(() => (
          <div
            className={`shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 bg-gray-700 text-gray-50`}>
            <div className="flex gap-2 p-4 word-break items-center">
              <CheckCircleIcon className={'text-green-500'} />
              <h1 className={'text-sm leading-5 font-medium'}>
                Property has been deleted <br />
                successfully!
              </h1>
            </div>
            <div className="flex rounded-tr-lg rounded-br-lg p-4 bg-gray-600 text-gray-100">
              <button
                onClick={() => {
                  addPropertiesInPortfolio([Number(contactId)], [Number(undoId)]).then(() => {
                    toast.remove(toastId);
                    const propertyToBeAdded = userProperties?.properties?.find((p) => p.id === deleteId);
                    const indexToBeAdded = userProperties?.properties?.findIndex((p) => p.id === deleteId);
                    setUserProperties((prev) => {
                      const updatedProperties = [...prev.properties];

                      if (indexToBeAdded !== -1 && propertyToBeAdded) {
                        updatedProperties.splice(indexToBeAdded, 0, propertyToBeAdded);
                      }

                      return {
                        ...prev,
                        properties: updatedProperties,
                        portfolio_count: propertyStatus === 'saved' ? prev.portfolio_count + 1 : prev.portfolio_count,
                        disliked_count: propertyStatus === 'disliked' ? prev.disliked_count + 1 : prev.disliked_count,
                        liked_count: propertyStatus === 'liked' ? prev.liked_count + 1 : prev.liked_count,
                      };
                    });
                  });
                }}
                className="w-full border border-transparent rounded-none rounded-r-lg flex items-center justify-center text-sm leading-5 font-medium font-medium">
                Undo
              </button>
            </div>
          </div>
        ));
      })
      .catch(() => {
        toast.error('Error while loading items');
        setLoading(false);
      });
  };

  const getPortfolio = (propertiesOffset) => {
    return getPortfolioByContactId(contactId, propertiesOffset, status)
      .then((response) => {
        return {
          propertiesHasNextPage: true,
          data: response.data,
          count: response.data.count,
        };
      })
      .catch((error) => {
        console.log(error);
        toast.error('Error fetching notes');
      });
  };

  async function loadMore() {
    try {
      const { data, count, propertiesHasNextPage: newNotesHasNextPage } = await getPortfolio(propertiesOffset);
      setUserProperties((current) => {
        return {
          ...current,
          properties: [...current.properties, ...data?.properties],
          count: count,
        };
      });

      setPropertiesOffset(propertiesOffset + count);
      setPropertiesHasNextPage(newNotesHasNextPage);
      if (count === 0) {
        setPropertiesHasNextPage(false);
      }
    } catch (err) {
      setError(err);
    } finally {
      setPropertiesLoading(false);
    }
  }

  const [infiniteRef] = useInfiniteScroll({
    loading: propertiesLoading,
    hasNextPage: propertiesHasNextPage,
    onLoadMore: loadMore,
    disabled: !!error,
  });

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setPropertiesSent(false);
        // setSelectedContacts([]);
      }, 500);
    }
  }, [open]);
  return (
    <>
      {showAddPopup && (
        <AddLookingForPopup
          action={getLookingAction()}
          contactId={contactId}
          title="Edit Property Interests"
          className="w-[580px]"
          handleClose={() => setShowAddPopup(false)}
        />
      )}
      {showEditPopup && (
        <EditLookingForPopup
          action={getLookingAction()}
          contactId={contactId}
          category_2={category}
          data={lookingForData[0]}
          title={lookingForData[0] ? 'Edit Property Interests' : 'Add Property Interests'}
          className="w-full md:w-[700px]"
          handleClose={() => setShowEditPopup(false)}
        />
      )}
      {loading ? (
        <div className="relative details-tabs-fixed-height bg-white">
          <PropertiesSkeleton cardsLength={12} />
        </div>
      ) : (
        <SimpleBar autoHide>
          <div className="bg-white relative scrollable-area" style={{ minHeight: 'calc(100vh - 158px)' }}>
            {loadingPropertyInterests || propertyInterests === undefined ? (
              <PropertiesSkeleton cardsLength={12} />
            ) : (
              <>
                <div className="">
                  <div className="flex justify-between items-center pt-[9px] pr-[9px] h-[47px]">
                    <div className="font-semibold text-gray8 text-[14px]">Properties</div>
                    <div className={'relative flex'}>
                      {propertiesCurrentTab === 0 && (
                        <Button leftIcon={<img src={filter.src}></img>} white onClick={() => setShowEditPopup(true)}>
                          Client Preferences
                        </Button>
                      )}
                      {filtersCount > 0 && (
                        <div
                          className={
                            'text-xs w-5 h-5 flex items-center justify-center absolute right-[-9px] top-[-9px] rounded-full bg-lightBlue3 text-white'
                          }>
                          {filtersCount}
                        </div>
                      )}
                    </div>
                  </div>
                  <TabsWithPills
                    propertiesCurrentTab={propertiesCurrentTab}
                    setPropertiesCurrentTab={setPropertiesCurrentTab}
                    className="py-4"
                    tabs={tabs}
                  />
                  {propertiesLoading ? (
                    <div className="relative details-tabs-fixed-height bg-white">
                      <PropertiesSkeleton cardsLength={12} />
                    </div>
                  ) : propertiesCurrentTab !== 0 && updateUserProperties()?.length === 0 ? (
                    <EmptyPortfolioClientDetails status={propertiesCurrentTab} />
                  ) : propertiesCurrentTab !== 0 ? (
                    <div className={'flex justify-center items-center flex-col'}>
                      <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {updateUserProperties()?.map((property, index) => (
                          <PropertyCard
                            noSelect
                            clientNote={property?.contact_notes}
                            key={index}
                            isPropertyDeleteing={isDeleting}
                            deletePropertyFromPortfolio={() =>
                              _deletePropertyFromPortfolio(property.id, property?.property_id)
                            }
                            property={property.property_details && property.property_details}
                          />
                        ))}
                      </div>
                      {/*<div>*/}
                      {propertiesHasNextPage && (
                        <div ref={infiniteRef}>
                          <SpinnerLoader />
                        </div>
                      )}
                      {/*</div>*/}
                    </div>
                  ) : (
                    <></>
                  )}
                  {propertiesCurrentTab === 0 && (
                    <div className={`${selectedProperties.length > 0 && 'pb-[80px]'}`}>
                      {propertyInterests && propertyInterests.length > 0 ? (
                        <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                          {propertyInterests.map((property, index) => (
                            <PropertyCard
                              setSelected={setSelectedProperties}
                              isSelected={selectedProperties.map((property) => property.ID).includes(property.ID)}
                              selected={selectedProperties}
                              key={index}
                              property={property}></PropertyCard>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center flex-col text-center mt-6">
                          <img src={lookingForEmpty.src} alt="" />
                          <div className="mt-6 text-sm">
                            <div className="text-gray-900 font-medium">No matched properties for this contact yet.</div>
                            <div className="text-gray-500 mt-[6px]">
                              Whenever we have property that matched these interests, they will be listed here.
                            </div>
                          </div>
                        </div>
                      )}
                      {allPropertiesCount > 21 && (
                        <nav
                          className="flex items-center justify-between bg-white py-3 pb-0 mt-5"
                          aria-label="Pagination">
                          <div className="hidden sm:block">
                            <p className="text-sm text-gray-700">
                              Showing{' '}
                              <span className="font-medium">
                                {getFromNumber()
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                              </span>
                              to{' '}
                              <span className="font-medium">
                                {getToNumber()
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                              </span>
                              of{' '}
                              <span className="font-medium">
                                {allPropertiesCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                              </span>{' '}
                              results
                            </p>
                          </div>
                          <div className="flex flex-1 justify-between sm:justify-end">
                            {getFromNumber() !== 1 && (
                              <a
                                href="#"
                                onClick={() => {
                                  fetchProperties(lookingForData[0], page - 1, filterValue).then(() =>
                                    setTimeout(() => {
                                      document.querySelector('.scrollable-area').scrollIntoView({
                                        behavior: 'smooth',
                                      });
                                    }, 200),
                                  );
                                  setPage(page - 1);
                                  setLoadingPropertyInterests(true);
                                }}
                                className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0">
                                Previous
                              </a>
                            )}
                            {getToNumber() !== allPropertiesCount && (
                              <a
                                href="#"
                                onClick={() => {
                                  fetchProperties(lookingForData[0], page + 1, filterValue).then(() =>
                                    setTimeout(() => {
                                      document.querySelector('.scrollable-area').scrollIntoView({
                                        behavior: 'smooth',
                                      });
                                    }, 200),
                                  );
                                  setPage(page + 1);
                                  setLoadingPropertyInterests(true);
                                }}
                                className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0">
                                Next
                              </a>
                            )}
                          </div>
                        </nav>
                      )}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          {selectedProperties.length > 0 && (
            <SendPropertiesFooter
              setSelectedProperties={setSelectedProperties}
              selectedProperties={selectedProperties}
              contactId={contactId}
              onSendEmailAndSmsClick={() => {
                setSendMethod(3);
                setOpen(true);
              }}
              onSendSmsClick={() => {
                setSendMethod(2);
                setOpen(true);
              }}
              onSendEmailClick={() => {
                setSendMethod(1);
                setOpen(true);
              }}
            />
          )}
          <PropertiesSlideOver
            setSelectedContacts={setSelectedContacts}
            setPropertiesSent={setPropertiesSent}
            open={open}
            setSelectedProperties={setSelectedProperties}
            setOpen={setOpen}
            selectedContacts={selectedContacts}
            filteredContacts={filteredContacts}
            selectedProperties={selectedProperties}
            loadingEmails={loadingEmails}
            _sendEmail={_sendEmail}
            showProperties={showProperties}
            setShowProperties={setShowProperties}
            previewMode={previewMode}
            setPreviewMode={setPreviewMode}
            sendMethod={sendMethod}
            sortedOptions={sortedOptions}
            propertiesSent={propertiesSent}
          />
        </SimpleBar>
      )}
    </>
  );
}
