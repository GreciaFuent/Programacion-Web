import { useState } from "react";
import "../styles/task.css";

function Task() {
  const [status, setStatus] = useState(false);

  return (
    <>
      <div className="task">

        <button className={`status ${status ? "completed" : "pending"}`} 
          onClick={() => setStatus(!status)}>
          {status ? "C" : "P"}
        </button>

        <div className="info">
          <h3 className="title-task">Tarea Progra Web</h3>
          <h5 className="date-time">26/08/2025</h5>
          <p className="description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis inventore aliquam v
          </p>
        </div>
        
      </div>
    </>
  );
}

export default Task;

