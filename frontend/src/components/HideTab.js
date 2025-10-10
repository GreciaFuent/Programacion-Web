import { useState } from 'react';

export default function HideTab() {
  const [secret, setSecret] = useState('');
  const [key, setKey] = useState('');

  const handleHide = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/hide/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret }),
      });
      const data = await response.json();
      setKey(data.key);
    } catch (error) {
      alert('Error saving the secret');
    }
  };

  return (
    <div className="form-section">
      <textarea
        placeholder="Write your secret..."
        value={secret}
        onChange={(e) => setSecret(e.target.value)}
        rows={5}
      />
      <button onClick={handleHide}>Generate secure link</button>

      {key && (
        <p className="result">
          Your key is: <strong>{key}</strong>
        </p>
      )}
    </div>
  );
}
