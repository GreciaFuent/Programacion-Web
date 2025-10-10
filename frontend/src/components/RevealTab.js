import { useState } from 'react';

export default function RevealTab() {
  const [key, setKey] = useState('');
  const [secret, setSecret] = useState(null);
  const [error, setError] = useState(null);

  const handleReveal = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/reveal/${key}`);
      if (response.ok) {
        const data = await response.json();
        setSecret(data.secret);
        setError(null);
      } else {
        setSecret(null);
        setError('This key does not exist or has already been used.');
      }
    } catch (error) {
      setError('Error trying to reveal the secret.');
    }
  };

  return (
    <div className="form-section">
      <input
        type="text"
        placeholder="Enter your key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />
      <button onClick={handleReveal}>Show</button>

      {secret && <p className="result"><strong>🔓 Secret:</strong> {secret}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
