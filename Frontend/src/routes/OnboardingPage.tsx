import type { FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/apiClient";
import Button from "../ui/Button";
import Card from "../ui/Card";

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    currentEducationLevel: "",
    degreeMajor: "",
    graduationYear: "",
    gpa: "",
    intendedDegree: "",
    fieldOfStudy: "",
    targetIntakeYear: "",
    preferredCountries: "",
    budgetRangePerYear: "",
    fundingPlan: "",
    ieltsStatus: "",
    greStatus: "",
    sopStatus: "",
  });

  const nextStep = () => setStep((s) => Math.min(4, s + 1));
  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/profile/onboarding", form);
      navigate("/app/dashboard");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl space-y-4 bg-slate-900 border border-slate-800 rounded-xl p-6"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            Build your profile ({step}/4)
          </h2>
          <p className="text-xs text-slate-400">
            Onboarding is mandatory before you talk to the AI counsellor.
          </p>
        </div>

        {step === 1 && (
          <Card title="Academic background">
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className="block text-xs mb-1">Current education level</label>
                <input
                  name="currentEducationLevel"
                  value={form.currentEducationLevel}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 text-sm"
                  placeholder="B.Tech 3rd year, BSc, etc."
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Degree / major</label>
                <input
                  name="degreeMajor"
                  value={form.degreeMajor}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 text-sm"
                  placeholder="Computer Science, Mechanical..."
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Graduation year</label>
                <input
                  name="graduationYear"
                  value={form.graduationYear}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 text-sm"
                  placeholder="2026"
                />
              </div>
              <div>
                <label className="block text-xs mb-1">GPA / percentage (optional)</label>
                <input
                  name="gpa"
                  value={form.gpa}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 text-sm"
                  placeholder="8.2 / 78%"
                />
              </div>
            </div>
          </Card>
        )}

        {step === 2 && (
          <Card title="Study goal">
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className="block text-xs mb-1">Intended degree</label>
                <select
                  name="intendedDegree"
                  value={form.intendedDegree}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 text-sm"
                >
                  <option value="">Select degree</option>
                  <option value="Bachelors">Bachelors</option>
                  <option value="Masters">Masters</option>
                  <option value="MBA">MBA</option>
                  <option value="PhD">PhD</option>
                </select>
              </div>
              <div>
                <label className="block text-xs mb-1">Field of study</label>
                <input
                  name="fieldOfStudy"
                  value={form.fieldOfStudy}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 text-sm"
                  placeholder="Computer Science, Data Science..."
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Target intake year</label>
                <input
                  name="targetIntakeYear"
                  value={form.targetIntakeYear}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 text-sm"
                  placeholder="2027"
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Preferred countries</label>
                <input
                  name="preferredCountries"
                  value={form.preferredCountries}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 text-sm"
                  placeholder="US, Canada, Germany..."
                />
              </div>
            </div>
          </Card>
        )}

        {step === 3 && (
          <Card title="Budget and funding">
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className="block text-xs mb-1">Budget range per year</label>
                <input
                  name="budgetRangePerYear"
                  value={form.budgetRangePerYear}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 text-sm"
                  placeholder="20–30 lakhs, 10–15 lakhs..."
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Funding plan</label>
                <select
                  name="fundingPlan"
                  value={form.fundingPlan}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 text-sm"
                >
                  <option value="">Select</option>
                  <option value="self">Self-funded</option>
                  <option value="scholarship">Scholarship-dependent</option>
                  <option value="loan">Loan-dependent</option>
                </select>
              </div>
            </div>
          </Card>
        )}

        {step === 4 && (
          <Card title="Exams and readiness">
            <div className="grid gap-3 md:grid-cols-3">
              <div>
                <label className="block text-xs mb-1">IELTS / TOEFL status</label>
                <select
                  name="ieltsStatus"
                  value={form.ieltsStatus}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 text-sm"
                >
                  <option value="">Select</option>
                  <option value="not_started">Not started</option>
                  <option value="planned">Planned</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="block text-xs mb-1">GRE / GMAT status</label>
                <select
                  name="greStatus"
                  value={form.greStatus}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 text-sm"
                >
                  <option value="">Select</option>
                  <option value="not_started">Not started</option>
                  <option value="planned">Planned</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="block text-xs mb-1">SOP status</label>
                <select
                  name="sopStatus"
                  value={form.sopStatus}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 text-sm"
                >
                  <option value="">Select</option>
                  <option value="not_started">Not started</option>
                  <option value="draft">Draft</option>
                  <option value="ready">Ready</option>
                </select>
              </div>
            </div>
          </Card>
        )}

        <div className="flex justify-between items-center pt-2">
          <div className="text-xs text-slate-400">
            Onboarding must be completed to unlock the AI counsellor.
          </div>
          <div className="flex gap-2">
            {step > 1 && (
              <Button type="button" variant="outline" onClick={prevStep}>
                Back
              </Button>
            )}
            {step < 4 && (
              <Button type="button" onClick={nextStep}>
                Next
              </Button>
            )}
            {step === 4 && (
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Complete onboarding"}
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
