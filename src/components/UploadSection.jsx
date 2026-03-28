import React, { useRef, useState } from 'react';
import { UploadCloud } from 'lucide-react';

export default function UploadSection({ onFileSelect }) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div
      className={`upload-zone ${dragActive ? 'drag-active' : ''}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => inputRef.current.click()}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden-input"
        accept="image/jpeg, image/png, image/heic, image/webp"
        onChange={handleChange}
      />
      <UploadCloud className="upload-icon" />
      <h3 style={{ color: 'var(--text-main)', fontSize: '1.25rem', marginBottom: '0.5rem' }}>
        Drag & Drop an image here
      </h3>
      <p style={{ color: 'var(--text-muted)' }}>
        Supports JPG, PNG, WEBP, and HEIC
      </p>
      <div style={{ marginTop: '1.5rem' }}>
        <button className="cyber-btn" onClick={(e) => { e.stopPropagation(); inputRef.current.click(); }}>
          Browse Files
        </button>
      </div>
    </div>
  );
}
