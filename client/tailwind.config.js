/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1180px",
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        brand: {
          50: "#eef7ff",
          100: "#d9ecff",
          200: "#bce0ff",
          300: "#8ecfff",
          400: "#58b3ff",
          500: "#2f8ff5",
          600: "#1d70db",
          700: "#1959b1",
          800: "#1a4d8f",
          900: "#183f73",
          950: "#10284d",
        },
        ink: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
        accent: {
          mint: "#11b981",
          coral: "#f97363",
          amber: "#f6b73c",
          violet: "#7c6ff6",
        },
        surface: {
          DEFAULT: "#ffffff",
          muted: "#f8fafc",
          raised: "rgba(255, 255, 255, 0.82)",
          glass: "rgba(255, 255, 255, 0.68)",
        },
      },
      fontFamily: {
        sans: [
          "Inter var",
          "Inter",
          "IBM Plex Sans",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ],
      },
      fontSize: {
        "display-2xl": ["4.5rem", { lineHeight: "1", letterSpacing: "0" }],
        "display-xl": ["3.75rem", { lineHeight: "1.05", letterSpacing: "0" }],
        "display-lg": ["3rem", { lineHeight: "1.08", letterSpacing: "0" }],
        "display-md": ["2.25rem", { lineHeight: "1.15", letterSpacing: "0" }],
      },
      boxShadow: {
        soft: "0 12px 34px rgba(15, 23, 42, 0.08)",
        premium: "0 20px 60px rgba(15, 23, 42, 0.12)",
        glow: "0 18px 48px rgba(47, 143, 245, 0.20)",
        inset: "inset 0 1px 0 rgba(255, 255, 255, 0.65)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      backgroundImage: {
        "app-shell":
          "radial-gradient(circle at top left, rgba(47, 143, 245, 0.12), transparent 30%), radial-gradient(circle at top right, rgba(17, 185, 129, 0.10), transparent 28%), linear-gradient(180deg, #f8fafc 0%, #eef4fb 100%)",
        "premium-card":
          "linear-gradient(145deg, rgba(255, 255, 255, 0.96), rgba(248, 250, 252, 0.84))",
        "brand-sheen":
          "linear-gradient(135deg, #183f73 0%, #1d70db 48%, #11b981 100%)",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
