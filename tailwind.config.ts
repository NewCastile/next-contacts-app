import type { Config } from "tailwindcss";

import tailwindColors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      primary: "rgb(28, 35, 56)",
      secondary: "rgb(71, 78, 99)",
      secondary_hover: "rgb(43, 48, 64)",
      secondary_active: "rgb(108, 113, 128)",
      secondary_contrast: "rgb(245, 149, 24)",
      ...tailwindColors,
    },
  },
  plugins: [],
};

export default config;
