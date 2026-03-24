// frontend/src/components/TaskList.jsx
export default function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return (
      <p className="empty">
        <span>✦</span>
        Nenhuma tarefa ainda. Adicione uma acima!
      </p>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className={`task-item ${task.done ? "done" : ""}`}>
          <div
            className={`checkbox ${task.done ? "checked" : ""}`}
            onClick={() => onToggle(task.id, task.done ? 0 : 1)}
          >
            <svg viewBox="0 0 12 12">
              <polyline points="2,6 5,9 10,3" />
            </svg>
          </div>

          <span className="task-title">{task.title}</span>

          <button className="delete-btn" onClick={() => onDelete(task.id)}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </li>
      ))}
    </ul>
  );
}
