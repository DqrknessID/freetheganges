/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        darkbase: '#090a0c',
        surface: {
          DEFAULT: '#121316',
          elevated: '#181a20',
          hover: '#20232b',
        },
        border: {
          subtle: '#22252c',
          strong: '#2c3039',
        },
        text: {
          primary: '#f4f4f5',
          secondary: '#a1a1aa',
          muted: '#71717a',
        },
        accent: {
          cyan: '#38bdf8',
          green: '#10b981',
          amber: '#f59e0b',
          red: '#ef4444',
        },
      },
      backgroundColor: {
        base: '#090a0c',
      },
      fontFamily: {
        display: [
          '"Plus Jakarta Sans"',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
        serif: [
          '"Plus Jakarta Sans"',
          'sans-serif',
        ],
        sans: [
          '"Plus Jakarta Sans"',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
        mono: [
          '"IBM Plex Mono"',
          'Consolas',
          'monospace',
        ],
      },
    },
  },
  plugins: [],
};
