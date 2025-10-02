import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "../../packages/shared/src/**/*.{ts,tsx}"];
  theme: {
    extend: {
      colors: {
        birch: {
          50: "#f4f7ff",
          500: "#2c3df3",
          600: "#1f2ec2"
        }
      }
    }
  },
  plugins: [animate, typography]
};

export default config;
