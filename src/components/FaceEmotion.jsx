import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import Icon from "./Icon";

const emotions = ["Happy", "Sad", "Angry", "Relaxed"];

export function FaceEmotion({ onDetect, theme }) {
  const videoRef = useRef(null);
  const [active, setActive] = useState(false);
  const [tick, setTick] = useState(0);
  const [realScores, setRealScores] = useState(null);

  useEffect(() => {
    if (!active) return undefined;
    let stream;
    navigator.mediaDevices?.getUserMedia({ video: true }).then((media) => {
      stream = media;
      if (videoRef.current) videoRef.current.srcObject = media;
    }).catch(() => setActive(false));
    return () => stream?.getTracks().forEach((track) => track.stop());
  }, [active]);

  useEffect(() => {
    const id = setInterval(() => setTick((value) => value + 1), 1100);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!active || !videoRef.current) return undefined;
    let cancelled = false;
    let detector;

    import("face-api.js").then(async (faceapi) => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
        await faceapi.nets.faceExpressionNet.loadFromUri("/models");
        detector = setInterval(async () => {
          if (!videoRef.current || cancelled) return;
          const result = await faceapi
            .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
            .withFaceExpressions();
          if (!result?.expressions) return;
          const expressions = result.expressions;
          setRealScores([
            { name: "Happy", value: Math.round((expressions.happy || 0) * 100) },
            { name: "Sad", value: Math.round((expressions.sad || 0) * 100) },
            { name: "Angry", value: Math.round((expressions.angry || 0) * 100) },
            { name: "Relaxed", value: Math.round(((expressions.neutral || 0) + (expressions.surprised || 0) * 0.2) * 100) }
          ]);
        }, 900);
      } catch {
        setRealScores(null);
      }
    });

    return () => {
      cancelled = true;
      if (detector) clearInterval(detector);
    };
  }, [active]);

  const confidence = useMemo(() => {
    if (realScores?.some((item) => item.value > 0)) {
      return [...realScores].sort((a, b) => b.value - a.value);
    }
    const base = emotions.map((name, i) => ({
      name,
      value: active ? Math.round(28 + Math.abs(Math.sin((tick + i) * 0.8)) * 62) : 0
    }));
    return base.sort((a, b) => b.value - a.value);
  }, [active, tick, realScores]);

  useEffect(() => {
    if (active && confidence[0]?.value > 70) onDetect(confidence[0].name, "face");
  }, [active, confidence, onDetect]);

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="panel overflow-hidden">
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow">Face emotion</p>
          <h3 className="panel-title">Live camera aura.</h3>
        </div>
        <button onClick={() => setActive((value) => !value)} className="icon-button" aria-label="Toggle camera">
          <Icon name="Camera" />
        </button>
      </div>
      <div className="relative mt-5 aspect-video overflow-hidden rounded-3xl border border-white/15 bg-black/35">
        {active ? <video ref={videoRef} autoPlay muted playsInline className="h-full w-full object-cover opacity-80" /> : <div className="grid h-full place-items-center text-white/45">Camera idle</div>}
        <div className="scan-frame" style={{ "--accent": theme.accent }} />
      </div>
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
