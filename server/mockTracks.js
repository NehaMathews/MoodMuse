const metrics = {
  Happy: [94, 88, 91],
  Sad: [91, 32, 78],
  Angry: [93, 96, 85],
  Relaxed: [94, 24, 80],
  Motivated: [96, 94, 89],
  Heartbroken: [95, 31, 86],
  Focused: [93, 44, 75],
  Romantic: [94, 52, 88],
  Energetic: [96, 98, 90],
  Lonely: [93, 36, 82]
};

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
    Sad: [["Corre", "Jesse & Joy"], ["Amor Eterno", "Rocio Durcal"], ["Duele El Corazon", "Enrique Iglesias"]],
    Energetic: [["Titi Me Pregunto", "Bad Bunny"], ["Bailando", "Enrique Iglesias"], ["Danza Kuduro", "Don Omar"]],
    Romantic: [["Eres", "Cafe Tacvba"], ["Perfecta", "Miranda!"], ["Me Enamora", "Juanes"]]
  }
};

const imageIds = [
  "1516280440614-37939bbacd81",
  "1493225457124-a3eb161ffa5f",
  "1500530855697-b586d89ba3ee",
  "1470225620780-dba8ba36b745",
  "1500530855697-b586d89ba3ee"
];

const normalized = (value) => value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim();

const catalogIndex = Object.entries(languageSongs).flatMap(([language, moodCatalog]) =>
  Object.entries(moodCatalog).flatMap(([mood, songs]) =>
    songs.map(([title, artist]) => ({ title, artist, language, mood, key: normalized(title) }))
  )
);

export function mockTracks(mood, languages = ["English"]) {
  const songs = (languages.length ? languages : ["English"]).flatMap((language) => {
    const catalog = languageSongs[language] || languageSongs.English;
    const fallbackMood = mood === "Relaxed" || mood === "Focused" ? "Romantic" : mood === "Motivated" ? "Energetic" : mood === "Lonely" || mood === "Heartbroken" ? "Sad" : mood;
    const moodSongs = catalog[mood] || catalog[fallbackMood] || catalog.Happy || [];
    return moodSongs.map(([title, artist]) => ({ title, artist, language }));
  });

  return songs.slice(0, 6).map((song, index) => toTrack(song, mood, index));
}

export function mockSearchTracks(query, languages = ["English"]) {
  const languageSet = new Set(languages.length ? languages : ["English"]);
  const key = normalized(query);
  const preferredMatches = catalogIndex.filter((song) =>
    languageSet.has(song.language) && (song.key.includes(key) || key.includes(song.key))
  );
  const matches = preferredMatches.length ? preferredMatches : catalogIndex.filter((song) => song.key.includes(key) || key.includes(song.key));
  return matches.slice(0, 6).map((song, index) => toTrack(song, song.mood || "Focused", index, "Search"));
}

function toTrack(song, mood, index, genre) {
  const [moodScore, energy, popularity] = metrics[mood] || metrics.Focused;
  return {
    id: `${genre || mood}-${song.language}-${normalized(song.title)}-${index}`,
    title: song.title,
    artist: song.artist,
    moodScore,
    energy,
    popularity,
    albumArt: `https://images.unsplash.com/photo-${imageIds[index % imageIds.length]}?auto=format&fit=crop&w=600&q=80&sig=${mood}-${song.language}-${index}`,
    previewUrl: "",
    spotifyUrl: "https://open.spotify.com/search/" + encodeURIComponent(`${song.title} ${song.artist} ${song.language}`),
    genre: genre || mood,
    language: song.language
  };
}
