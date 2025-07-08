import React, { useState } from 'react';
import { api } from '../api';

function ThreatAnalyzer() {
  const [description, setDescription] = useState('');
  const [prediction, setPrediction] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    setPrediction('');
    try {
      const response = await api.post('/analyze', { description });
      setPrediction(response.data.predicted_category);
    } catch (err) {
      setPrediction('Error analyzing threat');
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>Threat Category Analyzer</h2>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Paste a threat description here..."
        rows={4}
        style={{ width: '100%', padding: '1rem', fontSize: '1rem' }}
      />
      <br />
      <button onClick={handleAnalyze} disabled={loading || !description.trim()}>
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>
      {prediction && (
        <div style={{ marginTop: '1rem' }}>
          <strong>Predicted Category:</strong> {prediction}
        </div>
      )}
    </div>
  );
}

export default ThreatAnalyzer;
