import React from 'react';
import { Github, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      marginTop: 'auto',
      paddingTop: '3rem',
      paddingBottom: '2rem',
      textAlign: 'center',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem',
      color: 'var(--text-muted)',
      fontSize: '0.85rem'
    }}>
      <div style={{ fontFamily: 'monospace', color: 'var(--neon-cyan)', fontSize: '1.2rem', fontWeight: 600 }}>
        [ Created by <span style={{ color: '#fff', textShadow: '0 0 10px rgba(255,255,255,0.8)' }}>KAJAN</span> ]
      </div>
      
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <a 
          href="https://github.com/sksivakajan" 
          target="_blank" 
          rel="noopener noreferrer"
          className="cyber-btn"
          style={{ padding: '0.4rem 0.8rem', borderColor: 'rgba(255,255,255,0.1)' }}
        >
          <Github size={16} /> GitHub Profile
        </a>
        <a 
          href="https://www.linkedin.com/in/sivakajan/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="cyber-btn"
          style={{ padding: '0.4rem 0.8rem', borderColor: '#0077b5', color: '#0077b5' }}
        >
          <Linkedin size={16} /> LinkedIn
        </a>
      </div>

      <div style={{ marginTop: '0.5rem' }}>Image GPS Metadata Analyzer v2.0</div>
      <div style={{ letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.7rem' }}>
        Privacy • Forensics • Intelligence
      </div>
    </footer>
  );
}
