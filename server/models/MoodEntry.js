import mongoose from "mongoose";

const moodEntrySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  mood: {
    type: String,
    required: true,
    enum: ["Happy", "Sad", "Angry", "Relaxed", "Motivated", "Heartbroken", "Focused", "Romantic", "Energetic", "Lonely"]
  },
  source: {
    type: String,
    default: "button",
    enum: ["button", "text", "face", "assistant"]
  },
  at: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export default mongoose.model("MoodEntry", moodEntrySchema);
