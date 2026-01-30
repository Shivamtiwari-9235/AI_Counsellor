import dotenv from "dotenv";
dotenv.config();

export const PORT = parseInt(process.env.PORT || "5000", 10);
export const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
export const DATABASE_URL = process.env.DATABASE_URL || "";
