import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import { useMemo } from 'react';

const PropertyLocation = ({ data }) => {
  const center = useMemo(() => ({ lat: data.LATITUDE, lng: data.LONGITUDE }), [data.LATITUDE, data.LONGITUDE]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDANJRHsYVmytQVpYGdPYsEKAivfzIHlwo',
  });

  return (
    <>
      <div className="text-gray7 text-xl font-medium">Property Location</div>
      <div className="text-gray5 my-2">{data.ADDRESS}</div>
      <div className="" id="map-section">
        {isLoaded && (
          <GoogleMap mapContainerClassName="map-container" center={center} zoom={15}>
            <MarkerF
              key="marker_1"
              position={{
                lat: data.LATITUDE,
                lng: data.LONGITUDE,
              }}
            />
          </GoogleMap>
        )}
      </div>
    </>
  );
};

export default PropertyLocation;
