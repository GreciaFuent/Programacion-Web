import { useState } from "react";
import Task from "./components/task";
import Nav from "./components/nav";
import TaskForm from "./components/formAddTask";
import "./App.css";

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState([]);

  const handleAddTask = ({ title, date, description }) => {
    setTasks(prev => {
      const newTask = {
        id: prev.length + 1,
        title,
        date,
        description,
      };
      return [newTask, ...prev];
    });
    setShowForm(false);
  };


  return (
    <>
      <Nav onToggleForm={() => setShowForm((s) => !s)} />
      <div className="tasks-div">
        <h1 className="title">Gestor de Tareas</h1>
        <div className="tasks">
          {tasks.length === 0 ? (
            <p style={{opacity:.7}}>Aún no hay tareas.</p>
          ) : (
            tasks.map(t => (
              <Task
                key={t.id}
                title={t.title}
                date={t.date}
                description={t.description}
              />
            ))
          )}
          <TaskForm show={showForm} onAdd={handleAddTask} />
        </div>
      </div>
    </>
  );
}
