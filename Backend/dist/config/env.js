"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATABASE_URL = exports.JWT_SECRET = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = parseInt(process.env.PORT || "5000", 10);
exports.JWT_SECRET = process.env.JWT_SECRET || "supersecret";
exports.DATABASE_URL = process.env.DATABASE_URL || "";
//# sourceMappingURL=env.js.map