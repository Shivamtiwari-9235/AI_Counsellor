"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
const env_1 = require("./env");
exports.pool = new pg_1.Pool({
    connectionString: env_1.DATABASE_URL,
});
exports.pool.on("error", (err) => {
    console.error("[DB] Pool error:", err);
});
exports.pool.on("connect", () => {
    console.log("[DB] Connected to PostgreSQL");
});
//# sourceMappingURL=db.js.map