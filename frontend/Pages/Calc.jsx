import React, { useState } from 'react';

function Calc() {
  const [formData, setFormData] = useState({
    gold_open: '110.50',
    gold_high: '119.25',
    gold_low: '115.75',
    gold_volume: '5000',
    usd_chf: '0.92',
    eur_usd: '1.12',
    // oil_close: '75.30',
    // silver_close: '15.75',
    sp500_close: '4200.50',
    gold_close_lag_1: '118.00',
    gold_close_lag_2: '115.50',
    gold_close_lag_3: '112.75',
    // gold_close_lag_7: '1238.25',
    // gold_oil_ratio: '16.6',
    // usd_strength: '96.50',
    gold_7d_avg: '113.85'
  });

  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      if (result.error) {
        throw new Error(result.error);
      }
      
      setPrediction(result.prediction);
    } catch (err) {
      setError(err.message);
      console.error('Prediction error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Gold Price Predictor - 10g</h1>
      
      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {Object.entries(formData).map(([key, value]) => (
          <div key={key} style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
              {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}:
            </label>
            <input
              type="number"
              name={key}
              value={value}
              onChange={handleChange}
              step="0.0001"
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
            />
          </div>
        ))}
        
        <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'center' }}>
          <button 
            type="submit" 
            disabled={isLoading}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            {isLoading ? 'Predicting...' : 'Predict'}
          </button>
        </div>
      </form>
      
      {error && (
        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          backgroundColor: '#ffebee', 
          borderLeft: '4px solid #f44336',
          color: '#d32f2f'
        }}>
          Error: {error}
        </div>
      )}
      
      {prediction && !error && (
        <div style={{ 
          marginTop: '30px', 
          padding: '20px', 
          backgroundColor: '#e8f5e9', 
          borderRadius: '4px',
          textAlign: 'center'
        }}>
          <h2 style={{ color: '#2e7d32', margin: '0' }}>
            Predicted Gold Close Price: ${prediction.toFixed(2)}
          </h2>
        </div>
      )}
    </div>
  );
}

export default Calc;