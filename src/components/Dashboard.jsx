import React, { useRef } from 'react';
import MatrixBackground from './MatrixBackground';
import './Dashboard.css';
import HeroSection from './HeroSection';
import UploadSection from './UploadSection';
import RiskAnalyzer from './RiskAnalyzer';
import MapPanel from './MapPanel';
import RawViewer from './RawViewer';
import ExportTools from './ExportTools';
import HackerLoader from './HackerLoader';
import Footer from './Footer';
import RadarScanner from './RadarScanner';
import { useMetadata } from '../hooks/useMetadata';
import { FileInfoCard, ImageInfoCard, CameraInfoCard, DateInfoCard, GPSCard } from './MetadataCards';
import { Image as ImageIcon } from 'lucide-react';

export default function Dashboard() {
  const { processImage, analyzing, logs } = useMetadata();
  const [data, setData] = React.useState(null);
  const dashboardRef = useRef(null);

  const handleFile = async (file) => {
    setData(null);
    const result = await processImage(file);
    setData(result);
  };

  return (
    <>
      {!data && !analyzing && <MatrixBackground />}
      <div className="dashboard-container">
        {!analyzing && !data && <HeroSection />}

        {!data && !analyzing && (
          <div className="fade-in-up delay-3">
            <UploadSection onFileSelect={handleFile} />
          </div>
        )}

        {analyzing && <HackerLoader logs={logs} />}

        {data && !analyzing && (
          <div className="fade-in-up" ref={dashboardRef} style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1rem' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem' }}>
              <div>
                <h2 className="card-title" style={{ margin: 0, textShadow: 'none' }}>
                  FORENSIC_REPORT: <span style={{ color: 'var(--text-main)', marginLeft: '10px' }}>{data.file.name}</span>
                </h2>
                <div style={{ fontFamily: 'monospace', color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                  SCAN_COMPLETED_AT: {new Date().toISOString()} | STATUS: <span style={{ color: 'var(--neon-green)' }}>SECURE</span>
                </div>
              </div>
              <button className="cyber-btn" onClick={() => setData(null)} style={{ alignSelf: 'flex-start' }}>Analyze New Target</button>
            </div>

            <div className="dashboard-grid main-split">
              {/* Left Column: Image & Stats */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="cyber-card">
                  <h2 className="card-title"><ImageIcon size={20} /> Object Preview Matrix</h2>
                  <div className="image-preview-wrapper fade-in-up">
                    <img src={data.thumbnail} alt="Uploaded source material" />
                  </div>
                </div>

                <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                  <FileInfoCard file={data.file} />
                  <ImageInfoCard exif={data.exif} />
                  <DateInfoCard exif={data.exif} />
                  <CameraInfoCard exif={data.exif} />
                </div>

                <RadarScanner />
              </div>
              
              {/* Right Column: Maps & Risk */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <RiskAnalyzer risk={data.risk} />
                <MapPanel gps={data.gps} locationDetails={data.locationDetails} />
                <GPSCard gps={data.gps} locationDetails={data.locationDetails} />
              </div>
            </div>

            <RawViewer exif={data.exif} gps={data.gps} fileDetails={data.file} />
            
            <ExportTools file={data.originalFile || data.file} dashboardRef={dashboardRef} gps={data.gps} />

          </div>
        )}
      </div>
      {(data || !analyzing) && <Footer />}
    </>
  );
}
