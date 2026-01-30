import { useEffect, useState } from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import api from "../lib/apiClient";

type Profile = {
  current_education_level?: string;
  degree_major?: string;
  graduation_year?: string;
  gpa?: number;
  intended_degree?: string;
  field_of_study?: string;
  target_intake_year?: string;
  preferred_countries?: string;
  budget_range_per_year?: string;
  funding_plan?: string;
  ielts_status?: string;
  gre_status?: string;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState<Profile>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await api.get("/profile");
        setProfile(res.data);
        setForm(res.data || {});
      } catch (err: any) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.post("/profile/onboarding", form);
      setProfile(form);
      alert("Profile updated!");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <p className="text-slate-400 text-sm">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold">Profile</h1>
          <p className="text-xs text-slate-400">
            Edit your profile. The AI counsellor and recommendations always use the latest data.
          </p>
        </div>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <Card title="Basic profile">
        <div className="grid gap-3 md:grid-cols-2 text-sm">
          <div>
            <label className="block text-xs mb-1">Current education level</label>
            <input
              name="current_education_level"
              value={form.current_education_level || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700"
              placeholder="B.Tech 3rd year"
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Degree / major</label>
            <input
              name="degree_major"
              value={form.degree_major || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700"
              placeholder="Computer Science"
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Graduation year</label>
            <input
              name="graduation_year"
              value={form.graduation_year || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700"
              placeholder="2025"
            />
          </div>
          <div>
            <label className="block text-xs mb-1">GPA</label>
            <input
              name="gpa"
              type="number"
              step="0.1"
              value={form.gpa || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700"
              placeholder="8.5"
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Intended degree</label>
            <input
              name="intended_degree"
              value={form.intended_degree || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700"
              placeholder="Masters"
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Field of study</label>
            <input
              name="field_of_study"
              value={form.field_of_study || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700"
              placeholder="Computer Science"
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Target intake year</label>
            <input
              name="target_intake_year"
              value={form.target_intake_year || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700"
              placeholder="2025"
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Preferred countries (comma-separated)</label>
            <input
              name="preferred_countries"
              value={form.preferred_countries || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700"
              placeholder="USA,Canada,UK"
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Budget range per year (USD)</label>
            <input
              name="budget_range_per_year"
              value={form.budget_range_per_year || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700"
              placeholder="20000-30000"
            />
          </div>
          <div>
            <label className="block text-xs mb-1">Funding plan</label>
            <input
              name="funding_plan"
              value={form.funding_plan || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700"
              placeholder="Scholarship + Loan"
            />
          </div>
          <div>
            <label className="block text-xs mb-1">IELTS status</label>
            <input
              name="ielts_status"
              value={form.ielts_status || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700"
              placeholder="planned, in_progress, completed"
            />
          </div>
          <div>
            <label className="block text-xs mb-1">GRE status</label>
            <input
              name="gre_status"
              value={form.gre_status || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700"
              placeholder="planned, in_progress, completed"
            />
          </div>
        </div>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="mt-4 text-sm px-4 py-2"
        >
          {saving ? "Saving..." : "Save changes"}
        </Button>
      </Card>
    </div>
  );
}
