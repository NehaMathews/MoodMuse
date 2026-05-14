import { motion } from "framer-motion";
import Icon from "./Icon";

export function Visualizer({ mood, theme }) {
  return (
    <section id="studio" className="section">
      <div className="section-head">
        <span>Live visualizer</span>
        <h2>The room changes with the song.</h2>
      </div>
      <div className="grid gap-5 lg:grid-cols-[.95fr_1.05fr]">
        <div className="panel min-h-[360px] overflow-hidden">
          <div className="relative flex h-full min-h-[320px] items-center justify-center">
            <div className="visual-disc animate-spinSlow" style={{ "--accent": theme.accent }}>
              <div className="visual-disc-core">
                <Icon name="Spark" className="h-10 w-10" />
              </div>
            </div>
            <div className="absolute inset-x-8 bottom-8 flex items-end justify-center gap-2">
              {Array.from({ length: 46 }).map((_, i) => (
                <motion.span
                  key={i}
                  className="w-1.5 rounded-full bg-white"
                  animate={{ height: [18, 46 + ((i * 13) % 110), 22], opacity: [0.38, 0.95, 0.45] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.025 }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="panel relative min-h-[360px] overflow-hidden">
          <div className="particle-field">
            {Array.from({ length: 58 }).map((_, i) => (
              <motion.span
                key={i}
                className="particle"
                style={{ background: i % 3 ? "rgba(255,255,255,.7)" : theme.accent }}
                animate={{
                  x: [0, ((i * 17) % 160) - 80, 0],
                  y: [0, ((i * 23) % 140) - 70, 0],
                  scale: [0.7, 1.4, 0.8],
                  opacity: [0.2, 0.8, 0.25]
                }}
                transition={{ duration: 4 + (i % 7), repeat: Infinity, delay: i * 0.05 }}
              />
            ))}
          </div>
          <div className="relative z-10 flex h-full min-h-[320px] flex-col justify-between">
            <div>
              <p className="eyebrow">Atmosphere</p>
              <h3 className="mt-2 text-5xl font-black text-white">{mood}</h3>
            </div>
            <div className="rounded-3xl border border-white/15 bg-black/20 p-5 backdrop-blur-xl">
              <div className="mb-3 flex items-center justify-between text-white/60">
                <span>Emotional intensity</span>
                <span>87%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, white, ${theme.accent})` }}
                  initial={{ width: 0 }}
                  whileInView={{ width: "87%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
