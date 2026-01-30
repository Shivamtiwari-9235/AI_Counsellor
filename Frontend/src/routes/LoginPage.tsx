import type { FormEvent } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../lib/apiClient";
import { setToken } from "../lib/auth";
import Button from "../ui/Button";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation() as any;
  const from = location.state?.from || "/app/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/login", { email, password });
      setToken(res.data.token);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4"
      >
        <h2 className="text-2xl font-semibold">Welcome back</h2>
        <p className="text-sm text-slate-400">
          Login to continue your guided study-abroad journey.
        </p>
        {error && <p className="text-xs text-red-400">{error}</p>}
        <div>
          <label className="block text-xs text-slate-300 mb-1">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs text-slate-300 mb-1">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
        <p className="text-xs text-slate-400">
          New here?{" "}
          <Link to="/signup" className="text-blue-400">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}
