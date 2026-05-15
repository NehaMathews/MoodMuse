export async function analyzeStillFrame(canvas) {
  const faceScores = await analyzeWithFaceApi(canvas);
  if (faceScores) {
    const winner = [...faceScores].sort((a, b) => b.value - a.value)[0];
    if (winner.value < 35) return analyzeToneResult(canvas);
    return { mood: winner.name, scores: faceScores, note: `Detected ${winner.name.toLowerCase()} from the captured photo.` };
  }

  return analyzeToneResult(canvas);
}

async function analyzeWithFaceApi(canvas) {
  try {
    const faceapi = await import("face-api.js");
    await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
    await faceapi.nets.faceExpressionNet.loadFromUri("/models");
    const result = await faceapi
      .detectSingleFace(canvas, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();
    if (!result?.expressions) return null;
    const expressions = result.expressions;
    return [
      { name: "Happy", value: Math.round((expressions.happy || 0) * 100) },
      { name: "Sad", value: Math.round((expressions.sad || 0) * 100) },
      { name: "Angry", value: Math.round((expressions.angry || 0) * 100) },
      { name: "Relaxed", value: Math.round((expressions.neutral || 0) * 100) },
      { name: "Energetic", value: Math.round((expressions.surprised || 0) * 100) }
    ];
  } catch {
    return null;
  }
}

function analyzeToneResult(canvas) {
  const fallback = analyzeImageTone(canvas);
  return {
    mood: fallback.mood,
    scores: fallback.scores,
    note: `MoodMuse used a private local still-frame estimate and read ${fallback.mood.toLowerCase()}.`
  };
}

function analyzeImageTone(canvas) {
  const { data } = canvas.getContext("2d", { willReadFrequently: true }).getImageData(0, 0, canvas.width, canvas.height);
  let brightness = 0;
  let warmth = 0;
  let redness = 0;
  let samples = 0;
  for (let i = 0; i < data.length; i += 24) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    brightness += (r + g + b) / 3;
    warmth += r - b;
    redness += r - Math.max(g, b);
    samples += 1;
  }
  brightness /= samples;
  warmth /= samples;
  redness /= samples;
  const raw = {
    Happy: brightness > 118 && warmth > 4 ? 74 : 30,
    Sad: brightness < 82 ? 76 : 24,
    Angry: redness > 14 ? 78 : 22,
    Relaxed: brightness >= 82 && brightness <= 145 && Math.abs(warmth) < 22 ? 66 : 28,
    Energetic: brightness > 145 || warmth > 34 ? 70 : 26
  };
  const total = Object.values(raw).reduce((sum, value) => sum + value, 0);
  const scores = Object.entries(raw).map(([name, value]) => ({ name, value: Math.round((value / total) * 100) }));
  const mood = scores.sort((a, b) => b.value - a.value)[0].name;
  return { mood, scores };
}
