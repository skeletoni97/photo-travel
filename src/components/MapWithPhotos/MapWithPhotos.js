// import React, { useState, useEffect } from 'react';
// import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

// const MapWithPhotos = () => {
//   const [markers, setMarkers] = useState([]);
//   const [selectedMarker, setSelectedMarker] = useState(null);
//   const [mapCenter, setMapCenter] = useState({ lat: 37.7749, lng: -122.4194 });

//   const handleMarkerClick = (marker) => {
//     setSelectedMarker(marker);
//     console.log("mdsf");
//   };

//   const handleMapClick = (event) => {
//     const newMarker = {
//       position: {
//         lat: event.latLng.lat(),
//         lng: event.latLng.lng(),
//       },
//       photos: [],
//     };
//     setMarkers([...markers, newMarker]);
//   };

//   const handleUploadPhoto = (markerIndex, photo) => {
//     const updatedMarkers = [...markers];
//     updatedMarkers[markerIndex].photos.push(photo);
//     setMarkers(updatedMarkers);
//   };

//   const WrappedMap = withScriptjs(withGoogleMap(props => (
//     <GoogleMap
//       defaultZoom={10}
//       defaultCenter={mapCenter}
//       center={mapCenter}
//       onClick={handleMapClick}
//     >
//       {markers.map((marker, index) => (
//         <Marker
//           key={index}
//           position={marker.position}
//           onClick={() => handleMarkerClick(marker)}
//         >
//           {selectedMarker === marker && (
//             <InfoWindow onCloseClick={() => setSelectedMarker(null)}>
//               <div>
//                 <h3>Photos for this place</h3>
//                 {marker.photos.map((photo, photoIndex) => (
//                   <img key={photoIndex} src={photo} alt="Place" />
//                 ))}
//                 <input
//                   type="file"
//                   onChange={(event) => {
//                     const file = event.target.files[0];
//                     const reader = new FileReader();
//                     reader.onload = () => {
//                       handleUploadPhoto(index, reader.result);
//                     };
//                     reader.readAsDataURL(file);
//                   }}
//                 />
//               </div>
//             </InfoWindow>
//           )}
//         </Marker>
//       ))}
//     </GoogleMap>
//   )));

//   useEffect(() => {
//     const fetchInitialData = () => {
//       // Load initial data for markers
//     };

//     fetchInitialData();
//   }, []);

//   return (
//     <WrappedMap
//       googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyCjOvcmXD1qgw24zU4WxqwQMDRI9d2Ip6k&v=3.exp&libraries=geometry,drawing,places`}
//       loadingElement={<div style={{ height: '100%' }} />}
//       containerElement={<div style={{ height: '900px', width: '100%' }} />}
//       mapElement={<div style={{ height: '100%' }} />}
//     />
//   );
// };

// export default MapWithPhotos;
