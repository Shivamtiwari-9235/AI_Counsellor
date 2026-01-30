import Card from "../ui/Card";
import Button from "../ui/Button";

export default function ApplicationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Application guidance</h1>
        <p className="text-sm text-slate-400 mt-1">Unlocked after you lock at least one university.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h3 className="text-sm font-medium text-slate-100 mb-3">Required documents</h3>
          <ul className="text-sm text-slate-200 space-y-2">
            <li>• Academic transcripts</li>
            <li>• Updated resume</li>
            <li>• Statement of purpose</li>
            <li>• Letters of recommendation</li>
            <li>• Financial documents</li>
          </ul>
        </Card>

        <Card>
          <h3 className="text-sm font-medium text-slate-100 mb-3">Timeline</h3>
          <ul className="text-sm text-slate-300 space-y-2">
            <li>Month 1: Shortlist and lock universities</li>
            <li>Month 2–3: Prepare exams and SOP</li>
            <li>Month 4: Submit applications</li>
          </ul>
        </Card>
      </div>

      <Card>
        <h3 className="text-sm font-medium text-slate-100 mb-2">Application to-dos</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-3">
            <input type="checkbox" className="h-4 w-4 rounded border-slate-600" />
            <span>Draft university-specific SOP.</span>
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" className="h-4 w-4 rounded border-slate-600" />
            <span>Book IELTS test slot.</span>
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" className="h-4 w-4 rounded border-slate-600" />
            <span>Request LORs from 2 professors.</span>
          </div>
        </div>
        <Button className="mt-4">Sync with AI counsellor (later via API)</Button>
      </Card>
    </div>
  );
}
