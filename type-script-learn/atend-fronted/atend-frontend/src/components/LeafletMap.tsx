import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  onLocationSelect: (lat: number, lng: number) => void;
}

const LeafletMap: React.FC<MapProps> = ({ onLocationSelect }) => {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);
  const [zoomLevel, setZoomLevel] = useState(15); // Default closer zoom level

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
      click: (e) => {
        const { lat, lng } = e.latlng;
        setPosition({ lat, lng });
        onLocationSelect(lat, lng);
      },
    });

    return position ? <Marker position={position} icon={customIcon} /> : null;
  };

  const MapCenterUpdater = () => {
    const map = useMap();
    useEffect(() => {
      if (mapCenter) {
        map.setView(mapCenter, zoomLevel); // Update map center and zoom
      }
    }, [mapCenter, zoomLevel, map]);
    return null;
  };

  useEffect(() => {
    const watchId =  navigator.geolocation.watchPosition(
      (location) => {
        const { latitude, longitude } = location.coords;
        const currentLocation = { lat: latitude, lng: longitude };
        setMapCenter([latitude, longitude]);
        setPosition(currentLocation); // Mark current location
        console.log('Current Location:', currentLocation);
      },
      (error) => {
        console.error("Error getting geolocation", error);
      },
      // { enableHighAccuracy: true }
    );

    return navigator.geolocation.clearWatch(watchId)
  }, []);

  return (
    <>
      {mapCenter ? (
        <MapContainer
          center={mapCenter}
          zoom={zoomLevel}
          style={{ height: '500px', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapCenterUpdater />
          <LocationMarker />
      
          {position && <Marker position={position} icon={customIcon} />}
        </MapContainer>
      ) : (
        <div>Loading map...</div> // Loader while getting location
      )}
    </>
  );
};

export default LeafletMap;
