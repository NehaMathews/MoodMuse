import { useState } from "react";
import { motion } from "framer-motion";
import { loginUser } from "../services/api";
import { languageOptions } from "../services/api";
import Icon from "./Icon";

export function Login({ onLogin }) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [languages, setLanguages] = useState(["English"]);
  const [error, setError] = useState("");

  function submit(event) {
    event.preventDefault();
    try {
      const user = loginUser(userId, password, languages);
      onLogin(user);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="login-shell min-h-screen overflow-hidden text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-br from-fuchsia-700 via-indigo-950 to-black" />
      <div className="grain" />
      <section className="mx-auto grid min-h-screen w-[min(1100px,calc(100%-32px))] items-center gap-10 py-10 lg:grid-cols-[1fr_.9fr]">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/80 backdrop-blur-xl">
            <Icon name="Spark" className="h-4 w-4" />
            Private mood profile
          </div>
          <h1 className="text-balance text-6xl font-black leading-[.9] md:text-8xl">Welcome to MoodMuse</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">
            Sign in with a user id and password so moods, previews, and dashboard insights stay attached to your own account.
          </p>
        </motion.div>
        <motion.form initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} onSubmit={submit} className="panel">
          <p className="eyebrow">Login</p>
          <h2 className="panel-title">Open your listening room.</h2>
          <label className="mt-6 block text-sm font-bold text-white/70" htmlFor="userId">User id</label>
          <input
            id="userId"
            value={userId}
            onChange={(event) => setUserId(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-white outline-none focus:border-white/35"
            placeholder="neha"
            autoComplete="username"
          />
          <label className="mt-4 block text-sm font-bold text-white/70" htmlFor="password">Password</label>
          <input
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-white outline-none focus:border-white/35"
            placeholder="Enter password"
            type="password"
            autoComplete="current-password"
          />
          <div className="mt-5">
            <p className="text-sm font-bold text-white/70">Preferred languages</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {languageOptions.map((language) => {
                const active = languages.includes(language);
                return (
                  <button
                    key={language}
                    type="button"
                    onClick={() => setLanguages((items) => active ? items.filter((item) => item !== language) : [...items, language])}
                    className={`rounded-full border px-4 py-2 text-sm font-bold transition ${active ? "border-white bg-white text-zinc-950" : "border-white/15 bg-white/10 text-white hover:bg-white/20"}`}
                  >
                    {language}
                  </button>
                );
              })}
            </div>
          </div>
          {error && <p className="mt-4 rounded-2xl bg-red-500/20 px-4 py-3 text-sm text-red-100">{error}</p>}
          <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 font-black text-zinc-950 transition hover:scale-[1.01]">
            <Icon name="Spark" />
            Continue
          </button>
          <p className="mt-4 text-sm leading-6 text-white/55">
            This demo keeps login data in your browser storage for local user separation.
          </p>
        </motion.form>
      </section>
    </main>
  );
}
