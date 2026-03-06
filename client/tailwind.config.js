/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          d: "#2662F3",
          h: "#709AFE",
          p: "#1450E0",
        },
        gray: {
          d: "#E7EBF2",
          h: "#F4F5F7",
          p: "#E7EBF2",
        },

        "bg-blue": "#E7EAFA",

        primary: "#1D2023",
        secondary: "#626C77",

        "input-bg": "#F2F3F7",

        danger: "#ef4444",
      },
      boxShadow: {
        header: "0px 4px 16px 0px #00000014, 0px 0px 16px 0px #00000014",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      fontSize: {
        "b-title-1": ["42px", { lineHeight: "44px", letterSpacing: "0px", fontWeight: "600" }],
        "b-title-2": ["32px", { lineHeight: "36px", letterSpacing: "0px", fontWeight: "600" }],

        "b-text-1": ["14px", { lineHeight: "20px", letterSpacing: "0px", fontWeight: "500" }],
        "b-text-2": ["12px", { lineHeight: "16px", letterSpacing: "0px", fontWeight: "500" }],

        "placeholder": ["16px", { lineHeight: "24px", letterSpacing: "0px", fontWeight: "500" }],

        "button": ["12px", { lineHeight: "16px", letterSpacing: "5%", fontWeight: "700" }],
      },
    },
  },
  plugins: [],
};
