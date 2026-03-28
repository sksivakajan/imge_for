import React from 'react';
import { Activity } from 'lucide-react';

export default function RadarScanner() {
  return (
    <div className="cyber-card" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: '300px' }}>
      <h2 className="card-title"><Activity size={20} /> Active Signal Intercept</h2>
      
      <div style={{
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <style>
          {`
            .radar-container {
              position: relative;
              width: 200px;
              height: 200px;
              border-radius: 50%;
              border: 2px solid var(--border-color);
              background: repeating-radial-gradient(
                transparent,
                transparent 20px,
                rgba(6, 182, 212, 0.1) 21px,
                transparent 22px
              ),
              linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px);
              background-size: 100% 100%, 20px 20px, 20px 20px;
              box-shadow: inset 0 0 30px rgba(6, 182, 212, 0.2);
              overflow: hidden;
            }
            .radar-scan {
              position: absolute;
              top: 50%;
              left: 50%;
              width: 100px;
              height: 100px;
              background: linear-gradient(45deg, rgba(34, 197, 94, 0.6) 0%, transparent 50%);
              transform-origin: 0 0;
              animation: scan 4s linear infinite;
              border-radius: 100% 0 0 0;
            }
            @keyframes scan {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            .radar-dot {
              position: absolute;
              width: 6px;
              height: 6px;
              background: var(--neon-red);
              border-radius: 50%;
              box-shadow: 0 0 10px var(--neon-red), 0 0 5px var(--neon-red);
              opacity: 0;
              animation: blip 4s infinite;
            }
            @keyframes blip {
              0%, 79% { opacity: 0; }
              80% { opacity: 1; transform: scale(1.5); }
              90% { opacity: 0.5; transform: scale(1); }
              100% { opacity: 0; }
            }
            .radar-dot.d1 { top: 30%; left: 40%; animation-delay: 0.5s; }
            .radar-dot.d2 { top: 70%; left: 80%; animation-delay: 1.8s; }
            .radar-dot.d3 { top: 60%; left: 20%; animation-delay: 3.2s; }
          `}
        </style>

        <div className="radar-container">
          <div className="radar-scan"></div>
          <div className="radar-dot d1"></div>
          <div className="radar-dot d2"></div>
          <div className="radar-dot d3"></div>
        </div>

        {/* Ambient background data streams */}
        <div style={{
          position: 'absolute',
          right: '-20px',
          bottom: '10px',
          fontFamily: 'monospace',
          fontSize: '0.65rem',
          color: 'var(--neon-cyan)',
          opacity: 0.4,
          textAlign: 'right'
        }}>
          <div>RX: {Math.random().toString(36).substring(7)}</div>
          <div>TX: {Math.random().toString(36).substring(7)}</div>
          <div>FREQ: 4{Math.floor(Math.random() * 90)}.{Math.floor(Math.random() * 9)} MHz</div>
          <div>SIG: STRONG</div>
        </div>
      </div>
    </div>
  );
}
