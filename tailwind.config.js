/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Inter", "ui-sans-serif", "system-ui"],
        body: ["Inter", "ui-sans-serif", "system-ui"]
      },
      boxShadow: {
        glow: "0 0 50px rgba(255,255,255,.18)",
        aura: "0 20px 80px rgba(8,10,30,.35)"
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        pulseGlow: "pulseGlow 3s ease-in-out infinite",
        spinSlow: "spin 12s linear infinite",
        rain: "rain 900ms linear infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-22px,0)" }
        },
        pulseGlow: {
          "0%, 100%": { opacity: ".55", filter: "blur(34px)" },
          "50%": { opacity: ".95", filter: "blur(46px)" }
        },
        rain: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" }
        }
      }
    }
  },
  plugins: []
};
