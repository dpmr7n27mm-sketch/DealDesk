/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Playfair Display', 'Georgia', 'Times New Roman', 'serif'],
        'body': ['DM Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        'mono': ['IBM Plex Mono', 'SF Mono', 'Monaco', 'Courier New', 'monospace'],
      },
      colors: {
        midnight: '#0f172a',
        navy: '#1e293b',
      }
    },
  },
  plugins: [],
}
