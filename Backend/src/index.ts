import express from "express";
import cors from "cors";
import { PORT } from "./config/env";
import { pool } from "./config/db";
import authRoutes from "./routes/auth.routes";
import profileRoutes from "./routes/profile.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import universitiesRoutes from "./routes/universities.routes";
import tasksRoutes from "./routes/tasks.routes";
import counsellorRoutes from "./routes/counsellor.routes";

console.log("[APP] Initializing...");
console.log("[APP] PORT:", PORT, "TYPE:", typeof PORT);

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  console.log("[LOG] GET /");
  res.json({ message: "AI Counsellor API running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/universities", universitiesRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/ai", counsellorRoutes);

// Test DB connection on startup
pool.query("SELECT 1", (err) => {
  if (err) {
    console.error("❌ DB connection failed:", err.message);
  } else {
    console.log("[DB] ✅ Connection verified");
  }
});

console.log("[APP] About to call listen on port:", PORT);

const portNum = PORT || 5000;
const server = app.listen(portNum, "127.0.0.1", () => {
  const addr = server.address();
  console.log(`✅ Server IS ACTUALLY listening on port ${portNum}`);
  console.log(`Server address:`, addr);
  console.log(`Open http://localhost:${portNum} in your browser`);
});

server.on("error", (err: any) => {
  console.error("❌ Server error:", err.message);
  if (err.code === "EADDRINUSE") {
    console.error(`Port ${portNum} is already in use`);
  }
});

server.on("listening", () => {
  console.log("[APP] ✅ Server is successfully listening");
});

process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled rejection:", err);
});

