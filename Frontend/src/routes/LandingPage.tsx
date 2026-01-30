import { Link } from "react-router-dom";
import Button from "../ui/Button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <header className="container-max mx-auto py-8 px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-brand-500 to-blue-700 flex items-center justify-center text-sm font-bold shadow-elevate">
              AI
            </div>
            <span className="text-lg font-semibold">AI Counsellor</span>
          </Link>
          <div className="hidden sm:flex items-center gap-3">
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container-max mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 max-w-lg">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-xs text-slate-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Stage-based AI counsellor • Study abroad
            </span>

            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
              Get personalised, stage-aware guidance for studying abroad.
            </h1>

            <p className="text-slate-300">
              AI Counsellor analyzes your profile and helps you shortlist dream, target, and safe universities — with clear reasons, risks and next steps.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link to="/signup">
                <Button className="w-full sm:w-auto">Create Account</Button>
              </Link>
              <Link to="/app/dashboard">
                <Button variant="outline" className="w-full sm:w-auto">Open Demo Dashboard</Button>
              </Link>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-400 mt-1" />
                <div>
                  <div className="font-semibold text-slate-100">Stage-based</div>
                  <div className="text-slate-400">Step-by-step progress</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-400 mt-1" />
                <div>
                  <div className="font-semibold text-slate-100">Profile aware</div>
                  <div className="text-slate-400">Recommendations tuned to you</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="h-2 w-2 rounded-full bg-amber-400 mt-1" />
                <div>
                  <div className="font-semibold text-slate-100">Actionable</div>
                  <div className="text-slate-400">To-dos & timelines</div>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="panel p-6 shadow-elevate">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Demo profile</h3>
                  <p className="text-xs text-slate-400">See how AI suggests universities</p>
                </div>
                <div className="text-sm text-slate-400">Stage 2</div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-400">Profile strength</div>
                    <div className="text-sm font-medium text-slate-100">68%</div>
                  </div>
                  <div className="w-32 h-4 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-4 bg-emerald-400" style={{ width: '68%' }} />
                  </div>
                </div>

                <div className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold">Top pick</div>
                      <div className="text-xs text-slate-400">University of Example</div>
                    </div>
                    <div className="inline-flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full bg-red-600/10 text-red-300 text-xs border border-red-600/30">Dream</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold">Backup</div>
                      <div className="text-xs text-slate-400">Example State University</div>
                    </div>
                    <div className="inline-flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-600/10 text-emerald-300 text-xs border border-emerald-600/30">Safe</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-8 text-center text-slate-500 text-xs">
        © {new Date().getFullYear()} AI Counsellor — Built with ❤️
      </footer>
    </div>
  );
}
