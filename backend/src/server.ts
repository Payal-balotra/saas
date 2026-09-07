import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";


const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.all("/api/auth/{*splat}", toNodeHandler(auth));

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "API is running",
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
}); 