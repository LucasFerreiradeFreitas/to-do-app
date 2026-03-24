// backend/routes/tasks.js
import { Router } from "express";
import { openDb } from "../database.js";

const router = Router();

router.get("/", async (req, res) => {
  const db = await openDb();
  const tasks = await db.all("SELECT * FROM tasks ORDER BY created_at DESC");
  await db.close();
  res.json(tasks);
});

router.post("/", async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "O título é obrigatório!" });
  }

  const db = await openDb();
  const result = await db.run("INSERT INTO tasks (title) VALUES (?)", [title]);
  await db.close();

  res.status(201).json({ id: result.lastID, title, done: 0 });
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { done } = req.body;

  const db = await openDb();
  await db.run("UPDATE tasks SET done = ? WHERE id = ?", [done, id]);
  await db.close();

  res.json({ message: "Tarefa atualizada!" });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const db = await openDb();
  await db.run("DELETE FROM tasks WHERE id = ?", [id]);
  await db.close();

  res.json({ message: "Tarefa deletada!" });
});

export default router;
