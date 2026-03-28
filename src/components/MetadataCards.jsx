import React from 'react';
import { Info, Image, Camera, Calendar, MapPin, Cpu } from 'lucide-react';
import { formatBytes, formatDate, decimalToDMS } from '../utils/formatters.js';

export function FileInfoCard({ file }) {
  if (!file) return null;
  return (
    <div className="cyber-card">
      <h2 className="card-title"><Info size={20} /> File Information</h2>
      <div className="data-grid">
        <div className="data-item"><span className="data-label">Name</span><span className="data-value">{file.name}</span></div>
        <div className="data-item"><span className="data-label">Size</span><span className="data-value">{formatBytes(file.size)}</span></div>
        <div className="data-item"><span className="data-label">Type</span><span className="data-value">{file.type || 'Unknown'}</span></div>
        <div className="data-item"><span className="data-label">Last Modified</span><span className="data-value">{formatDate(file.lastModified)}</span></div>
      </div>
    </div>
  );
}

export function ImageInfoCard({ exif }) {
  if (!exif) return null;
  const width = exif.ImageWidth || exif.ExifImageWidth || 'N/A';
  const height = exif.ImageHeight || exif.ExifImageHeight || 'N/A';
  return (
    <div className="cyber-card">
      <h2 className="card-title"><Image size={20} /> Image Information</h2>
      <div className="data-grid">
        <div className="data-item"><span className="data-label">Dimensions</span><span className="data-value">{width !== 'N/A' ? `${width}x${height}` : 'N/A'}</span></div>
        <div className="data-item"><span className="data-label">Color Space</span><span className="data-value">{exif.ColorSpace === 1 ? 'sRGB' : exif.ColorSpace || 'N/A'}</span></div>
        <div className="data-item"><span className="data-label">Orientation</span><span className="data-value">{exif.Orientation || 'Normal'}</span></div>
      </div>
    </div>
  );
}

export function CameraInfoCard({ exif }) {
  if (!exif || (!exif.Make && !exif.Model)) return null;
  return (
    <div className="cyber-card">
      <h2 className="card-title"><Camera size={20} /> Device & Camera Information</h2>
      <div className="data-grid">
        <div className="data-item"><span className="data-label">Make</span><span className="data-value">{exif.Make || 'N/A'}</span></div>
        <div className="data-item"><span className="data-label">Model</span><span className="data-value">{exif.Model || 'N/A'}</span></div>
        <div className="data-item"><span className="data-label">Software</span><span className="data-value">{exif.Software || 'N/A'}</span></div>
        <div className="data-item"><span className="data-label">Lens Model</span><span className="data-value">{exif.LensModel || 'N/A'}</span></div>
        <div className="data-item"><span className="data-label">F-Number</span><span className="data-value">{exif.FNumber ? `f/${exif.FNumber}` : 'N/A'}</span></div>
        <div className="data-item"><span className="data-label">ISO</span><span className="data-value">{exif.ISO || 'N/A'}</span></div>
        <div className="data-item"><span className="data-label">Exposure Time</span><span className="data-value">{exif.ExposureTime ? `${exif.ExposureTime}s` : 'N/A'}</span></div>
        <div className="data-item"><span className="data-label">Focal Length</span><span className="data-value">{exif.FocalLength ? `${exif.FocalLength}mm` : 'N/A'}</span></div>
        <div className="data-item"><span className="data-label">Flash</span><span className="data-value">{exif.Flash !== undefined ? exif.Flash : 'N/A'}</span></div>
        <div className="data-item"><span className="data-label">White Balance</span><span className="data-value">{exif.WhiteBalance !== undefined ? exif.WhiteBalance : 'N/A'}</span></div>
      </div>
    </div>
  );
}

export function DateInfoCard({ exif }) {
  const dt = exif?.DateTimeOriginal || exif?.ModifyDate || exif?.CreateDate;
  if (!dt) return null;
  return (
    <div className="cyber-card">
      <h2 className="card-title"><Calendar size={20} /> Capture Timeline</h2>
      <div className="data-grid">
        <div className="data-item"><span className="data-label">Date Taken (Original)</span><span className="data-value">{formatDate(dt)}</span></div>
        <div className="data-item"><span className="data-label">Date Digitized</span><span className="data-value">{formatDate(exif.DateTimeDigitized) || 'N/A'}</span></div>
      </div>
    </div>
  );
}

export function GPSCard({ gps, locationDetails }) {
  if (!gps) {
    return (
      <div className="cyber-card">
        <h2 className="card-title"><MapPin size={20} color="var(--text-muted)" /> Location EXIF</h2>
        <p style={{ color: 'var(--text-muted)' }}>No GPS metadata found in this image.</p>
      </div>
    );
  }

  return (
    <div className="cyber-card">
      <h2 className="card-title"><MapPin size={20} color="var(--neon-green)" /> Location Coordinates</h2>
      <div className="data-grid" style={{ marginBottom: '1rem' }}>
        <div className="data-item">
          <span className="data-label">Latitude (Decimal)</span>
          <span className="data-value">{gps.latitude.toFixed(6)}</span>
        </div>
        <div className="data-item">
          <span className="data-label">Longitude (Decimal)</span>
          <span className="data-value">{gps.longitude.toFixed(6)}</span>
        </div>
        <div className="data-item">
          <span className="data-label">Latitude (DMS)</span>
          <span className="data-value">{decimalToDMS(gps.latitude, true)}</span>
        </div>
        <div className="data-item">
          <span className="data-label">Longitude (DMS)</span>
          <span className="data-value">{decimalToDMS(gps.longitude, false)}</span>
        </div>
        <div className="data-item">
          <span className="data-label">Altitude</span>
          <span className="data-value">{gps.altitude ? `${gps.altitude.toFixed(2)} m` : 'N/A'}</span>
        </div>
      </div>
      
      {locationDetails && locationDetails.address && (
        <>
          <h3 className="card-subtitle">Reverse Geocoding OSINT</h3>
          <div className="data-grid">
            <div className="data-item"><span className="data-label">Country</span><span className="data-value">{locationDetails.address.country || 'N/A'}</span></div>
            <div className="data-item"><span className="data-label">State/Province</span><span className="data-value">{locationDetails.address.state || 'N/A'}</span></div>
            <div className="data-item"><span className="data-label">City/Town</span><span className="data-value">{locationDetails.address.city || locationDetails.address.town || locationDetails.address.village || 'N/A'}</span></div>
            <div className="data-item"><span className="data-label">Road/Area</span><span className="data-value">{locationDetails.address.road || locationDetails.address.suburb || 'N/A'}</span></div>
          </div>
          <p style={{ marginTop: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            <strong>Full Address:</strong> {locationDetails.display_name}
          </p>
        </>
      )}

      <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
        <button className="cyber-btn" onClick={() => navigator.clipboard.writeText(`${gps.latitude},${gps.longitude}`)}>
          <Cpu  size={14} /> Copy Coords
        </button>
        <a 
          href={`https://www.google.com/maps?q=${gps.latitude},${gps.longitude}`} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <button className="cyber-btn success">
            <MapPin size={14} /> Open Maps
          </button>
        </a>
      </div>
    </div>
  );
}
