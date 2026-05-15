import axios from "axios";
import { fallbackTracks, playlistNames } from "../data/moods";

export const languageOptions = ["English", "Hindi", "Malayalam", "Tamil", "Telugu", "Korean", "Spanish"];

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

const previewUrls = [
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
];

const languageSongs = {
  English: {
    Happy: [["Golden Hour Glow", "Luna Vale"], ["Sunroof Cinema", "The Daybreaks"], ["Sweet Motion", "Mika Bloom"]],
    Sad: [["Window Seat Rain", "Noah Ellery"], ["Blue Apartment", "Iris North"], ["Letters I Kept", "June Harbor"]],
    Angry: [["Static Crown", "Red Signal"], ["Break the Glass", "Volt Choir"], ["No Apology", "Kade Riot"]],
    Relaxed: [["Tide Pool", "Arlo Finch"], ["Jade Air", "Moss Theory"], ["Slow Lanterns", "Sora Lake"]],
    Motivated: [["Last Rep", "Nova Run"], ["Elevate", "Kai Circuit"], ["Forward Only", "Atlas Wave"]],
    Heartbroken: [["After the Call", "Maren Grey"], ["Borrowed Hoodie", "Elio Saint"], ["Stay Gone", "The Velvet Hours"]],
    Focused: [["Deep Work 04", "Quiet Machines"], ["Signal Garden", "Nami Code"], ["Clean Lines", "Paper Satellites"]],
    Romantic: [["Rosewater", "Amara Sol"], ["Slow Dancing Neon", "Miles Reverie"], ["Hold the Morning", "Eden Fox"]],
    Energetic: [["Strobe Hearts", "Pixel Rush"], ["Jump Cut", "Viva Neon"], ["Hypercolor", "The Afterlights"]],
    Lonely: [["City Without You", "Avery Night"], ["One Lamp On", "Hollow Avenue"], ["Satellite Room", "Mira Low"]]
  },
  Hindi: {
    Happy: [["Ilahi", "Arijit Singh"], ["Gallan Goodiyaan", "Yashita Sharma"], ["Kar Gayi Chull", "Badshah"]],
    Sad: [["Channa Mereya", "Arijit Singh"], ["Agar Tum Saath Ho", "Alka Yagnik"], ["Phir Le Aya Dil", "Arijit Singh"]],
    Energetic: [["Malhari", "Vishal Dadlani"], ["Zinda", "Siddharth Mahadevan"], ["Sher Aaya Sher", "DIVINE"]],
    Romantic: [["Raabta", "Arijit Singh"], ["Tum Se Hi", "Mohit Chauhan"], ["Kesariya", "Arijit Singh"]],
    Focused: [["Kho Gaye Hum Kahan", "Jasleen Royal"], ["Safarnama", "Lucky Ali"], ["Shaam", "Amit Trivedi"]]
  },
  Malayalam: {
    Happy: [["Malare", "Vijay Yesudas"], ["Pistah", "Shabareesh Varma"], ["Aaro Nenjil", "Gowry Lekshmi"]],
    Sad: [["Cherathukal", "Sushin Shyam"], ["Uyiril Thodum", "Sooraj Santhosh"], ["Parayuvaan", "Sid Sriram"]],
    Energetic: [["Kalippu", "Sushin Shyam"], ["Thudakkam Maangalyam", "Vijay Yesudas"], ["Kudukku", "Vineeth Sreenivasan"]],
    Romantic: [["Pavizha Mazha", "K S Harisankar"], ["Aaradhike", "Sooraj Santhosh"], ["Mizhiyil", "Vineeth Sreenivasan"]]
  },
  Tamil: {
    Happy: [["Vaathi Coming", "Anirudh Ravichander"], ["Arabic Kuthu", "Anirudh Ravichander"], ["Mental Manadhil", "A R Rahman"]],
    Sad: [["Ennodu Nee Irundhaal", "Sid Sriram"], ["New York Nagaram", "A R Rahman"], ["Po Nee Po", "Anirudh Ravichander"]],
    Energetic: [["Aaluma Doluma", "Anirudh Ravichander"], ["Danga Maari", "Dhanush"], ["Surviva", "Anirudh Ravichander"]],
    Romantic: [["Munbe Vaa", "Shreya Ghoshal"], ["Maruvaarthai", "Sid Sriram"], ["Hosanna", "A R Rahman"]]
  },
  Telugu: {
    Happy: [["Butta Bomma", "Armaan Malik"], ["Ramulo Ramula", "Anurag Kulkarni"], ["Mind Block", "Blaaze"]],
    Sad: [["Samajavaragamana", "Sid Sriram"], ["Inkem Inkem", "Sid Sriram"], ["Undiporaadhey", "Sid Sriram"]],
    Energetic: [["Naatu Naatu", "Rahul Sipligunj"], ["Daakko Daakko Meka", "Sivam"], ["Blockbuster", "Shreya Ghoshal"]],
    Romantic: [["Srivalli", "Sid Sriram"], ["Vachindamma", "Sid Sriram"], ["Choosi Chudangane", "Anurag Kulkarni"]]
  },
  Korean: {
    Happy: [["Dynamite", "BTS"], ["After LIKE", "IVE"], ["Feel Special", "TWICE"]],
    Sad: [["Spring Day", "BTS"], ["Breathe", "Lee Hi"], ["Through the Night", "IU"]],
    Energetic: [["God's Menu", "Stray Kids"], ["How You Like That", "BLACKPINK"], ["Fire", "BTS"]],
    Romantic: [["Love Scenario", "iKON"], ["Some", "BOL4"], ["Only", "LeeHi"]]
  },
  Spanish: {
    Happy: [["Vivir Mi Vida", "Marc Anthony"], ["Tacones Rojos", "Sebastian Yatra"], ["La Bicicleta", "Carlos Vives"]],
    Sad: [["Corre", "Jesse & Joy"], ["Amor Eterno", "Rocío Dúrcal"], ["Duele El Corazón", "Enrique Iglesias"]],
    Energetic: [["Titi Me Preguntó", "Bad Bunny"], ["Bailando", "Enrique Iglesias"], ["Danza Kuduro", "Don Omar"]],
    Romantic: [["Eres", "Café Tacvba"], ["Perfecta", "Miranda!"], ["Me Enamora", "Juanes"]]
  }
};

const localTracks = (mood, languages = ["English"]) => {
  const selectedLanguages = languages.length ? languages : ["English"];
  const songs = selectedLanguages.flatMap((language) => {
    const catalog = languageSongs[language] || languageSongs.English;
    const languageFallbackMood = mood === "Relaxed" || mood === "Focused" ? "Romantic" : mood === "Motivated" ? "Energetic" : mood === "Lonely" || mood === "Heartbroken" ? "Sad" : mood;
    const moodSongs = catalog[mood] || catalog[languageFallbackMood] || catalog.Happy || languageSongs.English[mood] || languageSongs.English.Happy;
    return moodSongs.map(([title, artist]) => ({ title, artist, language }));
  });
  return songs.slice(0, 6).map(({ title, artist, language }, index) => {
    const [, , moodScore, energy, popularity] = (fallbackTracks[mood] || fallbackTracks.Happy)[index % 3];
    return {
    id: `${mood}-${index}`,
    title,
    artist,
    moodScore,
    energy,
    popularity,
    albumArt: cover(mood, index),
    previewUrl: previewUrls[index % previewUrls.length],
    spotifyUrl: "https://open.spotify.com/search/" + encodeURIComponent(`${title} ${artist}`),
    genre: ["Dream Pop", "R&B", "Indie", "Electronic", "Soul"][index % 5],
    language
    };
  });
};

export async function getRecommendations(mood, userId, languages = ["English"]) {
  try {
    const { data } = await api.get(`/recommendations/${mood}`, { params: { userId, languages: languages.join(",") } });
    return data.tracks?.length
      ? data.tracks.map((track, index) => ({ ...track, previewUrl: track.previewUrl || previewUrls[index % previewUrls.length] }))
      : localTracks(mood, languages);
  } catch {
    return localTracks(mood, languages);
  }
}

export async function searchSong(query, languages = ["English"]) {
  const cleanQuery = query.trim();
  if (!cleanQuery) return [];
  try {
    const { data } = await api.get("/search", { params: { q: cleanQuery, languages: languages.join(",") } });
    if (data.tracks?.length) return data.tracks;
  } catch {
    // Local fallback below.
  }
  return languages.slice(0, 3).map((language, index) => ({
    id: `search-${language}-${index}`,
    title: cleanQuery,
    artist: `${language} results`,
    moodScore: 82,
    energy: 68,
    popularity: 80,
    albumArt: cover("Focused", index),
    previewUrl: previewUrls[index % previewUrls.length],
    spotifyUrl: "https://open.spotify.com/search/" + encodeURIComponent(`${cleanQuery} ${language}`),
    genre: "Search",
    language
  }));
}

export async function saveMood(payload) {
  saveLocalMood(payload);
  try {
    await api.post("/moods", payload);
  } catch {
    localStorage.setItem("moodmuse:lastMood", JSON.stringify(payload));
  }
}

export async function recordPlayed(userId, track, mood) {
  const key = `moodmuse:plays:${userId}`;
  const plays = JSON.parse(localStorage.getItem(key) || "[]");
  localStorage.setItem(key, JSON.stringify([{ ...track, mood, playedAt: new Date().toISOString() }, ...plays].slice(0, 40)));
  try {
    await api.post("/plays", { userId, track, mood });
  } catch {
    return null;
  }
}

export async function getDashboard(userId) {
  try {
    const { data } = await api.get("/dashboard", { params: { userId } });
    return mergeLocalDashboard(data, userId);
  } catch {
    return buildLocalDashboard(userId);
  }
}

export function loginUser(userId, password, languages = ["English"]) {
  const cleanId = userId.trim().toLowerCase();
  if (!cleanId || !password.trim()) throw new Error("Enter a user id and password.");
  const users = JSON.parse(localStorage.getItem("moodmuse:users") || "{}");
  if (users[cleanId] && users[cleanId].password !== password) {
    throw new Error("That password does not match this user id.");
  }
  users[cleanId] = { ...users[cleanId], password, languages, lastLogin: new Date().toISOString() };
  localStorage.setItem("moodmuse:users", JSON.stringify(users));
  localStorage.setItem("moodmuse:currentUser", cleanId);
  return userFromId(cleanId, users[cleanId]);
}

export function getStoredUser() {
  const id = localStorage.getItem("moodmuse:currentUser");
  const users = JSON.parse(localStorage.getItem("moodmuse:users") || "{}");
  return id ? userFromId(id, users[id]) : null;
}

export function saveLanguagePreferences(userId, languages) {
  const users = JSON.parse(localStorage.getItem("moodmuse:users") || "{}");
  users[userId] = { ...(users[userId] || {}), languages };
  localStorage.setItem("moodmuse:users", JSON.stringify(users));
  return userFromId(userId, users[userId]);
}

export function logoutUser() {
  localStorage.removeItem("moodmuse:currentUser");
}

function saveLocalMood(payload) {
  if (!payload.userId) return;
  const key = `moodmuse:moods:${payload.userId}`;
  const history = JSON.parse(localStorage.getItem(key) || "[]");
  localStorage.setItem(key, JSON.stringify([payload, ...history].slice(0, 120)));
}

function userFromId(id, profile = {}) {
  return {
    id,
    name: id.split(/[._-]/).filter(Boolean).map((part) => part[0].toUpperCase() + part.slice(1)).join(" ") || id,
    languages: profile.languages?.length ? profile.languages : ["English"]
  };
}

function mergeLocalDashboard(remote, userId) {
  const local = buildLocalDashboard(userId);
  return local.hasActivity ? local : { ...local, serverAvailable: Boolean(remote) };
}

function buildLocalDashboard(userId) {
  const moods = JSON.parse(localStorage.getItem(`moodmuse:moods:${userId}`) || "[]");
  const plays = JSON.parse(localStorage.getItem(`moodmuse:plays:${userId}`) || "[]");
  const counts = moods.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {});
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weekly = days.map((day) => ({ day }));
  moods.forEach((entry) => {
    const date = new Date(entry.at);
    const row = weekly[date.getDay()];
    row[entry.mood] = (row[entry.mood] || 0) + 1;
  });
  const topMoods = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, value]) => ({ name, value }));
  const genres = [...new Set(plays.map((play) => play.genre).filter(Boolean))].slice(0, 5);
  const recentMood = moods[0]?.mood || "Focused";
  return {
    hasActivity: moods.length > 0 || plays.length > 0,
    summary: moods.length
      ? `You have logged ${moods.length} moods and played ${plays.length} previews. ${recentMood} is your latest signal.`
      : "Start selecting moods and playing previews to build your personal dashboard.",
    weekly,
    topMoods: topMoods.length ? topMoods : [{ name: "No moods yet", value: 1 }],
    genres: genres.length ? genres : ["No genres played yet"],
    heatmap: Array.from({ length: 35 }, (_, i) => moods.filter((entry) => new Date(entry.at).getDate() % 35 === i).length),
    recentSongs: plays.slice(0, 5)
  };
}

export async function getDashboardLegacy() {
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
  const scores = {
    Happy: 0,
    Sad: 0,
    Angry: 0,
    Relaxed: 0,
    Motivated: 0,
    Heartbroken: 0,
    Focused: 0,
    Romantic: 0,
    Energetic: 0,
    Lonely: 0
  };
  const lexicon = {
    Happy: ["happy", "joy", "smile", "good", "great", "sunny", "laugh", "celebrate", "grateful", "excited"],
    Sad: ["sad", "down", "depressed", "blue", "cry", "tears", "rain", "heavy", "low", "miserable"],
    Angry: ["angry", "rage", "mad", "furious", "annoyed", "hate", "fight", "irritated", "frustrated"],
    Relaxed: ["calm", "peace", "slow", "breathe", "quiet", "tired", "stressful", "stressed", "exhausted", "rest"],
    Motivated: ["motivated", "hustle", "win", "goal", "grind", "gym", "confident", "power", "ready"],
    Heartbroken: ["heartbroken", "breakup", "break", "goodbye", "hurt", "left", "miss them", "lost love", "relationship"],
    Focused: ["focus", "focused", "study", "work", "deadline", "code", "exam", "productive", "concentrate"],
    Romantic: ["love", "romantic", "date", "kiss", "crush", "candle", "valentine", "together"],
    Energetic: ["energy", "energetic", "dance", "party", "run", "running", "jump", "jumping", "bounce", "bouncing", "around", "fast", "club", "workout", "electric", "hyper"],
    Lonely: ["lonely", "alone", "empty", "isolated", "no one", "by myself", "night", "silent"]
  };
  Object.entries(lexicon).forEach(([mood, words]) => {
    words.forEach((word) => {
      if (value.includes(word)) scores[mood] += word.includes(" ") ? 3 : 2;
    });
  });
  if (value.includes("stress") || value.includes("overwhelmed")) scores.Relaxed += 4;
  if (value.includes("jumping around") || value.includes("jump around") || value.includes("bouncing around")) scores.Energetic += 7;
  if (value.includes("feel like jumping") || value.includes("want to jump")) scores.Energetic += 6;
  if (value.includes("can't sit still") || value.includes("cant sit still")) scores.Energetic += 5;
  if (value.includes("can't sleep") || value.includes("cant sleep")) scores.Lonely += 3;
  if (value.includes("need to finish") || value.includes("have to finish")) scores.Focused += 3;
  const [winner, score] = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  return score > 0 ? winner : "Relaxed";
}
