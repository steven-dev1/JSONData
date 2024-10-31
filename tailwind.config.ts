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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primaryBlue: '#006BFF',
        primaryRed: '#FF3939',
        secondaryWhite: '#f1f1f1',
        secondaryBlack: '#262626'
      },
    },
  },
  plugins: [],
};
export default config;
