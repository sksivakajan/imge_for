import React, { useEffect, useState } from 'react';

export default function HackerLoader({ logs }) {
  const [renderedLogs, setRenderedLogs] = useState([]);

  useEffect(() => {
    // Reveal logs one by one visually
    setRenderedLogs(logs);
  }, [logs]);

  return (
    <div className="loader-overlay">
      <div className="loader-crt-scanline"></div>
      
      <h2 style={{ color: 'var(--neon-green)', fontFamily: 'monospace', fontSize: '2rem', marginBottom: '2rem', textShadow: '0 0 10px rgba(34, 197, 94, 0.5)' }}>
        SYSTEM.ANALYSIS.RUNNING
        <span className="cursor-blink" style={{ background: 'var(--neon-green)', width: '15px', height: '26px' }}></span>
      </h2>

      <div className="loader-terminal">
        {renderedLogs.map((log, i) => (
          <div key={i} className="term-line fade-in-up" style={{ animationDelay: '0s' }}>
            <span style={{ color: 'var(--text-muted)' }}>[{new Date().toISOString().split('T')[1].replace('Z', '')}]</span> {log}
          </div>
        ))}
        {renderedLogs.length > 0 && (
          <div className="term-line">
            <span style={{ color: 'var(--neon-cyan)' }}>&gt;</span> _
          </div>
        )}
      </div>
    </div>
  );
}
