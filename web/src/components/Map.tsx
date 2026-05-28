'use client';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

// Fix for default marker icons in Leaflet with Next.js
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface Barrier {
  id: string;
  type: string;
  lat: number;
  lng: number;
  description: string;
  status: string;
}

interface MapProps {
  onMapClick: (lat: number, lng: number) => void;
}

function LocationMarker({ lat, lng }: { lat: number, lng: number }) {
  useMapEvents({
    click(e) {
      console.log('Map clicked at', e.latlng);
    },
  });
  return <Marker position={[lat, lng]} />;
}

export default function AccessibilityMap({ onMapClick }: MapProps) {
  const [barriers, setBarriers] = useState<Barrier[]>([]);
  const [selectedPos, setSelectedPos] = useState<[number, number] | null>(null);

  useEffect(() => {
    const fetchBarriers = async () => {
      try {
        // Using localhost:3000 as default API port
        const res = await axios.get('/api/barriers?lat=32.5147&lng=-117.0382&radius=10000');
        setBarriers(res.data);
      } catch (err) {
        console.error('Error fetching barriers:', err);
      }
    };
    fetchBarriers();
  }, []);

  function MapEvents() {
    useMapEvents({
      click(e) {
        setSelectedPos([e.latlng.lat, e.latlng.lng]);
        onMapClick(e.latlng.lat, e.latlng.lng);
      },
    });
    return null;
  }

  return (
    <MapContainer 
      center={[32.5147, -117.0382]} 
      zoom={13} 
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapEvents />
      {barriers.map((barrier) => (
        <Marker key={barrier.id} position={[barrier.lat, barrier.lng]}>
          <Popup>
            <div className="p-2">
              <h3 className="font-bold text-red-600">{barrier.type}</h3>
              <p className="text-sm">{barrier.description}</p>
              <span className="text-xs bg-gray-200 px-1 rounded">{barrier.status}</span>
            </div>
          </Popup>
        </Marker>
      ))}
      {selectedPos && (
        <Marker position={selectedPos} />
      )}
    </MapContainer>
  );
}
