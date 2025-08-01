module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'indian-yellow': '#F4C430',
        'indian-blue': '#046A38',
        'indian-green': '#138808',
        'indian-red': '#FF9933'
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}