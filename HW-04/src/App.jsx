import Task from "./components/task";
import Nav from "./components/nav";
import "./App.css";


export default function App() {

  return (
    <>
    <Nav />
      <div className="tasks-div">
        <h1 className="title">Gestor de Tareas</h1>
        <div className="tasks">
          <Task/>
        </div>
      </div>
    </>
  );
}