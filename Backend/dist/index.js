"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const env_1 = require("./config/env");
const db_1 = require("./config/db");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const profile_routes_1 = __importDefault(require("./routes/profile.routes"));
const dashboard_routes_1 = __importDefault(require("./routes/dashboard.routes"));
const universities_routes_1 = __importDefault(require("./routes/universities.routes"));
const tasks_routes_1 = __importDefault(require("./routes/tasks.routes"));
const counsellor_routes_1 = __importDefault(require("./routes/counsellor.routes"));
console.log("[APP] Initializing...");
console.log("[APP] PORT:", env_1.PORT, "TYPE:", typeof env_1.PORT);
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (_req, res) => {
    console.log("[LOG] GET /");
    res.json({ message: "AI Counsellor API running" });
});
app.use("/api/auth", auth_routes_1.default);
app.use("/api/profile", profile_routes_1.default);
app.use("/api/dashboard", dashboard_routes_1.default);
app.use("/api/universities", universities_routes_1.default);
app.use("/api/tasks", tasks_routes_1.default);
app.use("/api/ai", counsellor_routes_1.default);
// Test DB connection on startup
db_1.pool.query("SELECT 1", (err) => {
    if (err) {
        console.error("❌ DB connection failed:", err.message);
    }
    else {
        console.log("[DB] ✅ Connection verified");
    }
});
console.log("[APP] About to call listen on port:", env_1.PORT);
const portNum = env_1.PORT || 5000;
const server = app.listen(portNum, "127.0.0.1", () => {
    const addr = server.address();
    console.log(`✅ Server IS ACTUALLY listening on port ${portNum}`);
    console.log(`Server address:`, addr);
    console.log(`Open http://localhost:${portNum} in your browser`);
});
server.on("error", (err) => {
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
//# sourceMappingURL=index.js.map