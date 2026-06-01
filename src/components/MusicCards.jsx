import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Icon from "./Icon";
import { recordPlayed } from "../services/api";

export function MusicCards({ tracks, theme, mood, user, onPlayed }) {
  const [playing, setPlaying] = useState(null);
  const audioRef = useRef(null);

  function playTrack(track) {
    if (!track.previewUrl) {
      window.open(track.spotifyUrl, "_blank", "noopener,noreferrer");
      return;
    }
    if (playing === track.id) {
      audioRef.current?.pause();
      setPlaying(null);
      return;
    }
    audioRef.current?.pause();
    const audio = new Audio(track.previewUrl);
    audio.currentTime = 0;
    audio.volume = 0.55;
    audioRef.current = audio;
    setPlaying(track.id);
    recordPlayed(user.id, track, mood);
    onPlayed?.();
    audio.play().catch(() => {
      setPlaying(null);
      window.open(track.spotifyUrl, "_blank", "noopener,noreferrer");
    });
    setTimeout(() => {
      if (audioRef.current === audio) {
        audio.pause();
        setPlaying(null);
      }
    }, 30000);
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {tracks.map((track, index) => (
        <motion.article
          key={track.id}
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.08 }}
          whileHover={{ y: -8 }}
          className="music-card"
        >
          <div className="relative aspect-square overflow-hidden rounded-[1.4rem]">
            <img src={track.albumArt} alt="" className="h-full w-full object-cover transition duration-700 hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <button
              onClick={() => playTrack(track)}
              className="absolute bottom-4 right-4 grid h-12 w-12 place-items-center rounded-full bg-white text-zinc-950 shadow-glow"
              aria-label="Play preview"
              type="button"
            >
            <Icon name={playing === track.id ? "Pause" : "Play"} className="h-5 w-5" />
            </button>
            {!track.previewUrl && <span className="absolute bottom-4 left-4 rounded-full bg-black/60 px-3 py-2 text-xs font-bold text-white">Spotify only</span>}
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-black text-white">{track.title}</h3>
            <p className="text-white/55">{track.artist}</p>
            {track.language && <p className="mt-1 text-xs font-black uppercase tracking-[.18em] text-white/40">{track.language}</p>}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
            <Metric label="Mood" value={track.moodScore} />
            <Metric label="Energy" value={track.energy} />
            <Metric label="Pop" value={track.popularity} />
          </div>
          <a href={track.spotifyUrl} target="_blank" rel="noreferrer" className="mt-4 flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 font-bold text-white transition hover:bg-white/15">
            <Icon name="Link" className="h-4 w-4" />
            Play full song on Spotify
          </a>
          {playing === track.id && <TinyWave color={theme.accent} />}
        </motion.article>
      ))}
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-2xl bg-white/10 px-2 py-3">
      <div className="font-black text-white">{value}</div>
      <div className="text-white/45">{label}</div>
    </div>
  );
}

function TinyWave({ color }) {
  return (
    <div className="mt-4 flex h-10 items-end gap-1">
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.span
          key={i}
          className="w-1 rounded-full"
          style={{ background: color }}
          animate={{ height: [8, 10 + ((i * 7) % 30), 8] }}
          transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.03 }}
        />
      ))}
    </div>
  );
}
