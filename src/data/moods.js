export const moods = {
  Happy: {
    icon: "Sun",
    emoji: "☀",
    gradient: "from-amber-300 via-rose-400 to-fuchsia-500",
    accent: "#ffcf5f",
    dark: "#2d1236",
    copy: "Bright hooks, warm basslines, and serotonin choruses.",
    genres: ["Pop", "Disco", "Afrobeats"]
  },
  Sad: {
    icon: "Rain",
    emoji: "☔",
    gradient: "from-blue-500 via-indigo-500 to-slate-800",
    accent: "#72a7ff",
    dark: "#081226",
    copy: "Soft piano, rainy textures, and songs that sit beside you.",
    genres: ["Indie", "Piano", "Lo-fi"]
  },
  Angry: {
    icon: "Flame",
    emoji: "🔥",
    gradient: "from-red-500 via-orange-500 to-zinc-950",
    accent: "#ff533d",
    dark: "#210707",
    copy: "Distorted riffs, kinetic drums, and pressure-release anthems.",
    genres: ["Rock", "Metal", "Trap"]
  },
  Relaxed: {
    icon: "Waves",
    emoji: "≈",
    gradient: "from-teal-300 via-cyan-500 to-emerald-800",
    accent: "#62ead4",
    dark: "#052420",
    copy: "Weightless ambience, glassy keys, and slow exhale rhythms.",
    genres: ["Ambient", "Chill", "Jazz"]
  },
  Motivated: {
    icon: "Bolt",
    emoji: "⚡",
    gradient: "from-lime-300 via-emerald-500 to-cyan-700",
    accent: "#a9ff68",
    dark: "#092a1a",
    copy: "Forward motion, clean focus, and victory-lap percussion.",
    genres: ["EDM", "Hip-Hop", "Workout"]
  },
  Heartbroken: {
    icon: "Heart",
    emoji: "♡",
    gradient: "from-rose-400 via-violet-500 to-black",
    accent: "#ff7da8",
    dark: "#220817",
    copy: "Late-night vocals, cracked-open lyrics, and cinematic ache.",
    genres: ["R&B", "Ballads", "Indie"]
  },
  Focused: {
    icon: "Focus",
    emoji: "◎",
    gradient: "from-sky-300 via-blue-500 to-violet-800",
    accent: "#69d4ff",
    dark: "#07162c",
    copy: "Minimal beats, low-distraction loops, and deep-work clarity.",
    genres: ["Lo-fi", "Classical", "Electronic"]
  },
  Romantic: {
    icon: "Spark",
    emoji: "♥",
    gradient: "from-pink-300 via-red-400 to-purple-700",
    accent: "#ff8db8",
    dark: "#2a071f",
    copy: "Velvet vocals, candlelit grooves, and soft-focus melodies.",
    genres: ["Soul", "R&B", "Acoustic"]
  },
  Energetic: {
    icon: "Pulse",
    emoji: "✦",
    gradient: "from-yellow-300 via-orange-500 to-pink-600",
    accent: "#ff9b38",
    dark: "#281105",
    copy: "High BPM, big drops, and main-character momentum.",
    genres: ["Dance", "K-pop", "House"]
  },
  Lonely: {
    icon: "Moon",
    emoji: "◐",
    gradient: "from-violet-400 via-indigo-600 to-zinc-950",
    accent: "#a98cff",
    dark: "#120b2d",
    copy: "Nocturnal synths, intimate vocals, and room-light reflections.",
    genres: ["Dream Pop", "Alt", "Folk"]
  }
};

export const moodNames = Object.keys(moods);

export const fallbackTracks = {
  Happy: [
    ["Golden Hour Glow", "Luna Vale", 94, 88, 91],
    ["Sunroof Cinema", "The Daybreaks", 90, 82, 87],
    ["Sweet Motion", "Mika Bloom", 87, 76, 83]
  ],
  Sad: [
    ["Window Seat Rain", "Noah Ellery", 91, 32, 78],
    ["Blue Apartment", "Iris North", 88, 28, 81],
    ["Letters I Kept", "June Harbor", 86, 35, 76]
  ],
  Angry: [
    ["Static Crown", "Red Signal", 93, 96, 85],
    ["Break the Glass", "Volt Choir", 89, 93, 82],
    ["No Apology", "Kade Riot", 86, 91, 79]
  ],
  Relaxed: [
    ["Tide Pool", "Arlo Finch", 94, 24, 80],
    ["Jade Air", "Moss Theory", 90, 29, 77],
    ["Slow Lanterns", "Sora Lake", 88, 22, 74]
  ],
  Motivated: [
    ["Last Rep", "Nova Run", 96, 94, 89],
    ["Elevate", "Kai Circuit", 92, 90, 84],
    ["Forward Only", "Atlas Wave", 88, 86, 81]
  ],
  Heartbroken: [
    ["After the Call", "Maren Grey", 95, 31, 86],
    ["Borrowed Hoodie", "Elio Saint", 91, 38, 82],
    ["Stay Gone", "The Velvet Hours", 87, 41, 79]
  ],
  Focused: [
    ["Deep Work 04", "Quiet Machines", 93, 44, 75],
    ["Signal Garden", "Nami Code", 88, 48, 73],
    ["Clean Lines", "Paper Satellites", 86, 42, 71]
  ],
  Romantic: [
    ["Rosewater", "Amara Sol", 94, 52, 88],
    ["Slow Dancing Neon", "Miles Reverie", 91, 58, 84],
    ["Hold the Morning", "Eden Fox", 89, 46, 80]
  ],
  Energetic: [
    ["Strobe Hearts", "Pixel Rush", 96, 98, 90],
    ["Jump Cut", "Viva Neon", 92, 95, 87],
    ["Hypercolor", "The Afterlights", 88, 92, 84]
  ],
  Lonely: [
    ["City Without You", "Avery Night", 93, 36, 82],
    ["One Lamp On", "Hollow Avenue", 90, 31, 78],
    ["Satellite Room", "Mira Low", 87, 40, 76]
  ]
};

export const playlistNames = [
  "Midnight Healing",
  "Rainy Day Memories",
  "Golden Hour Energy",
  "Velvet Voltage",
  "Soft Focus Signal",
  "Afterglow Therapy",
  "Neon Heart Reset",
  "Sunday Soul Cinema"
];
