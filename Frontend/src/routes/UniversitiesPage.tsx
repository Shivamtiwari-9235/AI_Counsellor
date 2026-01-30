import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { useEffect, useState } from "react";
import api from "../lib/apiClient";

type University = {
  id: number;
  name: string;
  country: string;
  category: string;
  costLevel: string;
  acceptanceChance: string;
  fitReason: string;
  risks: string;
};

export default function UniversitiesPage() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        setLoading(true);
        const res = await api.get("/universities/recommend");
        setUniversities(res.data);
      } catch (err: any) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load universities");
      } finally {
        setLoading(false);
      }
    };
    fetchUniversities();
  }, []);

  const handleShortlist = async (universityId: number) => {
    try {
      await api.post("/universities/shortlist", {
        universityId,
        category: "Target",
      });
      alert("University shortlisted!");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to shortlist");
    }
  };

  const handleLock = async (universityId: number) => {
    try {
      await api.post("/universities/lock", { universityId });
      alert("University locked! Moving to finalizing stage.");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to lock university");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Universities</h1>
          <p className="text-sm text-slate-400 mt-1">Discover dream, target, and safe universities based on your profile.</p>
        </div>
      </div>

      {loading && <p className="text-slate-400 text-sm">Loading universities...</p>}
      {error && <p className="text-red-400 text-sm">{error}</p>}

      {!loading && universities.length > 0 && (
        <div className="grid gap-4 md:grid-cols-3">
          {universities.map((u) => {
            const color = u.category === 'Dream' ? 'red' : u.category === 'Target' ? 'blue' : 'green';
            const leftBorder = color === 'red' ? 'border-l-4 border-red-600/40' : color === 'blue' ? 'border-l-4 border-blue-600/40' : 'border-l-4 border-emerald-600/40';
            return (
              <div key={u.id} className={`${leftBorder} rounded-lg overflow-hidden`}> 
                <Card>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-sm font-semibold">{u.name}</h3>
                      <p className="text-xs text-slate-400">{u.country}</p>
                    </div>
                    <Badge label={u.category} color={color as any} />
                  </div>
                  <div className="flex justify-between text-xs text-slate-300 mb-3">
                    <span>Cost: {u.costLevel}</span>
                    <span>Chance: {u.acceptanceChance}</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-1"><strong>Fit:</strong> {u.fitReason}</p>
                  <p className="text-xs text-slate-400 mb-3"><strong>Risks:</strong> {u.risks}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" className="text-xs px-3 py-1" onClick={() => handleShortlist(u.id)}>Shortlist</Button>
                    <Button className="text-xs px-3 py-1" onClick={() => handleLock(u.id)}>Lock</Button>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      )}

      {!loading && universities.length === 0 && !error && (
        <p className="text-slate-400 text-sm">No universities found for your profile.</p>
      )}
    </div>
  );
}
