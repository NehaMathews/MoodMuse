import { useState } from "react";
import { motion } from "framer-motion";
import { analyzeMoodText } from "../services/api";
import Icon from "./Icon";

export function TextAnalyzer({ onDetect, mood }) {
  const [text, setText] = useState("I feel like I need a beautiful reset tonight");

  function submit(event) {
    event.preventDefault();
    onDetect(analyzeMoodText(text), "text");
  }

  return (
    <motion.form
      onSubmit={submit}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="panel"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="eyebrow">Text analyzer</p>
          <h3 className="panel-title">Tell MoodMuse what happened.</h3>
        </div>
        <span className="status-pill">{mood}</span>
      </div>
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        rows="4"
        className="mt-5 w-full resize-none rounded-3xl border border-white/10 bg-white/10 p-4 text-white outline-none transition placeholder:text-white/35 focus:border-white/35 focus:bg-white/15"
        placeholder="I had a stressful day..."
      />
      <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 font-black text-zinc-950 transition hover:scale-[1.01]">
        <Icon name="Spark" />
        Analyze mood
      </button>
    </motion.form>
  );
}
