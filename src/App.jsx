import { useEffect, useState } from "react";
import Task from "./components/task";
import Nav from "./components/nav";
import TaskForm from "./components/formAddTask";
import "./App.css";

const LS_KEY = "tasks_app_state_v1";

export default function App() {
  const [showForm, setShowForm] = useState(false);

  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return { tasks: [], nextId: 1 };

      const parsed = JSON.parse(raw);
      const tasksRaw = Array.isArray(parsed?.tasks) ? parsed.tasks : [];

      const tasks = tasksRaw.map(t => ({
        ...t,
        status: typeof t.status === "boolean" ? t.status : false,
      }));

      const maxId = tasks.length ? Math.max(...tasks.map(t => Number(t.id) || 0)) : 0;
      const nextId =
        Number.isInteger(parsed?.nextId) && parsed.nextId > 0
          ? parsed.nextId
          : maxId + 1;

      return { tasks, nextId };
    } catch (e) {
      console.warn("No se pudo leer localStorage:", e);
      return { tasks: [], nextId: 1 };
    }
  });

  const { tasks, nextId } = state;

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn("No se pudo guardar en localStorage:", e);
    }
  }, [state]);

  const handleAddTask = ({ title, date, description }) => {
    setState(prev => ({
      tasks: [
        { id: prev.nextId, title, date, description, status: false }, 
        ...prev.tasks
      ],
      nextId: prev.nextId + 1,
    }));
    setShowForm(false);
  };

  const handleDeleteTask = (id) => {
    setState(prev => ({
      ...prev,
      tasks: prev.tasks.filter(t => t.id !== id),
    }));
  };

  const handleToggleStatus = (id) => {
    setState(prev => ({
      ...prev,
      tasks: prev.tasks.map(t =>
        t.id === id ? { ...t, status: !t.status } : t
      ),
    }));
  };

  return (
    <>
      <Nav onToggleForm={() => setShowForm(s => !s)} />
      <div className="tasks-div">
        <h1 className="title">Gestor de Tareas</h1>
        <div className="tasks">
          {tasks.length === 0 ? (
            <p style={{ opacity: .7 }}>Aún no hay tareas.</p>
          ) : (
            tasks.map(t => (
              <Task
                key={t.id}
                id={t.id}
                title={t.title}
                date={t.date}
                description={t.description}
                status={t.status}                 
                onToggle={() => handleToggleStatus(t.id)} 
                onDelete={() => handleDeleteTask(t.id)}
              />
            ))
          )}
          <TaskForm show={showForm} onAdd={handleAddTask} />
        </div>
      </div>
    </>
  );
}
