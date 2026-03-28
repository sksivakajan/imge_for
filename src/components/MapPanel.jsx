import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Map as MapIcon } from 'lucide-react';

// Fix Leaflet's default icon path issues with Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function MapRecenter({ lat, lon }) {
  const map = useMap();
  useEffect(() => {
    if (lat && lon) {
      map.setView([lat, lon], 14);
    }
  }, [lat, lon, map]);
  return null;
}

export default function MapPanel({ gps, locationDetails }) {
  const [mapRendered, setMapRendered] = useState(false);

  useEffect(() => {
    // delay render slightly to ensure CSS loads and fixes sizing
    setTimeout(() => setMapRendered(true), 100);
  }, []);

  if (!gps || !gps.latitude) {
    return (
      <div className="cyber-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '400px' }}>
        <MapIcon size={48} color="var(--text-muted)" style={{ marginBottom: '1rem' }} />
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', fontWeight: '500' }}>No GPS location found in this image</p>
      </div>
    );
  }

  const position = [gps.latitude, gps.longitude];

  return (
    <div className="cyber-card" style={{ padding: '0', overflow: 'hidden', height: '100%', minHeight: '450px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '1rem 1.5rem', background: 'var(--panel-bg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', zIndex: 10 }}>
        <h2 className="card-title" style={{ margin: 0 }}><MapIcon size={20} /> Geographic Map Analysis</h2>
        <span className="badge badge-risk-LOW" style={{ border: '1px solid var(--neon-cyan)', color: 'var(--neon-cyan)', background: 'transparent' }}>
          {gps.latitude.toFixed(5)}, {gps.longitude.toFixed(5)}
        </span>
      </div>
      <div className="map-container" style={{ margin: 0, border: 'none', borderRadius: '0', flexGrow: 1, position: 'relative' }}>
        {mapRendered && (
          <MapContainer center={position} zoom={15} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                <strong style={{ color: 'var(--bg-color)', fontFamily: 'monospace' }}>Extracted Location Hit</strong><br/>
                Lat: {gps.latitude}<br/>
                Lon: {gps.longitude}<br/>
                {locationDetails?.address?.city && `City: ${locationDetails.address.city}`}
              </Popup>
            </Marker>
            <MapRecenter lat={gps.latitude} lon={gps.longitude} />
          </MapContainer>
        )}
        
        <a 
          href={`https://www.google.com/maps?q=${gps.latitude},${gps.longitude}`} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', zIndex: 1000 }}
        >
          <button className="cyber-btn success" style={{ background: 'rgba(3, 7, 18, 0.8)' }}>
             <MapIcon size={14} /> Open in Google Maps
          </button>
        </a>
      </div>
    </div>
  );
}
