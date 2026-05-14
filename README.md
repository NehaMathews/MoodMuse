# MoodMuse

MoodMuse is a premium mood-based music recommender built with React, Vite, Tailwind CSS, Framer Motion, Express, MongoDB, Recharts, Axios, and a Spotify-ready API layer.

## Features

- Cinematic animated landing page with adaptive mood themes
- Mood buttons for Happy, Sad, Angry, Relaxed, Motivated, Heartbroken, Focused, Romantic, Energetic, and Lonely
- Text mood analyzer with lightweight sentiment and keyword detection
- Webcam emotion panel with animated live confidence bars
- Music recommendation cards with album art, mood score, energy, popularity, preview state, and Spotify search links
- AI playlist name generator
- Live waveform, particle visualizer, spinning vinyl, sad rain effect, romantic floating hearts
- Dashboard with weekly emotion chart, top moods, favorite genres, recent songs, and mood calendar heatmap
- AI music assistant
- Dark/light theme switcher
- Express API with MongoDB schema and Spotify API fallback
- Optional `face-api.js` expression detection when model files are placed in `public/models`

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:5000/api`

## Environment

```bash
VITE_API_URL=http://localhost:5000/api
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/moodmuse
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
```

Spotify credentials are optional. Without them, MoodMuse serves realistic mock recommendations so the app works immediately.

MongoDB is optional for first run. If `MONGODB_URI` is not available or MongoDB is offline, the API uses in-memory mood history fallbacks.

## API

- `GET /api/health`
- `POST /api/moods`
- `GET /api/recommendations/:mood`
- `GET /api/dashboard`

## Structure

```text
src/
  components/
  data/
  hooks/
  services/
server/
  models/
  index.js
  mockTracks.js
```

## Notes

The camera panel uses the browser webcam API and attempts `face-api.js` expression detection from `/models`. If model files are not present, it falls back to an animated confidence engine so the experience remains functional during demos.
