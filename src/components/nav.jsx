import "../styles/nav.css";

export default function Nav({ onToggleForm }) {
  return (
    <>
      <div className="nav">
        <h2 className="logo">Tasks Manager</h2>
        <button type="button" onClick={onToggleForm}>+</button>
      </div>
    </>
  );
}