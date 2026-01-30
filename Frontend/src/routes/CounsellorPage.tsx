import Card from "../ui/Card";
import Button from "../ui/Button";
import { useState, useRef, useEffect } from "react";
import api from "../lib/apiClient";

type Message = {
  sender: "user" | "ai";
  text: string;
};

export default function CounsellorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "ai",
      text: "Hi! I have loaded your profile. Let’s shortlist your dream, target, and safe universities step by step.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const res = await api.post("/ai/counsellor", { message: userMessage });
      setMessages((prev) => [...prev, { sender: "ai", text: res.data.reply }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { sender: "ai", text: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
      <Card>
        <div className="flex flex-col h-[60vh] min-h-[420px]">
          <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 p-3 chat-scroll">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[86%] rounded-xl px-4 py-2 text-sm leading-relaxed ${m.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-100'}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 p-3 border-t border-slate-800 bg-transparent flex gap-3 items-center">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !loading) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm"
              placeholder="Ask the AI counsellor what to do next..."
              disabled={loading}
            />
            <Button type="button" onClick={sendMessage} disabled={loading}>
              {loading ? 'Sending...' : 'Send'}
            </Button>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <Card>
          <h3 className="text-sm font-medium text-slate-100 mb-2">Profile snapshot</h3>
          <p className="text-xs text-slate-400 mb-1">Target degree</p>
          <p className="text-sm text-slate-100">Masters in Computer Science</p>
          <p className="text-xs text-slate-400 mt-3 mb-1">Budget</p>
          <p className="text-sm text-slate-100">20–30 lakhs / year</p>
          <p className="text-xs text-slate-400 mt-3 mb-1">Exams</p>
          <p className="text-sm text-slate-100">IELTS planned • GRE not started</p>
        </Card>

        <Card>
          <h3 className="text-sm font-medium text-slate-100 mb-2">Stage-aware suggestions</h3>
          <ul className="text-sm text-slate-300 space-y-2">
            <li>• Start with 2–3 dream, 3–4 target, and 2–3 safe universities.</li>
            <li>• Lock at least one serious target university before application tasks.</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
