import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow, useLoadScript, LoadScript } from '@react-google-maps/api';

const Map = () => {
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 37.7749, lng: -122.4194 });



  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    console.log(marker);
  };

  const handleMapClick = (event) => {
    const newMarker = {
      position: {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      },
      photos: [],
    };
    setMarkers([...markers, newMarker]);
  };

  const handleUploadPhoto = (markerIndex, photo) => {
    const updatedMarkers = [...markers];
    updatedMarkers[markerIndex].photos.push(photo);
    setMarkers(updatedMarkers);
  };

  useEffect(() => {
    const fetchInitialData = () => {
      // Load initial data for markers
    };

    fetchInitialData();
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyCjOvcmXD1qgw24zU4WxqwQMDRI9d2Ip6k">
    <GoogleMap
      mapContainerStyle={{ height: '900px', width: '100%' }}
      zoom={10}
      center={mapCenter}
      onClick={handleMapClick}
      apiKey="AIzaSyCjOvcmXD1qgw24zU4WxqwQMDRI9d2Ip6k"
    >
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={marker.position}
          onClick={() => handleMarkerClick(marker)}
        >
          {selectedMarker === marker && (
            <InfoWindow onCloseClick={() => setSelectedMarker(null)}>
              <form>
                <h3>Загрузите ваше фото</h3>
                {marker.photos.map((photo, photoIndex) => (
                  <img key={photoIndex} src={photo} alt="Place" />
                ))}
                <input
                  type="file"
                  onChange={(event) => {
                    const file = event.target.files[0];
                    const reader = new FileReader();
                    reader.onload = () => {
                      handleUploadPhoto(index, reader.result);
                    };
                    reader.readAsDataURL(file);
                  }}
                />
              </form>
            </InfoWindow>
          )}
        </Marker>
      ))}
    </GoogleMap>
    </LoadScript>
  );
};

export default Map;
