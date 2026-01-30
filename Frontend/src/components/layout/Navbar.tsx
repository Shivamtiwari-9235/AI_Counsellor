import { Link, useNavigate } from "react-router-dom";
import { clearToken } from "../../lib/auth";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    clearToken();
    navigate("/login");
  };

  return (
    <header className="border-b border-slate-800 bg-slate-950">
      <div className="container-max mx-auto px-4 flex items-center justify-between h-14">
        <div className="flex items-center gap-3">
          <Link to="/app/dashboard" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-brand-500 to-blue-700 flex items-center justify-center text-sm font-bold shadow-elevate">
              AI
            </div>
            <span className="font-semibold text-slate-100">AI Counsellor</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={handleLogout}
            className="text-sm px-3 py-1 rounded border border-slate-700 text-slate-200 hover:bg-slate-800"
          >
            Logout
          </button>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <button
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
            className="p-2 rounded-md bg-slate-900 border border-slate-800 text-slate-200"
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {open && (
        <div className="md:hidden bg-slate-950 border-t border-slate-800">
          <div className="px-4 py-3 space-y-2">
            <Link to="/app/dashboard" onClick={() => setOpen(false)} className="block px-3 py-2 rounded hover:bg-slate-900">Dashboard</Link>
            <Link to="/app/counsellor" onClick={() => setOpen(false)} className="block px-3 py-2 rounded hover:bg-slate-900">AI Counsellor</Link>
            <Link to="/app/universities" onClick={() => setOpen(false)} className="block px-3 py-2 rounded hover:bg-slate-900">Universities</Link>
            <Link to="/app/applications" onClick={() => setOpen(false)} className="block px-3 py-2 rounded hover:bg-slate-900">Applications</Link>
            <Link to="/app/profile" onClick={() => setOpen(false)} className="block px-3 py-2 rounded hover:bg-slate-900">Profile</Link>
            <button onClick={() => { setOpen(false); handleLogout(); }} className="w-full text-left px-3 py-2 rounded hover:bg-slate-900">Logout</button>
          </div>
        </div>
      )}
    </header>
  );
}
