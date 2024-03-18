/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        "color-brand-50": "#eef2ff",
        "color-brand-100": "#e0e7ff",
        "color-brand-200": "#c7d2fe",
        "color-brand-500": "#6366f1",
        "color-brand-600": "#4f46e5",
        "color-brand-700": "#4338ca",
        "color-brand-800": "#3730a3",
        "color-brand-900": "#312e81",
      },
    },
  },
  plugins: [],
};
