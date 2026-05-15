import { languageOptions, saveLanguagePreferences } from "../services/api";

export function LanguagePreferences({ user, onUpdate }) {
  const selected = user.languages?.length ? user.languages : ["English"];

  function toggle(language) {
    const next = selected.includes(language)
      ? selected.filter((item) => item !== language)
      : [...selected, language];
    const safeNext = next.length ? next : ["English"];
    onUpdate(saveLanguagePreferences(user.id, safeNext));
  }

  return (
    <section className="section pt-10">
      <div className="panel">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="eyebrow">Language taste</p>
            <h2 className="panel-title">Find mood music in your languages.</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {languageOptions.map((language) => {
              const active = selected.includes(language);
              return (
                <button
                  key={language}
                  type="button"
                  onClick={() => toggle(language)}
                  className={`rounded-full border px-4 py-2 text-sm font-black transition ${active ? "border-white bg-white text-zinc-950" : "border-white/15 bg-white/10 text-white hover:bg-white/20"}`}
                >
                  {language}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
