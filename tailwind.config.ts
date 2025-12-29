import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        skin: {
          light: '#F5E6D3',
          base: '#E8D4BF',
          dark: '#D4BDA3',
        },
        primary: {
          50: '#FFF9F5',
          100: '#FFF1E6',
          200: '#FFE4CC',
          300: '#FFD4B3',
          400: '#FFC299',
          500: '#FFB380',
          600: '#E69F73',
          700: '#CC8A66',
          800: '#B37659',
          900: '#99614D',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;