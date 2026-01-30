import type { FormEvent } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../lib/apiClient";
import { setToken } from "../lib/auth";
import Button from "../ui/Button";

export default function SignupPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/signup", {
        fullName,
        email,
        password,
      });
      setToken(res.data.token);
      navigate("/onboarding");
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4"
      >
        <h2 className="text-2xl font-semibold">Create your account</h2>
        <p className="text-sm text-slate-400">
          We will build your profile first, then unlock the AI counsellor.
        </p>
        {error && <p className="text-xs text-red-400">{error}</p>}
        <div>
          <label className="block text-xs text-slate-300 mb-1">Full name</label>
          <input
            className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 text-sm"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
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
          Sign up and continue
        </Button>
        <p className="text-xs text-slate-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
