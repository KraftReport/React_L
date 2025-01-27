import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'; 
import 'leaflet/dist/leaflet.css'; 
import React, { useState, useEffect } from 'react';
import { LocationEvent } from 'leaflet';
import axios from 'axios';
import { useTokenContext } from '../share/TokenContext';
import { useHistory } from 'react-router';

const LeafletMap: React.FC = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const {token,setToken} = useTokenContext()
  const router = useHistory()
 
  const checkIn = async () : Promise<void> =>{
    
    if (position === null) {
      console.error('Position is null. Unable to check in.');
      return;
    }
  

    const response =await axios.post('http://localhost:8080/api/check-in',
      {'latitude':position[0] ,'longitude' : position[1]},
      
      {headers : {'Content-Type' : 'multipart/form-data' , Authorization : token} }
    )
 
    if(response){
      router.push("/dash")
    }

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
          <button onClick={checkIn}>Check in</button>
        <MapContainer className='leafLetMapContainer' center={position} zoom={13} scrollWheelZoom={true} style={{ height: "500px", width: "100%" }}>
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
