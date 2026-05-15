const data = {
  Happy: [["Golden Hour Glow", "Luna Vale", 94, 88, 91], ["Sunroof Cinema", "The Daybreaks", 90, 82, 87], ["Sweet Motion", "Mika Bloom", 87, 76, 83]],
  Sad: [["Window Seat Rain", "Noah Ellery", 91, 32, 78], ["Blue Apartment", "Iris North", 88, 28, 81], ["Letters I Kept", "June Harbor", 86, 35, 76]],
  Angry: [["Static Crown", "Red Signal", 93, 96, 85], ["Break the Glass", "Volt Choir", 89, 93, 82], ["No Apology", "Kade Riot", 86, 91, 79]],
  Relaxed: [["Tide Pool", "Arlo Finch", 94, 24, 80], ["Jade Air", "Moss Theory", 90, 29, 77], ["Slow Lanterns", "Sora Lake", 88, 22, 74]],
  Motivated: [["Last Rep", "Nova Run", 96, 94, 89], ["Elevate", "Kai Circuit", 92, 90, 84], ["Forward Only", "Atlas Wave", 88, 86, 81]],
  Heartbroken: [["After the Call", "Maren Grey", 95, 31, 86], ["Borrowed Hoodie", "Elio Saint", 91, 38, 82], ["Stay Gone", "The Velvet Hours", 87, 41, 79]],
  Focused: [["Deep Work 04", "Quiet Machines", 93, 44, 75], ["Signal Garden", "Nami Code", 88, 48, 73], ["Clean Lines", "Paper Satellites", 86, 42, 71]],
  Romantic: [["Rosewater", "Amara Sol", 94, 52, 88], ["Slow Dancing Neon", "Miles Reverie", 91, 58, 84], ["Hold the Morning", "Eden Fox", 89, 46, 80]],
  Energetic: [["Strobe Hearts", "Pixel Rush", 96, 98, 90], ["Jump Cut", "Viva Neon", 92, 95, 87], ["Hypercolor", "The Afterlights", 88, 92, 84]],
  Lonely: [["City Without You", "Avery Night", 93, 36, 82], ["One Lamp On", "Hollow Avenue", 90, 31, 78], ["Satellite Room", "Mira Low", 87, 40, 76]]
};

const imageIds = [
  "1516280440614-37939bbacd81",
  "1493225457124-a3eb161ffa5f",
  "1500530855697-b586d89ba3ee",
  "1470225620780-dba8ba36b745",
  "1500530855697-b586d89ba3ee"
];

const previewUrls = [
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
];

export function mockTracks(mood, languages = ["English"]) {
  return (data[mood] || data.Happy).map(([title, artist, moodScore, energy, popularity], index) => ({
    id: `${mood}-${index}`,
    title,
    artist,
    moodScore,
    energy,
    popularity,
    albumArt: `https://images.unsplash.com/photo-${imageIds[index % imageIds.length]}?auto=format&fit=crop&w=600&q=80&sig=${mood}-${index}`,
    previewUrl: previewUrls[index % previewUrls.length],
    spotifyUrl: "https://open.spotify.com/search/" + encodeURIComponent(`${title} ${artist}`),
    genre: ["Dream Pop", "R&B", "Indie", "Electronic", "Soul"][index % 5],
    language: languages[index % languages.length] || "English"
  }));
}
