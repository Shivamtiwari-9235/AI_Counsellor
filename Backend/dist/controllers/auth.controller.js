"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const db_1 = require("../config/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const signup = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        const existing = await db_1.pool.query("SELECT id FROM users WHERE email=$1", [
            email,
        ]);
        if (existing.rows.length > 0) {
            return res.status(400).json({ message: "Email already registered" });
        }
        const hash = await bcrypt_1.default.hash(password, 10);
        const result = await db_1.pool.query("INSERT INTO users (full_name, email, password_hash) VALUES ($1,$2,$3) RETURNING id, full_name, email", [fullName, email, hash]);
        const user = result.rows[0];
        // Initialize stage state
        await db_1.pool.query("INSERT INTO user_stage_state (user_id, current_stage, onboarding_complete, has_locked_university, sop_status) VALUES ($1,$2,$3,$4,$5)", [user.id, "PROFILE_BUILDING", false, false, "NOT_STARTED"]);
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, env_1.JWT_SECRET, { expiresIn: "7d" });
        res.status(201).json({ token, user });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Signup failed" });
    }
};
exports.signup = signup;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await db_1.pool.query("SELECT id, full_name, email, password_hash FROM users WHERE email=$1", [email]);
        if (result.rows.length === 0) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const user = result.rows[0];
        const valid = await bcrypt_1.default.compare(password, user.password_hash);
        if (!valid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, env_1.JWT_SECRET, { expiresIn: "7d" });
        res.json({
            token,
            user: { id: user.id, full_name: user.full_name, email: user.email },
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Login failed" });
    }
};
exports.login = login;
//# sourceMappingURL=auth.controller.js.map