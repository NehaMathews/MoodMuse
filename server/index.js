import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import MoodEntry from "./models/MoodEntry.js";
import { mockTracks } from "./mockTracks.js";

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

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, mongoReady });
});

app.post("/api/moods", async (req, res) => {
  const payload = {
    mood: req.body.mood,
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
  const tracks = await getSpotifyOrMock(req.params.mood);
  res.json({ mood: req.params.mood, tracks });
});

app.get("/api/dashboard", async (_req, res) => {
  const entries = mongoReady ? await MoodEntry.find().sort({ at: -1 }).limit(100).lean() : memoryMoods;
  res.json(buildDashboard(entries));
});

async function getSpotifyOrMock(mood) {
  if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
    return mockTracks(mood);
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
    const query = encodeURIComponent(`${mood} mood playlist`);
    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=6`, {
      headers: { Authorization: `Bearer ${access_token}` }
    });
    const data = await response.json();
    const tracks = data.tracks?.items?.map((item, index) => ({
      id: item.id,
      title: item.name,
      artist: item.artists.map((artist) => artist.name).join(", "),
      albumArt: item.album.images?.[0]?.url,
      previewUrl: item.preview_url,
      spotifyUrl: item.external_urls.spotify,
      moodScore: 96 - index * 4,
      energy: 84 - index * 3,
      popularity: item.popularity,
      genre: mood
    }));
    return tracks?.length ? tracks : mockTracks(mood);
  } catch {
    return mockTracks(mood);
  }
}

function buildDashboard(entries) {
  const counts = entries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {});

  return {
    summary: entries.length
      ? `You logged ${entries.length} emotional moments. ${Object.keys(counts)[0] || "Happy"} is leading the room today.`
      : "Your week is trending introspective with bursts of high-energy recovery.",
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
    genres: ["Dream Pop", "Lo-fi", "R&B", "House", "Indie"],
    heatmap: Array.from({ length: 35 }, (_, i) => (i * 7 + 13) % 9)
  };
}

app.listen(port, () => {
  console.log(`MoodMuse API running on http://localhost:${port}`);
});
