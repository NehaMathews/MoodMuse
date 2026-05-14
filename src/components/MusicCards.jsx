import { useState } from "react";
import { motion } from "framer-motion";
import Icon from "./Icon";

export function MusicCards({ tracks, theme }) {
  const [playing, setPlaying] = useState(null);

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
              onClick={() => setPlaying(playing === track.id ? null : track.id)}
              className="absolute bottom-4 right-4 grid h-12 w-12 place-items-center rounded-full bg-white text-zinc-950 shadow-glow"
              aria-label="Play preview"
            >
              <Icon name={playing === track.id ? "Pause" : "Play"} className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-black text-white">{track.title}</h3>
            <p className="text-white/55">{track.artist}</p>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
            <Metric label="Mood" value={track.moodScore} />
            <Metric label="Energy" value={track.energy} />
            <Metric label="Pop" value={track.popularity} />
          </div>
          <a href={track.spotifyUrl} target="_blank" rel="noreferrer" className="mt-4 flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 font-bold text-white transition hover:bg-white/15">
            <Icon name="Link" className="h-4 w-4" />
            Spotify
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
