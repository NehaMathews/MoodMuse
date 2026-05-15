import { useState } from "react";
import Icon from "./Icon";
import { analyzeMoodText, generatePlaylist, searchSong } from "../services/api";

export function Assistant({ mood, playlist, onMood, user }) {
  const [messages, setMessages] = useState([
    { role: "ai", text: `I made ${playlist}. It leans into ${mood.toLowerCase()} textures without getting predictable.` }
  ]);
  const [draft, setDraft] = useState("");
  const [results, setResults] = useState([]);

  async function send(event) {
    event.preventDefault();
    if (!draft.trim()) return;
    const text = draft.trim();
    const lower = text.toLowerCase();
    const songQuery = extractSongQuery(text);
    if (songQuery) {
      const found = await searchSong(songQuery, user.languages);
      setResults(found);
      setMessages((items) => [
        ...items,
        { role: "user", text },
        { role: "ai", text: `I searched for "${songQuery}" across ${(user.languages || ["English"]).join(", ")}. Open a Spotify result below for the full song.` }
      ]);
      setDraft("");
      return;
    }

    const nextMood = analyzeMoodText(text);
    const wantsCalm = lower.includes("calm") || lower.includes("relax") || lower.includes("sleep");
    const wantsEnergy = lower.includes("energy") || lower.includes("workout") || lower.includes("party");
    const intent = wantsCalm ? "softer pacing and low percussion" : wantsEnergy ? "higher BPM and brighter hooks" : "a balanced emotional arc";
    const nextPlaylist = generatePlaylist(nextMood);
    setMessages((items) => [
      ...items,
      { role: "user", text },
      { role: "ai", text: `Your message reads as ${nextMood.toLowerCase()}. I would switch you to "${nextPlaylist}" with ${intent}, then open the Spotify links for the full tracks after previewing.` }
    ]);
    setResults([]);
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
        {results.length > 0 && (
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {results.map((track) => (
              <a key={track.id} href={track.spotifyUrl} target="_blank" rel="noreferrer" className="rounded-2xl border border-white/10 bg-white/10 p-3 transition hover:bg-white/20">
                <img src={track.albumArt} alt="" className="mb-3 aspect-square w-full rounded-xl object-cover" />
                <p className="font-black text-white">{track.title}</p>
                <p className="text-sm text-white/55">{track.artist}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-[.18em] text-white/45">{track.language}</p>
              </a>
            ))}
          </div>
        )}
        <form onSubmit={send} className="mt-5 flex gap-3">
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-white/10 px-4 text-white outline-none focus:border-white/35"
            placeholder="Ask for a rainy mix, or search Kesariya..."
          />
          <button className="icon-button bg-white text-zinc-950" aria-label="Send">
            <Icon name="Send" />
          </button>
        </form>
      </div>
    </section>
  );
}

function extractSongQuery(text) {
  const cleaned = text.trim();
  const patterns = [
    /(?:search|find|play|look up)\s+(?:for\s+)?(?:the\s+)?(?:song\s+)?["']?(.+?)["']?$/i,
    /(?:can you|please)\s+(?:search|find|play)\s+["']?(.+?)["']?$/i
  ];
  const match = patterns.map((pattern) => cleaned.match(pattern)).find(Boolean);
  if (!match) return "";
  return match[1].replace(/\bon spotify\b/i, "").trim();
}
