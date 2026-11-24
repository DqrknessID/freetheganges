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
        darkbase: '#080E17',
        surface: {
          DEFAULT: '#101A28',
          elevated: '#152234',
          hover: '#1E2D44',
        },
        border: {
          subtle: '#1F3050',
          strong: '#2D4263',
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
        base: '#080E17',
      },
      fontFamily: {
        display: [
          '"Newsreader"',
          'serif',
        ],
        serif: [
          '"Newsreader"',
          'Lora',
          'Georgia',
          'serif',
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
