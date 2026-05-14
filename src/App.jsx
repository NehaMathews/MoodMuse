import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Ambience } from "./components/Ambience";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { MoodSelector } from "./components/MoodSelector";
import { TextAnalyzer } from "./components/TextAnalyzer";
import { FaceEmotion } from "./components/FaceEmotion";
import { MusicCards } from "./components/MusicCards";
import { Visualizer } from "./components/Visualizer";
import { Dashboard } from "./components/Dashboard";
import { Assistant } from "./components/Assistant";
import { generatePlaylist, getRecommendations, saveMood } from "./services/api";
import { moods } from "./data/moods";

export default function App() {
  const [mood, setMood] = useState("Happy");
  const [source, setSource] = useState("button");
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dark, setDark] = useState(true);
  const theme = moods[mood];
  const playlist = useMemo(() => generatePlaylist(mood), [mood]);

  const selectMood = useCallback((nextMood, nextSource = "button") => {
    setMood(nextMood);
    setSource(nextSource);
    saveMood({ mood: nextMood, source: nextSource, at: new Date().toISOString() });
  }, []);

  useEffect(() => {
    setLoading(true);
    getRecommendations(mood).then((items) => {
      setTracks(items);
      setLoading(false);
    });
  }, [mood]);

  return (
    <main className={`${dark ? "dark" : "light"} min-h-screen overflow-hidden text-white`}>
      <Ambience mood={mood} theme={theme} />
      <CursorGlow color={theme.accent} />
      <Header dark={dark} setDark={setDark} />
      <Hero mood={mood} theme={theme} playlist={playlist} />
      <MoodSelector current={mood} onSelect={selectMood} />
      <section className="section grid gap-5 lg:grid-cols-2">
        <TextAnalyzer onDetect={selectMood} mood={mood} />
        <FaceEmotion onDetect={selectMood} theme={theme} />
      </section>
      <section className="section">
        <div className="section-head">
          <span>Recommendations</span>
          <h2>{playlist}</h2>
          <p>Detected from {source} input.</p>
        </div>
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div key="loading" exit={{ opacity: 0 }} className="grid gap-4 md:grid-cols-3">
              {[0, 1, 2].map((item) => <div key={item} className="h-[470px] rounded-[1.5rem] skeleton" />)}
            </motion.div>
          ) : (
            <motion.div key={mood} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <MusicCards tracks={tracks} theme={theme} />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      <Visualizer mood={mood} theme={theme} />
      <Dashboard theme={theme} tracks={tracks} />
      <Assistant mood={mood} playlist={playlist} onMood={selectMood} />
      <footer className="mx-auto w-[min(1180px,calc(100%-32px))] pb-10 pt-4 text-center text-sm text-white/50">
        MoodMuse blends sentiment, mood analytics, and music curation into one emotional interface.
      </footer>
    </main>
  );
}

function CursorGlow({ color }) {
  const [pos, setPos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const move = (event) => setPos({ x: event.clientX, y: event.clientY });
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed z-50 hidden h-20 w-20 rounded-full blur-2xl md:block"
      style={{ background: color }}
      animate={{ x: pos.x - 40, y: pos.y - 40, opacity: 0.28 }}
      transition={{ type: "spring", stiffness: 90, damping: 24 }}
    />
  );
}
