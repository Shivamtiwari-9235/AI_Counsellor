import { Pool } from "pg";
import { DATABASE_URL } from "./env";

export const pool = new Pool({
  connectionString: DATABASE_URL,
});

pool.on("error", (err) => {
  console.error("[DB] Pool error:", err);
});

pool.on("connect", () => {
  console.log("[DB] Connected to PostgreSQL");
});
