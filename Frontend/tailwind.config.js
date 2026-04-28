/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#8b5cf6", // Vibrant Purple
        "primary-container": "#6d28d9", // Deep Purple
        "on-primary": "#ffffff",
        "on-primary-container": "#e0e7ff",
        "secondary": "#14b8a6", // Teal
        "secondary-container": "#0f766e",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#ccfbf1",
        "tertiary": "#f43f5e", // Rose
        "tertiary-container": "#be123c",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#ffe4e6",
        "surface": "#09090b", // Deep Black/Gray
        "surface-container-lowest": "#18181b",
        "surface-container-low": "#27272a",
        "surface-container": "#3f3f46",
        "surface-container-high": "#52525b",
        "surface-container-highest": "#71717a",
        "on-surface": "#ffffff",
        "on-surface-variant": "#a1a1aa",
        "outline": "#52525b",
        "outline-variant": "#3f3f46",
        "error": "#ef4444",
        "error-container": "#991b1b",
        "on-error": "#ffffff",
        "on-error-container": "#fef2f2",
        "background": "#09090b",
        "on-background": "#ffffff",
      },
      fontFamily: {
        "headline": ["Outfit", "sans-serif"],
        "body": ["Inter", "sans-serif"],
        "label": ["Inter", "sans-serif"]
      },
      backgroundImage: {
        'glass': 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01))',
        'glass-strong': 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.02))',
      }
    },
  },
  plugins: [],
}
