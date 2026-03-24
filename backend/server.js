import express from "express";
import cors from "cors";
import { initDb } from "./database.js";
import tasksRouter from "./routes/tasks.js";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use("/tasks", tasksRouter);

initDb().then(() => {
  app.listen(PORT, () => {
    console.log("🚀 Servidor rodando em http://localhost:${PORT}");
  });
});
