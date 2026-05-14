import { motion } from "framer-motion";

export function Ambience({ mood, theme }) {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        key={mood}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`absolute inset-0 bg-gradient-to-br ${theme.gradient}`}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,.22),transparent_32%),linear-gradient(120deg,rgba(0,0,0,.48),rgba(0,0,0,.18)_44%,rgba(0,0,0,.58))]" />
      <motion.div
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 opacity-50 mix-blend-screen mesh"
      />
      <div className="grain" />
      {mood === "Sad" && <Rain />}
      {mood === "Romantic" && <Hearts />}
    </div>
  );
}

function Rain() {
  return (
    <div className="absolute inset-0 opacity-50">
      {Array.from({ length: 42 }).map((_, i) => (
        <span
          key={i}
          className="rain-line"
          style={{ left: `${(i * 37) % 100}%`, animationDelay: `${(i % 8) * 0.15}s`, height: `${40 + (i % 5) * 18}px` }}
        />
      ))}
    </div>
  );
}

function Hearts() {
  return (
    <div className="absolute inset-0">
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-pink-100/45"
          style={{ left: `${(i * 29) % 100}%`, top: `${96 - ((i * 11) % 70)}%` }}
          animate={{ y: [-10, -90], opacity: [0, 0.7, 0], rotate: [-8, 12] }}
          transition={{ duration: 5 + (i % 4), repeat: Infinity, delay: i * 0.35 }}
        >
          ♥
        </motion.span>
      ))}
    </div>
  );
}
