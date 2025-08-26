import { useMemo } from "react";
import "../styles/task.css";

function Task({ id, title, date, description, status, onToggle, onDelete }) {
  const humanDate = useMemo(() => {
    if (!date) return "";
    try {
      const d = new Date(date);
      if (isNaN(d)) return date;
      return d.toLocaleDateString("es-GT", { year: "numeric", month: "2-digit", day: "2-digit" });
    } catch {
      return date;
    }
  }, [date]);

  return (
    <>
      <div className="task">
        <button
          className={`status ${status ? "completed" : "pending"}`}
          onClick={onToggle}
          type="button"
        >
          {status ? "C" : "P"}
        </button>

        <div className="info">
          <h3 className="id-task">#{id}</h3>
          <h3 className="title-task">{title}</h3>
          {humanDate && <h5 className="date-time">{humanDate}</h5>}
          {description && <p className="description">{description}</p>}
        </div>

        <button className="delete" type="button" onClick={onDelete}>
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path fill="none" stroke="#000" strokeWidth="2" d="M4,5 L20,5 L20,23 L4,23 L4,5 Z M1,5 L23,5 M9,1 L15,1 L15,5 L9,5 L9,1 Z M15,9 L15,19 M9,9 L9,19" />
          </svg>
        </button>
      </div>
    </>
  );
}

export default Task;
