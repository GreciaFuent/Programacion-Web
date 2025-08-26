import { useEffect, useMemo, useState } from "react";
import Task from "./components/task";
import Nav from "./components/nav";
import TaskForm from "./components/formAddTask";
import "./App.css";

const LS_KEY = "tasks_app_state_v1";

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("all"); 

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

  const pendingCount = useMemo(() => tasks.filter(t => !t.status).length, [tasks]);
  const completedCount = useMemo(() => tasks.filter(t => t.status).length, [tasks]);

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case "pending":
        return tasks.filter(t => !t.status);
      case "completed":
        return tasks.filter(t => t.status);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  return (
    <>
      <Nav onToggleForm={() => setShowForm(s => !s)} />

      <div className="tasks-div">
        <h1 className="title">Gestor de Tareas</h1>

        {/* Barra de filtros */}
        <div className="filters">
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
            type="button"
          >
            Todas ({tasks.length})
          </button>
          <button
            className={filter === "pending" ? "active" : ""}
            onClick={() => setFilter("pending")}
            type="button"
          >
            Pendientes ({pendingCount})
          </button>
          <button
            className={filter === "completed" ? "active" : ""}
            onClick={() => setFilter("completed")}
            type="button"
          >
            Completadas ({completedCount})
          </button>
        </div>

        <div className="tasks">
          {filteredTasks.length === 0 ? (
            <p style={{ opacity: .7 }}>
              {filter === "all" && "Aún no hay tareas."}
              {filter === "pending" && "No hay tareas pendientes."}
              {filter === "completed" && "No hay tareas completadas."}
            </p>
          ) : (
            filteredTasks.map(t => (
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
