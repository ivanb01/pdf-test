import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getPortfolioByShareId } from '@api/portfolio';
import Loader from '@components/shared/loader';
import { Header } from '@components/public/Header';
import SimpleBar from 'simplebar-react';
import TabsWithPills from '@components/shared/tabs/tabsWithPills';
import toast from 'react-hot-toast';
import PropertyCard from '@components/property-card';
import PortfolioPopup from '@components/PropertyDetailsModal/property-details-modal';

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
    { name: 'All', href: '#' },
    {
      name: 'Liked',
      href: '#',
      count: userProperties?.properties?.filter((property) => property.status === 'liked').length,
    },
    {
      name: 'Disliked',
      href: '#',
      count: userProperties?.properties?.filter((property) => property.status === 'disliked').length,
    },
  ];
  const updateUserProperties = () => {
    let properties = [];
    if (propertiesCurrentTab === 1) {
      properties = userProperties?.properties?.filter((p) => p.status === 'liked');
    } else if (propertiesCurrentTab === 2) {
      properties = userProperties?.properties?.filter((p) => p.status === 'disliked');
    } else {
      properties = userProperties?.properties?.filter((p) => p.status === 'saved');
    }
    return properties;
  };
  useEffect(() => {
    updateUserProperties();
  }, [propertiesCurrentTab, userProperties]);

  const openPropertyModal = (property) => {
    setOpenViewPropertyModal(true);
    setSelectedProperty(property);
  };
  const getNextItem = (property) => {
    const index = userProperties?.properties.findIndex((element) => element?.property_details?.ID === property?.ID);
    if (index < 0 || index >= userProperties?.properties.length - 1) {
      setSelectedProperty(userProperties?.properties[0]?.property_details);
      return;
    }
    setSelectedProperty(userProperties?.properties[index + 1]?.property_details);
  };
  const getPrevItem = (property) => {
    const index = userProperties?.properties.findIndex((element) => element?.property_details?.ID === property?.ID);
    if (index <= 0 || index >= userProperties?.properties.length) {
      setSelectedProperty(userProperties?.properties[userProperties?.properties.length - 1]?.property_details);
      return;
    }
    setSelectedProperty(userProperties?.properties[index - 1]?.property_details);
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {updateUserProperties().map((property, index) => (
            <PropertyCard
              putFeedback
              noSelect
              key={index}
              openPropertyModal={(property) => {
                openPropertyModal(property);
              }}
              property={property.property_details && property.property_details}
            />
          ))}
        </div>
      </SimpleBar>
      {openViewPropertyModal && (
        <PortfolioPopup
          propertyIndex={userProperties?.properties.findIndex(
            (element) => element?.property_details?.ID === selectedProperty?.ID,
          )}
          onNextClick={(property) => getNextItem(property)}
          onPrevClick={(property) => getPrevItem(property)}
          totalNumberOfProperties={userProperties?.count}
          property={selectedProperty}
          handleCloseOverlay={() => setOpenViewPropertyModal(false)}
        />
      )}
    </>
  );
};
export default Portfolio;
