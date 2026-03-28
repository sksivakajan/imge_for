import React from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle, AlertOctagon } from 'lucide-react';

export default function RiskAnalyzer({ risk }) {
  if (!risk) return null;

  const isCritical = risk.level === 'CRITICAL';

  const getIcon = () => {
    switch (risk.level) {
      case 'LOW': return <ShieldCheck size={36} color={risk.color} strokeWidth={1.5} />;
      case 'MEDIUM': return <AlertTriangle size={36} color={risk.color} strokeWidth={1.5} />;
      case 'HIGH': return <ShieldAlert size={36} color={risk.color} strokeWidth={1.5} />;
      case 'CRITICAL': return <AlertOctagon size={36} color={risk.color} strokeWidth={1.5} />;
      default: return null;
    }
  };

  const getWarningMessage = () => {
    switch(risk.level) {
      case 'CRITICAL':
        return "> EXPOSURE WARNING: Exact Geolocation, Hardware Identifiers, and Timestamps intercepted. High probability of exact movement tracking.";
      case 'HIGH':
        return "> RISK WARNING: Exact Geolocation intercepted. Visual sharing will compromise physical location.";
      case 'MEDIUM':
        return "> INTELLIGENCE WARNING: Chronology and Hardware identifiers present. Behavioral patterns can be extracted.";
      case 'LOW':
      default:
        return "> CLEAR: Baseline metadata only. No actionable tracking intel found. Sanitized for public distribution.";
    }
  };

  const progressWidth = () => {
    switch(risk.level) {
      case 'LOW': return '25%';
      case 'MEDIUM': return '50%';
      case 'HIGH': return '75%';
      case 'CRITICAL': return '100%';
      default: return '0%';
    }
  };

  return (
    <div className={`cyber-card risk-${risk.level}`} style={isCritical ? {
      borderColor: 'var(--neon-red)',
      background: 'rgba(239, 68, 68, 0.03)',
      boxShadow: 'inset 0 0 20px rgba(239, 68, 68, 0.1)'
    } : {}}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 className="card-title" style={{ margin: 0, color: isCritical ? 'var(--neon-red)' : 'var(--neon-cyan)' }}>
          <span style={{ opacity: 0.5, marginRight: '8px' }}>//</span>
          Privacy Risk Analysis
        </h2>
        <span style={{
          fontFamily: 'monospace', 
          color: risk.color, 
          border: `1px solid ${risk.color}`, 
          padding: '0.2rem 0.8rem', 
          borderRadius: '4px',
          fontSize: '0.8rem',
          letterSpacing: '1px',
          background: `${risk.color}15`
        }}>
          [{risk.level}]
        </span>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
        <div style={{
          padding: '1rem',
          border: `1px solid ${risk.color}40`,
          borderRadius: '8px',
          background: 'var(--bg-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 0 15px ${risk.color}10`
        }}>
          {getIcon()}
        </div>
        
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ fontFamily: 'monospace', color: 'var(--text-main)', fontSize: '0.9rem', lineHeight: 1.6 }}>
            {getWarningMessage()}
          </div>
          
          <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ 
              height: '100%', 
              width: progressWidth(), 
              background: risk.color,
              boxShadow: `0 0 10px ${risk.color}`,
              transition: 'width 1s ease-in-out'
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'monospace', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
            <span>SECURE</span>
            <span>EXPOSED</span>
          </div>
        </div>
      </div>
    </div>
  );
}
