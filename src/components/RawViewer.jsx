import React, { useState } from 'react';
import { Terminal, Copy, Download, Database } from 'lucide-react';

export default function RawViewer({ exif, gps, fileDetails }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  if (!exif) return null;

  const jsonString = JSON.stringify(exif, null, 2);
  
  // Basic filtering for lines
  const filteredLines = jsonString
    .split('\n')
    .filter(line => line.toLowerCase().includes(searchTerm.toLowerCase()))
    .join('\n');

  const highlightJSON = (text) => {
    return text.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'color: var(--neon-yellow)'; // number/boolean
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'color: var(--neon-cyan)'; // key
            } else {
                cls = 'color: var(--neon-green)'; // string
            }
        }
        return `<span style="${cls}">${match}</span>`;
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'metadata-export.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Safe extract helpers for the Critical Table
  const val = (v) => v ? v : <span style={{ color: 'var(--text-muted)' }}>NULL</span>;

  return (
    <div className="cyber-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* High Value Targets Data Table */}
      <div>
        <h2 className="card-title" style={{ margin: 0, marginBottom: '1rem', color: '#fff' }}>
          <Database size={20} color="var(--neon-green)" /> Extracted High-Value Datapoints
        </h2>
        <div style={{
          background: 'rgba(0,0,0,0.5)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontFamily: 'monospace', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: 'rgba(6, 182, 212, 0.15)', color: 'var(--neon-cyan)' }}>
                <th style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--border-color)' }}>DATAPOINT</th>
                <th style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--border-color)' }}>EXTRACTED VALUE</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'var(--text-muted)' }}>FILE.NAME</td>
                <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'var(--neon-green)' }}>{val(fileDetails?.name)}</td>
              </tr>
              <tr>
                <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'var(--text-muted)' }}>TIMESTAMP.ORIGINAL</td>
                <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'var(--neon-green)' }}>{val(exif?.DateTimeOriginal || exif?.ModifyDate)}</td>
              </tr>
              <tr>
                <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'var(--text-muted)' }}>DEVICE.HARDWARE</td>
                <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'var(--neon-green)' }}>{val((exif?.Make ? exif.Make + ' ' : '') + (exif?.Model || ''))}</td>
              </tr>
              <tr>
                <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'var(--text-muted)' }}>DEVICE.SOFTWARE</td>
                <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'var(--neon-green)' }}>{val(exif?.Software)}</td>
              </tr>
              <tr>
                <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'var(--text-muted)' }}>GPS.LATITUDE</td>
                <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'var(--neon-red)' }}>{val(gps?.latitude)}</td>
              </tr>
              <tr>
                <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>GPS.LONGITUDE</td>
                <td style={{ padding: '0.75rem 1rem', color: 'var(--neon-red)' }}>{val(gps?.longitude)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.05)' }} />

      {/* Raw Dump Section */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 className="card-title" style={{ margin: 0 }}><Terminal size={20} /> Raw EXIF Datastream</h2>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input 
              type="text" 
              placeholder="Grep payload..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ 
                background: 'rgba(0,0,0,0.5)', 
                border: '1px solid var(--border-color)', 
                color: 'var(--text-main)', 
                padding: '0.25rem 0.5rem', 
                borderRadius: '4px',
                outline: 'none',
                fontFamily: 'monospace'
              }}
            />
            <button className="cyber-btn" onClick={handleCopy} title="Copy Raw JSON"><Copy size={16}/></button>
            <button className="cyber-btn" onClick={handleDownload} title="Download JSON Config"><Download size={16}/></button>
          </div>
        </div>
        <div 
          className="raw-viewer"
          dangerouslySetInnerHTML={{ __html: highlightJSON(searchTerm ? filteredLines : jsonString) }}
        />
      </div>
    </div>
  );
}
