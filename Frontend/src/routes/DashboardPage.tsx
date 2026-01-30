import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-slate-400 mt-1">
            See where you are, what’s next, and how strong your profile is.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/app/counsellor">
            <Button>Open AI Counsellor</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-slate-100">Profile summary</h3>
                <p className="text-xs text-slate-400 mt-2">B.Tech CSE • 2026</p>
                <p className="text-xs text-slate-400">Target intake: Fall 2027 • US, Canada</p>
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold">68%</div>
                <div className="text-xs text-slate-400">Profile strength</div>
              </div>
            </div>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card>
            <h3 className="text-sm font-medium text-slate-100 mb-2">Profile strength</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Academics</span>
                <Badge label="Strong" color="green" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Exams</span>
                <Badge label="In progress" color="amber" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">SOP</span>
                <Badge label="Not started" color="red" />
              </div>
            </div>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card>
            <h3 className="text-sm font-medium text-slate-100 mb-2">Current stage</h3>
            <div className="space-y-2 text-sm">
              <div className="p-3 rounded bg-slate-800">
                <div className="font-semibold text-emerald-300">Stage 1: Building profile</div>
                <div className="text-xs text-slate-400">(complete)</div>
              </div>
              <div className="p-3 rounded bg-gradient-to-r from-slate-800 to-slate-900">
                <div className="font-semibold text-blue-300">Stage 2: Discovering universities</div>
                <div className="text-xs text-slate-400">(current)</div>
              </div>
              <div className="p-3 rounded bg-slate-800">
                <div className="font-semibold text-slate-200">Stage 3: Finalizing universities</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Card>
        <h3 className="text-sm font-medium text-slate-100 mb-2">AI to-do list</h3>
        <p className="text-sm text-slate-400 mb-3">These tasks are auto-generated based on your profile and stage.</p>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-3">
            <input type="checkbox" className="h-4 w-4 rounded border-slate-600" />
            <span>Shortlist at least 3 target universities.</span>
          </li>
          <li className="flex items-center gap-3">
            <input type="checkbox" className="h-4 w-4 rounded border-slate-600" />
            <span>Decide your primary country preference.</span>
          </li>
          <li className="flex items-center gap-3">
            <input type="checkbox" className="h-4 w-4 rounded border-slate-600" />
            <span>Check upcoming IELTS test dates.</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
