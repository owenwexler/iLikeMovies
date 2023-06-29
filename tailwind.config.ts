/** @type {import('tailwindcss').Config} */

import { type Config } from "tailwindcss";

import plugin from 'tailwindcss/plugin';

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  fontFamily: {
    sans: ['Helvetica Neue', 'sans-serif']
  },
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;

