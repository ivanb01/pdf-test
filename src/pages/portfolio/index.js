import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getPortfolioByShareId, putClientFeedback } from '@api/portfolio';
import Loader from '@components/shared/loader';
import { Header } from '@components/public/Header';
import SimpleBar from 'simplebar-react';
import TabsWithPills from '@components/shared/tabs/tabsWithPills';
import toast from 'react-hot-toast';
import PropertyCard from '@components/property-card';
import PortfolioPopup from '@components/Portfolio/property-details-modal';
import EmptyPortfolioState from '@components/Portfolio/empty-portfolio-state';

const Portfolio = () => {
  const router = useRouter();
  const { share_id } = router.query;
  const [loading, setLoading] = useState(true);
  const [userProperties, setUserProperties] = useState([]);
  const [propertiesCurrentTab, setPropertiesCurrentTab] = useState(0);
  const [openViewPropertyModal, setOpenViewPropertyModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  useEffect(() => {
    if (share_id) {
      getPortfolioByShareId(share_id)
        .then((res) => {
          setUserProperties(res?.data);
          setLoading(false);
        })
        .catch(() => {
          toast.error('Error while loading items');
          setLoading(false);
        });
    }
  }, [share_id]);

  const tabs = [
    {
      name: 'To review',
      href: '#',
      count: userProperties?.properties?.filter(
        (property) => property.property_details !== undefined && property.status === 'saved',
      ).length,
    },
    {
      name: 'Liked',
      href: '#',
      count: userProperties?.properties?.filter(
        (property) => property.property_details !== undefined && property.status === 'liked',
      ).length,
    },
    {
      name: 'Disliked',
      href: '#',
      count: userProperties?.properties?.filter(
        (property) => (property.property_details !== undefined && property.status) === 'disliked',
      ).length,
    },
  ];
  const updateUserProperties = () => {
    let properties = [];
    if (propertiesCurrentTab === 1) {
      properties = userProperties?.properties?.filter((p) => p?.property_details !== undefined && p.status === 'liked');
    } else if (propertiesCurrentTab === 2) {
      properties = userProperties?.properties?.filter(
        (p) => p?.property_details !== undefined && p.status === 'disliked',
      );
    } else {
      properties = userProperties?.properties?.filter((p) => p?.property_details !== undefined && p.status === 'saved');
    }
    return properties;
  };
  const addClientFeedback = (share_id, id, status, note) => {
    putClientFeedback(share_id, status, note).catch((e) => toast.error('Something went wrong, please refresh'));
    const index = userProperties.properties.findIndex((element) => element?.property_details?.ID === id);
    setUserProperties((prev) => {
      prev.properties[index].status = status;
      prev.properties[index].agent_notes = note;
      return {
        ...prev,
        properties: [...prev.properties],
      };
    });
  };
  useEffect(() => {
    updateUserProperties();
  }, [propertiesCurrentTab, userProperties]);

  const openPropertyModal = (property) => {
    setOpenViewPropertyModal(true);
    setSelectedProperty(property);
  };
  const getNextItem = (property) => {
    const index = updateUserProperties()?.findIndex((element) => element?.property_details?.ID === property?.ID);
    if (index < 0 || index >= updateUserProperties().length - 1) {
      setSelectedProperty(updateUserProperties()[0]);
      return;
    }
    setSelectedProperty(updateUserProperties()[index + 1]);
  };
  const getPrevItem = (property) => {
    const index = updateUserProperties().findIndex((element) => element?.property_details?.ID === property?.ID);
    if (index <= 0 || index >= updateUserProperties().length) {
      setSelectedProperty(updateUserProperties()[updateUserProperties().length - 1]);
      return;
    }
    setSelectedProperty(updateUserProperties()[index - 1]);
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <Header />
      <SimpleBar style={{ height: 'calc(100dvh - 74px)', padding: '25px' }}>
        <h1 className={'text-2xl leading-8 font-bold text-gray7'}>
          {userProperties.first_name} {userProperties.last_name}’s Property Suggestions
        </h1>
        <div className={'my-[6px]'}>
          <TabsWithPills
            propertiesCurrentTab={propertiesCurrentTab}
            setPropertiesCurrentTab={setPropertiesCurrentTab}
            className="py-4"
            tabs={tabs}
          />
        </div>

        {updateUserProperties().length === 0 ? (
          <EmptyPortfolioState status={propertiesCurrentTab} />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-6">
            {updateUserProperties().map((property, index) => (
              <PropertyCard
                putFeedback
                noSelect
                key={index}
                openPropertyModal={() => {
                  openPropertyModal(property);
                }}
                addClientFeedback={(id, status, note) =>
                  addClientFeedback(property?.property_sharable_id, id, status, note)
                }
                propertyStatus={property?.status}
                property={property.property_details && property.property_details}
              />
            ))}
          </div>
        )}
      </SimpleBar>
      {openViewPropertyModal && (
        <PortfolioPopup
          propertyIndex={updateUserProperties()?.findIndex(
            (element) => element?.property_details?.ID === selectedProperty?.property_details?.ID,
          )}
          note={selectedProperty?.agent_notes}
          status={selectedProperty?.status}
          onNextClick={(property) => getNextItem(property && property)}
          onPrevClick={(property) => getPrevItem(property && property)}
          totalNumberOfProperties={updateUserProperties().map((p) => p.property_details !== undefined).length}
          property={selectedProperty?.property_details}
          addClientFeedback={(id, status, note) =>
            addClientFeedback(selectedProperty.property_sharable_id, id, status, note)
          }
          handleCloseOverlay={() => setOpenViewPropertyModal(false)}
        />
      )}
    </>
  );
};

export default Portfolio;
