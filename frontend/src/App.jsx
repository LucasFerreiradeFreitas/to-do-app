// frontend/src/App.jsx
import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { getTasks, createTask, toggleTask, deleteTask } from "./services/api";
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("tema") !== "light";
  });

  useEffect(() => {
    getTasks().then(setTasks);
  }, []);

  useEffect(() => {
    const tema = darkMode ? "dark" : "light";
    document.body.setAttribute("data-theme", tema);
    localStorage.setItem("tema", tema);
  }, [darkMode]);

  async function handleAdd(title) {
    const newTask = await createTask(title);
    setTasks((prev) => [newTask, ...prev]);
  }

  async function handleToggle(id, done) {
    await toggleTask(id, done);
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, done } : task)),
    );
  }

  async function handleDelete(id) {
    await deleteTask(id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  const total = tasks.length;
  const done = tasks.filter((t) => t.done).length;
  const pending = total - done;

  return (
    <div className="app-wrapper">
      <div className="container">
        <div className="header">
          <div className="header-top">
            <h1>Minhas Tarefas</h1>
            <button
              className="theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
          </div>
          <p>Mantenha o foco no que importa.</p>
        </div>

        <div className="stats">
          <div className="stat">
            <div className="stat-number">{total}</div>
            <div className="stat-label">Total</div>
          </div>
          <div className="stat">
            <div className="stat-number">{pending}</div>
            <div className="stat-label">Pendentes</div>
          </div>
          <div className="stat">
            <div className="stat-number">{done}</div>
            <div className="stat-label">Concluídas</div>
          </div>
        </div>

        <TaskForm onAdd={handleAdd} />

        <p className="section-title">Suas tarefas</p>
        <TaskList
          tasks={tasks}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
