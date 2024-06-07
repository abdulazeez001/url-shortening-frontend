import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3976E8",
        header: "#101928",
        bodytext: "#667185",
        bodytext2: "#98A2B3",
      },
    },
  },
  plugins: [],
};
export default config;
