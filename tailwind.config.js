/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#e6e6e6',
        emeraldDark: '#083D2A',
        emeraldMint: '#10b981',
        accentGold: '#f59e0b',
      },
      fontFamily: {
        headline: ['Monument Grotesk', '-apple-system', 'sans-serif'],
        body: ['Avantt', '-apple-system', 'sans-serif'],
        code: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};
