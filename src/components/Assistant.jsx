import { useState } from "react";
import Icon from "./Icon";

export function Assistant({ mood, playlist, onMood }) {
  const [messages, setMessages] = useState([
    { role: "ai", text: `I made ${playlist}. It leans into ${mood.toLowerCase()} textures without getting predictable.` }
  ]);
  const [draft, setDraft] = useState("");

  function send(event) {
    event.preventDefault();
    if (!draft.trim()) return;
    const text = draft.trim();
    const lower = text.toLowerCase();
    const nextMood = lower.includes("calm") ? "Relaxed" : lower.includes("love") ? "Romantic" : lower.includes("work") ? "Focused" : mood;
    setMessages((items) => [
      ...items,
      { role: "user", text },
      { role: "ai", text: `I hear ${nextMood.toLowerCase()}. Try a playlist with one familiar anchor track, then let the next three songs drift wider.` }
    ]);
    onMood(nextMood, "assistant");
    setDraft("");
  }

  return (
    <section id="assistant" className="section">
      <div className="section-head">
        <span>AI music assistant</span>
        <h2>A tiny curator in the corner.</h2>
      </div>
      <div className="panel">
        <div className="max-h-80 space-y-3 overflow-auto pr-2">
          {messages.map((message, i) => (
            <div key={i} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[82%] rounded-3xl px-5 py-3 ${message.role === "user" ? "bg-white text-zinc-950" : "bg-white/10 text-white"}`}>
                {message.text}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={send} className="mt-5 flex gap-3">
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-white/10 px-4 text-white outline-none focus:border-white/35"
            placeholder="Ask for a rainy drive mix..."
          />
          <button className="icon-button bg-white text-zinc-950" aria-label="Send">
            <Icon name="Send" />
          </button>
        </form>
      </div>
    </section>
  );
}
