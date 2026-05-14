import axios from "axios";
import { fallbackTracks, playlistNames } from "../data/moods";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 3000
});

const cover = (mood, index) =>
  `https://images.unsplash.com/photo-${[
    "1516280440614-37939bbacd81",
    "1493225457124-a3eb161ffa5f",
    "1500530855697-b586d89ba3ee",
    "1470225620780-dba8ba36b745",
    "1511379938547-c1f69419868d"
  ][index % 5]}?auto=format&fit=crop&w=600&q=80&sat=15&sig=${mood}-${index}`;

const localTracks = (mood) =>
  (fallbackTracks[mood] || fallbackTracks.Happy).map(([title, artist, moodScore, energy, popularity], index) => ({
    id: `${mood}-${index}`,
    title,
    artist,
    moodScore,
    energy,
    popularity,
    albumArt: cover(mood, index),
    previewUrl: "",
    spotifyUrl: "https://open.spotify.com/search/" + encodeURIComponent(`${title} ${artist}`),
    genre: ["Dream Pop", "R&B", "Indie", "Electronic", "Soul"][index % 5]
  }));

export async function getRecommendations(mood) {
  try {
    const { data } = await api.get(`/recommendations/${mood}`);
    return data.tracks?.length ? data.tracks : localTracks(mood);
  } catch {
    return localTracks(mood);
  }
}

export async function saveMood(payload) {
  try {
    await api.post("/moods", payload);
  } catch {
    localStorage.setItem("moodmuse:lastMood", JSON.stringify(payload));
  }
}

export async function getDashboard() {
  try {
    const { data } = await api.get("/dashboard");
    return data;
  } catch {
    return {
      summary: "Your week is trending introspective with bursts of high-energy recovery.",
      weekly: [
        { day: "Mon", Happy: 4, Sad: 2, Focused: 6 },
        { day: "Tue", Happy: 3, Relaxed: 5, Lonely: 2 },
        { day: "Wed", Motivated: 7, Focused: 5, Angry: 1 },
        { day: "Thu", Romantic: 4, Happy: 5, Relaxed: 3 },
        { day: "Fri", Energetic: 8, Happy: 6, Focused: 2 },
        { day: "Sat", Heartbroken: 3, Sad: 4, Lonely: 4 },
        { day: "Sun", Relaxed: 8, Romantic: 2, Focused: 3 }
      ],
      topMoods: [
        { name: "Focused", value: 28 },
        { name: "Happy", value: 24 },
        { name: "Relaxed", value: 20 },
        { name: "Energetic", value: 15 }
      ],
      genres: ["Dream Pop", "Lo-fi", "R&B", "House", "Indie"],
      heatmap: Array.from({ length: 35 }, (_, i) => (i * 7 + 13) % 9)
    };
  }
}

export function generatePlaylist(mood) {
  const seed = mood.length + new Date().getDate();
  return `${playlistNames[seed % playlistNames.length]}: ${mood} Edition`;
}

export function analyzeMoodText(text) {
  const value = text.toLowerCase();
  const tests = [
    [/stress|tired|calm|peace|slow|breathe|quiet/, "Relaxed"],
    [/alone|lonely|empty|miss|night/, "Lonely"],
    [/break|heart|cry|lost|goodbye|hurt/, "Heartbroken"],
    [/angry|rage|mad|furious|annoyed/, "Angry"],
    [/love|date|kiss|romantic|crush/, "Romantic"],
    [/work|study|focus|deadline|code|exam/, "Focused"],
    [/gym|win|drive|hustle|motivated/, "Motivated"],
    [/party|energy|dance|run|excited/, "Energetic"],
    [/sad|blue|down|depressed|rain/, "Sad"],
    [/happy|great|joy|smile|sun|good/, "Happy"]
  ];
  return tests.find(([regex]) => regex.test(value))?.[1] || "Focused";
}
