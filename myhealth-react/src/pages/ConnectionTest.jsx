import React, { useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const ConnectionTest = () => {
  const [status, setStatus] = useState("Testing...");
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        // This tries to reach your backend profile endpoint
        await authAPI.profile(); 
        setStatus("✅ Success! Frontend is talking to Backend.");
      } catch (err) {
        console.error(err);
        setError(`❌ Connection Failed: ${err.message}`);
        setStatus("Failed");
      }
    };
    checkConnection();
  }, []);

  return (
    <div style={{ padding: '100px', textAlign: 'center', marginTop: '50px' }}>
      <h2>System Connectivity Test</h2>
      <p style={{ fontSize: '1.2rem', color: error ? 'red' : 'green' }}>{status}</p>
      {error && (
        <div style={{ background: '#ffeeee', padding: '20px', borderRadius: '8px', display: 'inline-block' }}>
          <p><strong>Common Fixes:</strong></p>
          <ul style={{ textAlign: 'left' }}>
            <li>Is your backend terminal showing "Server running"?</li>
            <li>Did you remove the space in your .env file? (VITE_API_URL=...)</li>
            <li>Is CORS enabled in your backend index.js?</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ConnectionTest;