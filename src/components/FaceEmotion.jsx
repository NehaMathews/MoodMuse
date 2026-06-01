import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import Icon from "./Icon";
import { analyzeStillFrame } from "../services/faceAnalyzer";

const emptyScores = [
  { name: "Happy", value: 0 },
  { name: "Sad", value: 0 },
  { name: "Angry", value: 0 },
  { name: "Relaxed", value: 0 }
];

export function FaceEmotion({ onDetect, theme }) {
  const videoRef = useRef(null);
  const [active, setActive] = useState(false);
  const [status, setStatus] = useState("Camera idle");
  const [scores, setScores] = useState(emptyScores);
  const [lastMood, setLastMood] = useState("");
  const [captureCount, setCaptureCount] = useState(0);

  useEffect(() => {
    if (!active) return undefined;
    let stream;
    setStatus("Camera ready. Capture when your face is centered.");
    navigator.mediaDevices?.getUserMedia({ video: true }).then((media) => {
      stream = media;
      if (videoRef.current) videoRef.current.srcObject = media;
    }).catch(() => {
      setStatus("Camera permission was blocked.");
      setActive(false);
    });
    return () => stream?.getTracks().forEach((track) => track.stop());
  }, [active]);

  const confidence = useMemo(() => [...scores].sort((a, b) => b.value - a.value), [scores]);

  async function captureAndAnalyze() {
    if (!videoRef.current) return;
    setScores(emptyScores);
    setLastMood("");
    setCaptureCount((count) => count + 1);
    setStatus("Analyzing this photo locally...");
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 360;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const analyzed = await analyzeStillFrame(canvas);
    setScores(analyzed.scores);
    setLastMood(analyzed.mood);
    setStatus(analyzed.note);
    if (analyzed.mood) onDetect(analyzed.mood, "face");
  }

  function stopCamera() {
    const stream = videoRef.current?.srcObject;
    stream?.getTracks().forEach((track) => track.stop());
    if (videoRef.current) videoRef.current.srcObject = null;
    setActive(false);
  }

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="panel overflow-hidden">
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow">Face emotion</p>
          <h3 className="panel-title">Capture once, analyze once.</h3>
        </div>
        <button onClick={() => (active ? stopCamera() : setActive(true))} className="icon-button" aria-label="Toggle camera" type="button">
          <Icon name="Camera" />
        </button>
      </div>
      <div className="relative mt-5 aspect-video overflow-hidden rounded-3xl border border-white/15 bg-black/35">
        {active ? <video ref={videoRef} autoPlay muted playsInline className="h-full w-full object-cover opacity-85" /> : <div className="grid h-full place-items-center text-white/45">Camera idle</div>}
        <div className="scan-frame" style={{ "--accent": theme.accent }} />
      </div>
      <p className="mt-3 rounded-2xl bg-white/10 px-4 py-3 text-sm leading-6 text-white/70">
        {status} The captured photo is analyzed in memory and is not saved, uploaded, or stored.
      </p>
      <div className="mt-3 flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
        <span className="text-sm font-bold text-white/55">Current camera reading</span>
        <span className="font-black text-white">{lastMood || "Waiting"} {captureCount ? `#${captureCount}` : ""}</span>
      </div>
      <button
        onClick={captureAndAnalyze}
        disabled={!active}
        type="button"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 font-black text-zinc-950 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-45"
      >
        <Icon name="Spark" />
        Capture and read mood
      </button>
      <div className="mt-5 space-y-3">
        {confidence.map((item) => (
          <div key={item.name}>
            <div className="mb-1 flex justify-between text-sm text-white/70">
              <span>{item.name}</span>
              <span>{item.value}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div className="h-full rounded-full" style={{ background: theme.accent }} animate={{ width: `${item.value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
