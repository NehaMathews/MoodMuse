import { motion } from "framer-motion";
import Icon from "./Icon";
import { useClock } from "../hooks/useClock";

export function Header({ dark, setDark, user, onLogout }) {
  const clock = useClock();

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-4 z-40 mx-auto flex w-[min(1180px,calc(100%-32px))] items-center justify-between rounded-full border border-white/15 bg-white/10 px-4 py-3 shadow-aura backdrop-blur-2xl"
    >
      <a href="#home" className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-zinc-950 shadow-glow">
          <Icon name="Spark" />
        </span>
        <span className="text-lg font-black tracking-wide text-white">MoodMuse</span>
      </a>
      <nav className="hidden items-center gap-6 text-sm font-medium text-white/75 md:flex">
        <a href="#moods">Moods</a>
        <a href="#studio">Studio</a>
        <a href="#dashboard">Dashboard</a>
        <a href="#assistant">Assistant</a>
      </nav>
      <div className="flex items-center gap-2">
        <span className="hidden rounded-full border border-white/15 px-3 py-2 text-sm text-white/80 md:block">{user.name} - {(user.languages || ["English"]).join(", ")}</span>
        <span className="hidden rounded-full border border-white/15 px-3 py-2 text-sm text-white/80 sm:block">{clock}</span>
        <button
          onClick={() => setDark((value) => !value)}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20"
          aria-label="Toggle theme"
        >
          <Icon name={dark ? "Sun" : "Moon"} />
        </button>
        <button onClick={onLogout} className="hidden rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/20 sm:block" type="button">
          Logout
        </button>
      </div>
    </motion.header>
  );
}
