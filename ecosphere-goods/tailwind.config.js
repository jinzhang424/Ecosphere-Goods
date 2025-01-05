/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      'off-white': '#E9E1DE',
      'dark-brown': '#362D2D',
      'light-brown': '#5A5150',
      'tint': 'rgba(0, 0, 0, 0.3)',
      'error': '#b02715'
    },
    fontSize: {
      'xLHeader': '64px',
      'LHeader' : '42px',
      'header': '32px',
      'sHeader': '24px',
      'subtitle': '20px',
      'body': '16px'
    },
    fontWeight: {
      'LHeader': '700', 
      'header': '500',
    },
    aspectRatio: {
      'itemCard': '5/7',
      'climateFactCard': '1/2',
      '1/1': '1/1'
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