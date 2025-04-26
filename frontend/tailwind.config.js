/** @type {import('tailwindcss').Config} */
import formsPlugin from '@tailwindcss/forms';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'jost': [
          'Jost', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 
          "Segoe UI", 'Roboto', "Helvetica Neue", 'Arial', "Noto Sans", 'sans-serif', 
          "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"
        ],
      },
    },
  },
  plugins: [
    formsPlugin,
  ],
}