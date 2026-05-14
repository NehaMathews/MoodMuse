import { motion } from "framer-motion";
import { moodNames, moods } from "../data/moods";
import Icon from "./Icon";

export function MoodSelector({ current, onSelect }) {
  return (
    <section id="moods" className="section">
      <div className="section-head">
        <span>Mood spectrum</span>
        <h2>Choose the emotional frequency.</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {moodNames.map((name, index) => {
          const mood = moods[name];
          const active = current === name;
          return (
            <motion.button
              key={name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.035 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => onSelect(name, "button")}
              className={`group min-h-44 rounded-[1.4rem] border p-[1px] text-left transition ${active ? "border-white/70" : "border-white/15"}`}
            >
              <div className={`relative h-full overflow-hidden rounded-[1.35rem] bg-gradient-to-br ${mood.gradient} p-5 shadow-aura`}>
                <div className="absolute inset-0 bg-black/25 transition group-hover:bg-black/10" />
                <div className="relative flex h-full flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-white/20 text-white backdrop-blur-xl">
                      <Icon name={mood.icon} />
                    </span>
                    <span className="text-3xl">{mood.emoji}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white">{name}</h3>
                    <p className="mt-2 text-sm leading-5 text-white/70">{mood.copy}</p>
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
