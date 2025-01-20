import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

 
interface MapProps{
    onLocationSelect: (lat :number ,lng :number) => void
}

const LeafletMap : React.FC<MapProps> = ({onLocationSelect}) => {
    const [position,setPosition] = useState<{lat : number; lng :number} | null>(null)
    const [mapCenter, setMapCenter] = useState<[number, number]>([51.505, -0.09]); 

    const customIcon = new L.Icon({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        iconSize: [25, 41], // Size of the icon
        iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
        popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor
        shadowSize: [41, 41], // Size of the shadow
      });

      const LocationMarker = () => {
        useMapEvents({
            click:(e) =>{
                const {lat,lng} = e.latlng;
                setPosition({lat,lng})
                onLocationSelect(lat,lng)
            }
        })

        return position ? <Marker position={position} icon={customIcon}/> : null
      }

      useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (location) => {
                const {latitude,longitude} = location.coords
                setMapCenter([latitude,longitude])
            }
        )
        
                // const response = await fetch("http://ip-api.com/json/");
                // const data = await response.json();
                // setMapCenter([data.lat, data.lon]);
   
     
      }, []);

      return (
        <>
          <MapContainer
            center={mapCenter} // Set map center dynamically
            zoom={13}
            style={{ height: "500px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker />
          </MapContainer>
        </>
      );
    };
    


// const LeafletMap: React.FC<MapProps> = ({ onLocationSelect }) => {
//   const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);

//   // Define custom marker icon


  // Component for handling user clicks on the map
//   const LocationMarker = () => {
//     useMapEvents({
//       click: (e) => {
//         const { lat, lng } = e.latlng;
//         setPosition({ lat, lng });
//         onLocationSelect(lat, lng);
//       },
//     });

//     return position ? <Marker position={position} icon={customIcon} /> : null;
//   };

//   return (
//     <MapContainer
//       center={[51.505, -0.09]} // Default center [latitude, longitude]
//       zoom={13} // Default zoom level
//       style={{ height: '500px', width: '100%' }} // Map size
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       <LocationMarker />
//     </MapContainer>
//   );
// };

export default LeafletMap;
