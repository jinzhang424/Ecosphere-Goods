/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      'off-white': '#E9E1DE',
      'dark-brown': '#362D2D'
    },
    fontSize: {
      'xLHeader': '64px',
      'header': '32px',
      'subtitle': '20px',
      'body': '16px'
    },
    fontWeight: {
      'header': '500',
    },
    aspectRatio: {
      'itemCard': '5/7',
      'climateFactCard': '1/2'
    },
    extend: {
      scrollbarHide: {
        '-ms-overflow-style': 'none', 
        'scrollbar-width': 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      },
    },
  },
  plugins: [],
}