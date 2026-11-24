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
        darkbase: '#0b0c0e',
        surface: {
          DEFAULT: '#0e111b',
          elevated: '#0d172b',
          hover: '#12244f',
        },
        border: {
          subtle: '#182234',
          strong: '#233354',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#CBD5E1',
          muted: '#CBD5E1',
        },
        accent: {
          cyan: '#38BDF8',
          green: '#4ADE80',
          amber: '#FBBF24',
          red: '#F87171',
        },
      },
      backgroundColor: {
        base: '#0b0c0e',
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
