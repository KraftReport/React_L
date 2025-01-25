import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'; 
import 'leaflet/dist/leaflet.css'; 
import React, { useState, useEffect } from 'react';
import { LocationEvent } from 'leaflet';

const LeafletMap: React.FC = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);
 
  const checkIn = async () : Promise<void> =>{

  }


  useEffect(() => { 
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
        },
        (err) => {
          console.error("Geolocation error:", err);
        }
      );
    }  
  }, []);

  return (
    <div>
      {position ? (
        <div>
          <button onClick={}>Check in</button>
        <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{ height: "500px", width: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              You are here  
            </Popup>
          </Marker> 
        </MapContainer>
        </div>
      ) : (
        <p>Fetching your location...</p>
      )}
    </div>
  );
};

export default LeafletMap;
