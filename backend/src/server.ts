import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

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