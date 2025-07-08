import React, { useEffect, useState } from 'react';
import { api } from '../api';

const modalStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  width: '90%',
  maxWidth: '500px',
  transform: 'translate(-50%, -50%)',
  background: 'white',
  borderRadius: '8px',
  padding: '1.5rem',
  boxShadow: '0 0 20px rgba(0,0,0,0.3)',
  zIndex: 1000
};

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0, 0, 0, 0.4)',
  zIndex: 999
};

function ThreatModal({ threatId, onClose }) {
  const [threat, setThreat] = useState(null);

  useEffect(() => {
    if (threatId) {
      api.get(`/threats/${threatId}`)
        .then(res => setThreat(res.data))
        .catch(err => {
          console.error(err);
          setThreat(null);
        });
    }
  }, [threatId]);

  if (!threatId) return null;

  return (
    <>
      <div style={overlayStyle} onClick={onClose} />
      <div style={modalStyle}>
        <h2>Threat Details</h2>
        {threat ? (
          <div style={{ marginTop: '1rem' }}>
            <p><strong>ID:</strong> {threat.id}</p>
            <p><strong>Description:</strong> {threat.cleaned_description}</p>
            <p><strong>Category:</strong> {threat.threat_category}</p>
            <p><strong>Severity Score:</strong> {threat.severity_score}</p>
          </div>
        ) : (
          <p>Loading threat details...</p>
        )}
        <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </>
  );
}

export default ThreatModal;
