import React from 'react';
import { ShieldAlert, Github, Linkedin } from 'lucide-react';

export default function HeroSection() {
  return (
    <div style={{ textAlign: 'center', marginBottom: '2rem' }} className="fade-in-up">
      <ShieldAlert size={56} color="var(--neon-cyan)" style={{ marginBottom: '1.5rem', display: 'inline-block', filter: 'drop-shadow(0 0 10px rgba(6,182,212,0.6))' }} />
      <h1 className="hero-title">Image Forensic Analyzer</h1>
      <div className="author-badge delay-1 fade-in-up" style={{ padding: '0.2rem 1rem', display: 'inline-flex', alignItems: 'center', gap: '0.8rem' }}>
        <span>Developed by KAJAN</span>
        <div style={{ display: 'flex', gap: '0.5rem', borderLeft: '1px solid rgba(6,182,212,0.3)', paddingLeft: '0.8rem' }}>
          <a href="https://github.com/sksivakajan" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', transition: 'color 0.2s', marginTop: '2px' }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
            <Github size={16} />
          </a>
          <a href="https://www.linkedin.com/in/sivakajan/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', transition: 'color 0.2s', marginTop: '2px' }} onMouseEnter={(e) => e.currentTarget.style.color = '#0077b5'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
            <Linkedin size={16} />
          </a>
        </div>
      </div>
      <p className="hero-subtitle delay-2 fade-in-up">
        Extract hidden EXIF payloads, reverse-geocode GPS coordinates, 
        and evaluate digital footprint exposure. Processing is executed locally.
      </p>
    </div>
  );
}
