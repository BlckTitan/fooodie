import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: '#f13a01'
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        '16': 'repeat(auto-fit, 186px)',
      }
    },
  },
  plugins: [],
};
export default config;
