import { useEffect, useState } from "react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";
import { getDashboard } from "../services/api";

export function Dashboard({ theme, tracks, user, mood, activityVersion }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    getDashboard(user.id).then(setData);
  }, [user.id, mood, tracks, activityVersion]);

  if (!data) return <section id="dashboard" className="section"><div className="panel h-80 skeleton" /></section>;

  const colors = [theme.accent, "#ffffff", "#70e1ff", "#ff8db8", "#a9ff68"];

  return (
    <section id="dashboard" className="section">
      <div className="section-head">
        <span>Dashboard</span>
        <h2>Your emotional listening map.</h2>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="panel lg:col-span-2">
          <p className="eyebrow">Weekly emotion chart</p>
          <div className="mt-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.weekly}>
                <XAxis dataKey="day" stroke="rgba(255,255,255,.55)" />
                <YAxis stroke="rgba(255,255,255,.35)" />
                <Tooltip contentStyle={{ background: "rgba(10,10,16,.9)", border: "1px solid rgba(255,255,255,.14)", borderRadius: 18 }} />
                <Line type="monotone" dataKey={mood} stroke={theme.accent} strokeWidth={4} dot={false} />
                <Line type="monotone" dataKey="Focused" stroke="#fff" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="Relaxed" stroke="#70e1ff" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="panel">
          <p className="eyebrow">Most listened moods</p>
          <div className="mt-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data.topMoods} dataKey="value" nameKey="name" innerRadius={58} outerRadius={92} paddingAngle={5}>
                  {data.topMoods.map((entry, i) => <Cell key={entry.name} fill={colors[i % colors.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "rgba(10,10,16,.9)", border: "1px solid rgba(255,255,255,.14)", borderRadius: 18 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="panel">
          <p className="eyebrow">Favorite genres</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {data.genres.map((genre) => <span className="status-pill" key={genre}>{genre}</span>)}
          </div>
          <p className="mt-8 text-2xl font-black leading-tight text-white">{data.summary}</p>
        </div>
        <div className="panel">
          <p className="eyebrow">Mood calendar</p>
          <div className="mt-5 grid grid-cols-7 gap-2">
            {data.heatmap.map((value, i) => (
              <span key={i} className="aspect-square rounded-lg border border-white/10" style={{ background: `color-mix(in srgb, ${theme.accent} ${20 + value * 8}%, rgba(255,255,255,.07))` }} />
            ))}
          </div>
        </div>
        <div className="panel">
          <p className="eyebrow">Recently played</p>
          <div className="mt-5 space-y-3">
            {(data.recentSongs || []).slice(0, 5).map((track) => (
              <a key={`${track.id}-${track.playedAt || track.spotifyUrl}`} href={track.spotifyUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl bg-white/10 p-3 transition hover:bg-white/15">
                <img src={track.albumArt} alt="" className="h-12 w-12 rounded-xl object-cover" />
                <div>
                  <p className="font-bold text-white">{track.title}</p>
                  <p className="text-sm text-white/50">{track.artist} {track.language ? `- ${track.language}` : ""}</p>
                </div>
              </a>
            ))}
            {!data.recentSongs?.length && <p className="rounded-2xl bg-white/10 p-4 text-sm text-white/55">Play a preview or open an assistant search result to start this list.</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
