/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        heading: ['Open Sans', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#416276", // Main blue color from original site
          50: "#EDF2F4",
          100: "#D9E5EA",
          200: "#B3CAD5",
          300: "#8DAFC0",
          400: "#6795AB",
          500: "#416276", // Main blue color
          600: "#3A5869",
          700: "#334E5D",
          800: "#2D4450",
          900: "#263A44",
          950: "#1F2F37",
        },
        accent: {
          DEFAULT: "#24B8F9", // Bright blue accent from original site
          50: "#E6F7FF",
          100: "#CCF0FF",
          200: "#99E0FF",
          300: "#8DDAFF", // Enhanced for better readability
          400: "#5ECAFF", // Enhanced for better readability
          500: "#24B8F9", // Bright blue accent
          600: "#0093D6",
          700: "#006E9F",
          800: "#004A69",
          900: "#002534",
          950: "#001219",
        },
        secondary: {
          DEFAULT: "#595959", // Text color from original site
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "#FF3333",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#999999", // Light text color from original
          foreground: "#595959",
        },
        neutral: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
          950: "#030712",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#595959",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#595959",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      backgroundImage: {
        'header-bg': "url('/images/header-bg.png')",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} 