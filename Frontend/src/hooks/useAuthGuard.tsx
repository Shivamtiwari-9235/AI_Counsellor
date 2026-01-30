import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getToken } from "../lib/auth";

type Props = {
  children: ReactNode;
};

export const AuthGuard = ({ children }: Props) => {
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/login", { replace: true, state: { from: location.pathname } });
    } else {
      setChecked(true);
    }
  }, [navigate, location]);

  if (!checked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <p className="text-slate-300 text-sm">Checking session...</p>
      </div>
    );
  }

  return <>{children}</>;
};
