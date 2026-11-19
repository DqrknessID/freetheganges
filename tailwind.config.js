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
        base: '#080E17',
        surface: {
          DEFAULT: '#101A28',
          elevated: '#152234',
          hover: '#1E2D44',
        },
        border: {
          subtle: '#1F2E45',
          strong: '#2D4263',
        },
        text: {
          primary: '#E8EEF5',
          muted: '#94A3B8',
          secondary: '#64748B',
        },
        accent: {
          cyan: '#48B8D0',
          green: '#64B88A',
          amber: '#E7AE55',
          red: '#D96A6A',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
        mono: [
          '"JetBrains Mono"',
          '"SF Mono"',
          'Consolas',
          'monospace',
        ],
      },
    },
  },
  plugins: [],
};
