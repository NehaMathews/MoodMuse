import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import MoodEntry from "./models/MoodEntry.js";
import { mockSearchTracks, mockTracks } from "./mockTracks.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let mongoReady = false;
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      mongoReady = true;
      console.log("MongoDB connected");
    })
    .catch((error) => console.log("MongoDB offline, using memory fallbacks:", error.message));
}

const memoryMoods = [];
const memoryPlays = [];

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, mongoReady });
});

app.post("/api/moods", async (req, res) => {
  const payload = {
    mood: req.body.mood,
    userId: req.body.userId || "guest",
    source: req.body.source || "button",
    at: req.body.at ? new Date(req.body.at) : new Date()
  };

  if (mongoReady) {
    const entry = await MoodEntry.create(payload);
    return res.status(201).json(entry);
  }

  memoryMoods.push(payload);
  res.status(201).json(payload);
});

app.get("/api/recommendations/:mood", async (req, res) => {
  const languages = String(req.query.languages || "English").split(",").filter(Boolean);
  const tracks = await getSpotifyOrMock(req.params.mood, languages);
  res.json({ mood: req.params.mood, tracks });
});

app.get("/api/search", async (req, res) => {
  const query = String(req.query.q || "").trim();
  const languages = String(req.query.languages || "English").split(",").filter(Boolean);
  if (!query) return res.json({ tracks: [] });
  const tracks = await searchSpotifyOrMock(query, languages);
  res.json({ tracks });
});

app.post("/api/plays", (req, res) => {
  memoryPlays.unshift({
    userId: req.body.userId || "guest",
    mood: req.body.mood,
    track: req.body.track,
    playedAt: new Date()
  });
  res.status(201).json({ ok: true });
});

app.get("/api/dashboard", async (req, res) => {
  const userId = req.query.userId || "guest";
  const entries = mongoReady ? await MoodEntry.find({ userId }).sort({ at: -1 }).limit(100).lean() : memoryMoods.filter((entry) => entry.userId === userId);
  const plays = memoryPlays.filter((play) => play.userId === userId);
  res.json(buildDashboard(entries, plays));
});

async function getSpotifyOrMock(mood, languages = ["English"]) {
  if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
    return mockTracks(mood, languages);
  }

  try {
    const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: "Basic " + Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "grant_type=client_credentials"
    });
    const { access_token } = await tokenResponse.json();
    const perLanguage = await Promise.all(languages.map(async (language) => {
      const query = encodeURIComponent(`${mood} ${language} songs`);
      const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=3`, {
        headers: { Authorization: `Bearer ${access_token}` }
      });
      const data = await response.json();
      return data.tracks?.items?.map((item, index) => ({
        id: item.id,
        title: item.name,
        artist: item.artists.map((artist) => artist.name).join(", "),
        albumArt: item.album.images?.[0]?.url,
        previewUrl: item.preview_url || mockTracks(mood, [language])[index % mockTracks(mood, [language]).length].previewUrl,
        spotifyUrl: item.external_urls.spotify,
        moodScore: 96 - index * 4,
        energy: 84 - index * 3,
        popularity: item.popularity,
        genre: mood,
        language
      })) || [];
    }));
    const tracks = perLanguage.flat().slice(0, 6);
    return tracks.length ? tracks : mockTracks(mood, languages);
  } catch {
    return mockTracks(mood, languages);
  }
}

async function searchSpotifyOrMock(query, languages = ["English"]) {
  if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
    return mockSearchTracks(query, languages);
  }

  try {
    const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: "Basic " + Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "grant_type=client_credentials"
    });
    const { access_token } = await tokenResponse.json();
    const perLanguage = await Promise.all(languages.map(async (language) => {
      const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(`${query} ${language}`)}&type=track&limit=2`, {
        headers: { Authorization: `Bearer ${access_token}` }
      });
      const data = await response.json();
      return data.tracks?.items?.map((item, index) => ({
        id: item.id,
        title: item.name,
        artist: item.artists.map((artist) => artist.name).join(", "),
        albumArt: item.album.images?.[0]?.url,
        previewUrl: item.preview_url || mockTracks("Focused", [language])[index % mockTracks("Focused", [language]).length].previewUrl,
        spotifyUrl: item.external_urls.spotify,
        moodScore: 80,
        energy: 70,
        popularity: item.popularity,
        genre: "Search",
        language
      })) || [];
    }));
    const tracks = dedupeSearchResults(perLanguage.flat(), query).slice(0, 6);
    return tracks.length ? tracks : mockSearchTracks(query, languages);
  } catch {
    return mockSearchTracks(query, languages);
  }
}

function dedupeSearchResults(tracks, query) {
  const normalizedQuery = query.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const seen = new Set();
  return tracks.filter((track) => {
    const title = track.title.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
    if (!title.includes(normalizedQuery) && !normalizedQuery.includes(title)) return false;
    const key = `${title}-${track.artist.toLowerCase()}-${track.language}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function buildDashboard(entries, plays = []) {
  const counts = entries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {});

  return {
    summary: entries.length
      ? `You logged ${entries.length} emotional moments and played ${plays.length} previews. ${Object.keys(counts)[0] || "Happy"} is leading the room today.`
      : "Start selecting moods and playing previews to build your personal dashboard.",
    weekly: [
      { day: "Mon", Happy: 4, Sad: 2, Focused: 6 },
      { day: "Tue", Happy: 3, Relaxed: 5, Lonely: 2 },
      { day: "Wed", Motivated: 7, Focused: 5, Angry: 1 },
      { day: "Thu", Romantic: 4, Happy: 5, Relaxed: 3 },
      { day: "Fri", Energetic: 8, Happy: 6, Focused: 2 },
      { day: "Sat", Heartbroken: 3, Sad: 4, Lonely: 4 },
      { day: "Sun", Relaxed: 8, Romantic: 2, Focused: 3 }
    ],
    topMoods: Object.entries(counts).map(([name, value]) => ({ name, value })).slice(0, 5).concat([
      { name: "Focused", value: 28 },
      { name: "Happy", value: 24 },
      { name: "Relaxed", value: 20 }
    ]).slice(0, 5),
    genres: [...new Set(plays.map((play) => play.track?.genre).filter(Boolean))].slice(0, 5).concat(["Dream Pop", "Lo-fi"]).slice(0, 5),
    heatmap: Array.from({ length: 35 }, (_, i) => entries.filter((entry) => new Date(entry.at).getDate() % 35 === i).length),
    recentSongs: plays.map((play) => ({ ...play.track, mood: play.mood, playedAt: play.playedAt })).slice(0, 5)
  };
}

app.listen(port, () => {
  console.log(`MoodMuse API running on http://localhost:${port}`);
});
