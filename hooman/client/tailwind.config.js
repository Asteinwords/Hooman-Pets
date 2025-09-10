export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Urbanist", "sans-serif"],
      },
      colors: {
        primary: "#E67A32",  // Your main orange color
        secondary: "#333333",
      },
      borderRadius: {
        lg: "12px", // rounded corners for inputs
      },
    },
  },
  plugins: [],
};
