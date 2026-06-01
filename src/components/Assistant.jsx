import { useState } from "react";
import Icon from "./Icon";
import { analyzeMoodText, catalogLanguages, generatePlaylist, recordPlayed, searchMusicCatalog, searchSong } from "../services/api";

export function Assistant({ mood, playlist, onMood, user, onActivity }) {
  const [messages, setMessages] = useState([
    { role: "ai", text: `I made ${playlist}. It leans into ${mood.toLowerCase()} textures without getting predictable.` }
  ]);
  const [draft, setDraft] = useState("");
  const [results, setResults] = useState([]);
  const [pendingChoice, setPendingChoice] = useState(null);

  async function send(event) {
    event.preventDefault();
    if (!draft.trim()) return;
    const text = draft.trim();
    const lower = text.toLowerCase();

    if (pendingChoice) {
      const chosenLanguage = pendingChoice.languages.find((language) => lower.includes(language.toLowerCase()));
      if (!chosenLanguage) {
        setMessages((items) => [
          ...items,
          { role: "user", text },
          { role: "ai", text: `Pick one of these languages for ${pendingChoice.query}: ${pendingChoice.languages.join(", ")}.` }
        ]);
        setDraft("");
        return;
      }
      const found = searchMusicCatalog(pendingChoice.query, [chosenLanguage], pendingChoice.kind);
      publishResults(text, found, `Here are ${chosenLanguage} songs ${pendingChoice.kind === "movie" ? `from ${pendingChoice.query}` : `by ${pendingChoice.query}`}.`);
      setPendingChoice(null);
      setDraft("");
      return;
    }

    const movieQuery = extractMovieQuery(text);
    if (movieQuery) {
      const available = catalogLanguages(movieQuery, "movie");
      const preferredAvailable = available.filter((language) => (user.languages || []).includes(language));
      const choices = preferredAvailable.length ? preferredAvailable : available;
      if (choices.length > 1) {
        setPendingChoice({ kind: "movie", query: movieQuery, languages: choices });
        setMessages((items) => [
          ...items,
          { role: "user", text },
          { role: "ai", text: `${movieQuery} has songs in multiple languages. Which one do you want: ${choices.join(", ")}?` }
        ]);
        setDraft("");
        return;
      }
      const found = searchMusicCatalog(movieQuery, choices.length ? choices : user.languages, "movie");
      publishResults(text, found, found.length ? `I found songs from ${movieQuery}.` : `I could not find songs from ${movieQuery} in the catalog yet.`);
      setDraft("");
      return;
    }

    const singerQuery = extractSingerQuery(text);
    if (singerQuery) {
      const found = searchMusicCatalog(singerQuery, user.languages, "singer");
      publishResults(text, found, found.length ? `I found songs by ${singerQuery}.` : `I could not find songs by ${singerQuery} in your selected languages.`);
      setDraft("");
      return;
    }

    const songQuery = extractSongQuery(text);
    if (songQuery) {
      const found = await searchSong(songQuery, user.languages);
      publishResults(text, found, found.length
        ? `I found ${found.length} matching result${found.length === 1 ? "" : "s"} for "${songQuery}".`
        : `I could not find "${songQuery}" in your selected languages. Try the song title with the artist or movie name.`
      );
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

  function publishResults(userText, found, response) {
    found.forEach((track) => recordPlayed(user.id, track, "Search"));
    setResults(found);
    setMessages((items) => [
      ...items,
      { role: "user", text: userText },
      { role: "ai", text: response }
    ]);
    onActivity?.();
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
              <a
                key={track.id}
                href={track.spotifyUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-white/10 bg-white/10 p-3 transition hover:bg-white/20"
              >
                <img src={track.albumArt} alt="" className="mb-3 aspect-square w-full rounded-xl object-cover" />
                <p className="font-black text-white">{track.title}</p>
                <p className="text-sm text-white/55">{track.artist}</p>
                {track.movie && <p className="text-sm text-white/55">Movie: {track.movie}</p>}
                {track.singer && <p className="text-sm text-white/55">Singer: {track.singer}</p>}
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

function extractMovieQuery(text) {
  const cleaned = text.trim();
  const patterns = [
    /(?:songs|music|tracks)\s+from\s+(.+?)$/i,
    /(?:from|movie|film)\s+(.+?)\s+(?:songs|music|tracks)$/i,
    /(?:give me|recommend|show me)\s+(?:songs|music|tracks)\s+from\s+(.+?)$/i
  ];
  const match = patterns.map((pattern) => cleaned.match(pattern)).find(Boolean);
  return match ? match[1].replace(/\bmovie\b/i, "").trim() : "";
}

function extractSingerQuery(text) {
  const cleaned = text.trim();
  const patterns = [
    /(?:songs|music|tracks)\s+by\s+(.+?)$/i,
    /(?:singer|artist)\s+(.+?)\s+(?:songs|music|tracks)$/i,
    /(?:give me|recommend|show me)\s+(.+?)\s+songs$/i
  ];
  const match = patterns.map((pattern) => cleaned.match(pattern)).find(Boolean);
  if (!match) return "";
  const value = match[1].trim();
  return /kgf|rrr|sholay|brahmastra|fukrey/i.test(value) ? "" : value;
}
