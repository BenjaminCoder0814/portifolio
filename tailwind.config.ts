import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "bg-primary":  "#0a0a0a",
        "bg-secondary":"#0d1117",
        "bg-surface":  "#161d2b",
        "bg-surface2": "#1c2535",
        "c-cyan":      "#00d4ff",
        "c-purple":    "#7c3aed",
        "c-green":     "#00ff88",
        "c-red":       "#ff4757",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "Fira Code", "monospace"],
      },
      animation: {
        blink:        "blink 0.8s step-end infinite",
        "pulse-cyan": "pulseCyan 2s ease-in-out infinite",
        "pulse-green":"pulseGreen 2s ease-in-out infinite",
        "glow-text":  "glowText 4s ease-in-out infinite",
        "fade-in-up": "fadeInUp 0.6s ease both",
        float:        "float 6s ease-in-out infinite",
        "border-run": "borderRun 3s linear infinite",
        "scan-down":  "scanDown 2.5s linear infinite",
      },
      keyframes: {
        blink:      { "0%,100%":{ opacity:"1" }, "50%":{ opacity:"0" } },
        pulseCyan:  { "0%,100%":{ boxShadow:"0 0 0 0 rgba(0,212,255,0.5)" }, "50%":{ boxShadow:"0 0 0 8px rgba(0,212,255,0)" } },
        pulseGreen: { "0%,100%":{ boxShadow:"0 0 0 0 rgba(0,255,136,0.4)" }, "50%":{ boxShadow:"0 0 0 6px rgba(0,255,136,0)" } },
        glowText:   { "0%,100%":{ textShadow:"0 0 20px rgba(0,212,255,0.35)" }, "50%":{ textShadow:"0 0 50px rgba(0,212,255,0.55)" } },
        fadeInUp:   { "0%":{ opacity:"0", transform:"translateY(30px)" }, "100%":{ opacity:"1", transform:"translateY(0)" } },
        float:      { "0%,100%":{ transform:"translateY(0)" }, "50%":{ transform:"translateY(-10px)" } },
        borderRun:  { "0%":{ backgroundPosition:"0% 50%" }, "50%":{ backgroundPosition:"100% 50%" }, "100%":{ backgroundPosition:"0% 50%" } },
        scanDown:   { "0%":{ top:"0", opacity:"0.7" }, "100%":{ top:"100%", opacity:"0" } },
      },
    },
  },
  plugins: [],
};
export default config;
