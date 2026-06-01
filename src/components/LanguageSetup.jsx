import { useState } from "react";
import { motion } from "framer-motion";
import { languageOptions, saveLanguagePreferences } from "../services/api";
import Icon from "./Icon";

export function LanguageSetup({ user, onComplete }) {
  const [languages, setLanguages] = useState(["English"]);

  function toggle(language) {
    setLanguages((items) => {
      const next = items.includes(language) ? items.filter((item) => item !== language) : [...items, language];
      return next.length ? next : ["English"];
    });
  }

  function submit(event) {
    event.preventDefault();
    onComplete(saveLanguagePreferences(user.id, languages));
  }

  return (
    <main className="login-shell min-h-screen overflow-hidden text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-br from-amber-300 via-rose-500 to-indigo-950" />
      <div className="grain" />
      <section className="mx-auto grid min-h-screen w-[min(980px,calc(100%-32px))] place-items-center py-10">
        <motion.form initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} onSubmit={submit} className="panel w-full max-w-2xl">
          <div className="mb-5 grid h-12 w-12 place-items-center rounded-full bg-white text-zinc-950 shadow-glow">
            <Icon name="Spark" />
          </div>
          <p className="eyebrow">First listen</p>
          <h1 className="mt-2 text-5xl font-black leading-none text-white">Choose your languages.</h1>
          <p className="mt-4 text-white/65">MoodMuse will use these for mood recommendations and song searches. You can edit them later inside the app.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            {languageOptions.map((language) => {
              const active = languages.includes(language);
              return (
                <button
                  key={language}
                  type="button"
                  onClick={() => toggle(language)}
                  className={`rounded-full border px-5 py-3 text-sm font-black transition ${active ? "border-white bg-white text-zinc-950" : "border-white/15 bg-white/10 text-white hover:bg-white/20"}`}
                >
                  {language}
                </button>
              );
            })}
          </div>
          <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 font-black text-zinc-950 transition hover:scale-[1.01]">
            <Icon name="Spark" />
            Enter MoodMuse
          </button>
        </motion.form>
      </section>
    </main>
  );
}
