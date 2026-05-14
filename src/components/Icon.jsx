const paths = {
  Play: "M8 5v14l11-7z",
  Pause: "M6 5h4v14H6zM14 5h4v14h-4z",
  Spark: "M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z",
  Moon: "M21 15.5A8.5 8.5 0 118.5 3 6.5 6.5 0 0021 15.5z",
  Sun: "M12 4V2m0 20v-2m8-8h2M2 12h2m14.4-6.4l1.4-1.4M4.2 19.8l1.4-1.4m0-12.8L4.2 4.2m15.6 15.6l-1.4-1.4M12 17a5 5 0 100-10 5 5 0 000 10z",
  Rain: "M7 17l-1 3m6-3l-1 3m6-3l-1 3M6 14a4 4 0 01.8-7.9A6 6 0 0118 8a3.5 3.5 0 01-.5 7H6z",
  Flame: "M12 22c4 0 7-2.8 7-6.8 0-3.2-2-5.5-4-7.2.2 2-1 3.5-2.2 4.5C12.4 9 10.4 5.8 7.5 4c.3 3-2.5 5.2-2.5 9.3C5 18.3 8.2 22 12 22z",
  Waves: "M3 8c3 2 5 2 8 0s5-2 8 0M3 14c3 2 5 2 8 0s5-2 8 0M3 20c3 2 5 2 8 0s5-2 8 0",
  Bolt: "M13 2L4 14h7l-1 8 9-12h-7z",
  Heart: "M12 21s-8-4.8-8-11a4.7 4.7 0 018-3.3A4.7 4.7 0 0120 10c0 6.2-8 11-8 11z",
  Focus: "M12 8a4 4 0 100 8 4 4 0 000-8zM4 12H2m20 0h-2M12 4V2m0 20v-2m6.4-14.4l1.4-1.4M4.2 19.8l1.4-1.4m0-14.2L4.2 4.2m15.6 15.6l-1.4-1.4",
  Pulse: "M3 12h4l2-7 4 14 2-7h6",
  Camera: "M4 7h4l2-2h4l2 2h4v12H4z M12 17a4 4 0 100-8 4 4 0 000 8z",
  Link: "M10 13a5 5 0 007.5.5l2-2A5 5 0 0012.5 4l-1.2 1.2M14 11a5 5 0 00-7.5-.5l-2 2A5 5 0 0011.5 20l1.2-1.2",
  Send: "M22 2L11 13M22 2l-7 20-4-9-9-4z",
  Palette: "M12 22a10 10 0 110-20 10 10 0 010 20z"
};

export default function Icon({ name, className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[name] || paths.Spark} fill={["Play", "Pause", "Bolt"].includes(name) ? "currentColor" : "none"} />
    </svg>
  );
}
