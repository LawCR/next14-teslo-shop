import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        background: "#FEFEFE",
        backgroundPaper: "#FFFFFF",
        hoverLink: "#F3F3F3",
        text: "#171A20",
        textSecondary: "#171A20",
        textSecondary2: "#393c41",

        dbackground: '#111111',
        dbackgroundPaper: "#1B1B1B",
        dhoverLink: '#313131',
        dtext: '#FFFFFF',
        dtextSecondary: '#c7c7c7',
        dtextSecondary2: '#8E8E8E',
      }
    },
  },
  plugins: [],
};
export default config;
