import { motion } from "framer-motion";
import Icon from "./Icon";

const words = ["happy", "heartbroken", "focused", "electric", "quiet", "in love"];

export function Hero({ mood, theme, playlist }) {
  return (
    <section id="home" className="mx-auto grid min-h-[82vh] w-[min(1180px,calc(100%-32px))] items-center gap-10 pb-14 pt-16 lg:grid-cols-[1.05fr_.95fr]">
      <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/80 backdrop-blur-xl">
          <Icon name="Pulse" className="h-4 w-4" />
          Emotion-aware music, live and personal
        </div>
        <h1 className="text-balance text-6xl font-black leading-[.9] text-white drop-shadow-2xl md:text-8xl">
          Music for every emotion
        </h1>
        <div className="mt-5 h-9 overflow-hidden text-2xl font-semibold text-white/80 md:text-3xl">
          <motion.div animate={{ y: words.map((_, i) => -i * 36) }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}>
            {words.map((word) => (
              <div key={word} className="h-9">when you feel {word}</div>
            ))}
          </motion.div>
        </div>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
          MoodMuse reads the room, your words, or your camera signal, then builds a cinematic soundtrack that matches the feeling.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href="#moods" className="glow-button" style={{ "--accent": theme.accent }}>
            <Icon name="Spark" />
            Start listening
          </a>
          <a href="#dashboard" className="rounded-full border border-white/20 bg-white/10 px-6 py-3 font-bold text-white backdrop-blur-xl transition hover:bg-white/20">
            View pulse
          </a>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, scale: 0.92, rotate: -2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.9 }} className="relative">
        <div className="hero-vinyl">
          <div className="vinyl animate-spinSlow">
            <div className="vinyl-label" style={{ background: theme.accent }}>
              <Icon name="Spark" className="h-9 w-9 text-black/80" />
            </div>
          </div>
          <div className="absolute bottom-8 left-8 right-8 rounded-3xl border border-white/20 bg-black/25 p-5 text-white shadow-aura backdrop-blur-2xl">
            <p className="text-sm uppercase tracking-[.28em] text-white/50">Now generating</p>
            <h2 className="mt-2 text-3xl font-black">{playlist}</h2>
            <p className="mt-2 text-white/60">{mood} mood mix</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
