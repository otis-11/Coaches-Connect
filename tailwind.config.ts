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
        navy: {
          50: "#f0f3f9",
          100: "#dae1f0",
          200: "#b8c7e3",
          300: "#8ba5d1",
          400: "#5e7fba",
          500: "#3d5fa1",
          600: "#2d4a85",
          700: "#1E293B",
          800: "#0F172A",
          900: "#0A1628",
          950: "#060d1a",
        },
        gold: {
          50: "#fdf9ef",
          100: "#f9efd3",
          200: "#f2dca5",
          300: "#e9c36d",
          400: "#C9A84C",
          500: "#b8912e",
          600: "#9a7224",
          700: "#7d5720",
          800: "#684721",
          900: "#583c20",
        },
        teal: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14B8A6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', "sans-serif"],
        body: ['"DM Sans"', "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
