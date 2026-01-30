import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/app/dashboard", label: "Dashboard" },
  { to: "/app/counsellor", label: "AI Counsellor" },
  { to: "/app/universities", label: "Universities" },
  { to: "/app/applications", label: "Applications" },
  { to: "/app/profile", label: "Profile" },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:block w-64 border-r border-slate-800 bg-slate-950 text-sm">
      <div className="p-4 text-xs uppercase tracking-wide text-slate-500">Navigation</div>
      <nav className="flex flex-col px-2 pb-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 my-1 rounded-md text-sm transition-colors ${
                isActive
                  ? 'bg-gradient-to-r from-slate-800 to-slate-900 text-white'
                  : 'text-slate-300 hover:bg-slate-900'
              }`
            }
          >
            <span className="w-2 h-2 rounded-full bg-slate-700" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
