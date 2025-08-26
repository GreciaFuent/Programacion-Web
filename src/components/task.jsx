import { useState, useMemo } from "react";
import "../styles/task.css";

function Task({ title, date, description }) {
  const [status, setStatus] = useState(false);

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
          onClick={() => setStatus(!status)}
          type="button"
        >
          {status ? "C" : "P"}
        </button>

        <div className="info">
          <h3 className="title-task">{title}</h3>
          {humanDate && <h5 className="date-time">{humanDate}</h5>}
          {description && <p className="description">{description}</p>}
        </div>
      </div>
    </>
  );
}

export default Task;
