import { useState } from "react";

export default function HideTab() {
  const [secret, setSecret] = useState("");
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 👇 toma la URL del backend desde la env (fallback a localhost)
  const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const handleHide = async () => {
    if (!secret.trim()) {
      setError("Please write something to hide.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API}/hide/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret }),
      });

      if (!response.ok) throw new Error("Failed to save secret");
      const data = await response.json();
      setKey(data.key);
      setSecret("");
    } catch (err) {
      setError("⚠️ Error saving the secret. Try again.");
    } finally {
      setLoading(false);
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
      <button onClick={handleHide} disabled={loading}>
        {loading ? "Saving..." : "Generate secure key"}
      </button>

      {key && (
        <p className="result">
          ✅ Your key is: <strong>{key}</strong>
        </p>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
