import { useState } from "react";
import "../styles/taskForm.css";

export default function TaskForm({ show = false, onAdd }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return; 
    onAdd({ title: title.trim(), date, description: description.trim() });
    setTitle("");
    setDate("");
    setDescription("");
  };

  return (
    <form
      className={`task-form${show ? " visible" : ""}`}
      onSubmit={handleSubmit}
    >
      <div className="form-group">
        <label htmlFor="title">Título</label>
        <input
          id="title"
          type="text"
          placeholder="Ej: Tarea de Progra Web"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="date">Fecha</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          placeholder="Agrega una descripción..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <button className="btn-add-task" type="submit">Agregar Tarea</button>
    </form>
  );
}
