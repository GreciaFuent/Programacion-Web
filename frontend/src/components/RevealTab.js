import { useState } from "react";

export default function RevealTab() {
  const [key, setKey] = useState("");
  const [secret, setSecret] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const handleReveal = async () => {
    if (!key.trim()) {
      setError("Please enter a key.");
      return;
    }
    setLoading(true);
    setError("");
    setSecret(null);

    try {
      const res = await fetch(`${API}/reveal/${key}/`);
      if (res.ok) {
        const data = await res.json();
        setSecret(data.secret);
      } else {
        setError("This key does not exist or has already been used.");
      }
    } catch {
      setError("⚠️ Error trying to reveal the secret.");
    } finally {
      setLoading(false);
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
      <button onClick={handleReveal} disabled={loading}>
        {loading ? "Loading..." : "Show secret"}
      </button>

      {secret && <p className="result">🔓 <strong>Secret:</strong> {secret}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
