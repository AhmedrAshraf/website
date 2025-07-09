/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        dark: {
          primary: '#1B2D45',    // Deep navy background
          secondary: '#2D4059',  // Lighter navy for cards
          accent: '#EA5455',     // Professional red accent
          text: {
            primary: '#FFFFFF',
            secondary: '#B0B6BE',
            muted: '#8D96A7'
          }
        },
        "dark-primary": "#1a1a1a",
        "dark-secondary": "#2d2d2d",
        "dark-accent": "#ff6b6b",
        "dark-text-primary": "#ffffff",
        "dark-text-secondary": "#a0a0a0",
      },
      animation: {
        "slide-down": "slide-down 0.5s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "bounce-slow": "bounce 3s infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        'slide-right': 'slide-right 8s linear infinite',
        'slide-left': 'slide-left 6s linear infinite',
        'slide-up-infinite': 'slide-up-infinite 7s linear infinite',
      },
      keyframes: {
        "slide-down": {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        'slide-right': {
          '0%': { transform: 'translateX(-100%) rotate(45deg)' },
          '100%': { transform: 'translateX(100%) rotate(45deg)' }
        },
        'slide-left': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        'slide-up-infinite': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(-100%)' }
        },
      },
      perspective: {
        "1000": "1000px",
      },
      rotate: {
        "y-6": "rotateY(6deg)",
      },
      translate: {
        "z-10": "translateZ(10px)",
      },
    },
  },
  plugins: [],
};

export default config; 