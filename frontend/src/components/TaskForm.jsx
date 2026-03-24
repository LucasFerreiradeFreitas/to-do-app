// frontend/src/components/TaskForm.jsx
import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title);
    setTitle("");
  }

  return (
    <div className="task-form">
      <input
        type="text"
        placeholder="Digite uma tarefa..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleSubmit}>Adicionar</button>
    </div>
  );
}
