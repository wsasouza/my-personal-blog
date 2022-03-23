module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      textColor: {
        lightGray: '#F1EFEE',
        primary: '#FFFFFF',
        secondary: '#848484',
        textColor: '#BEBEBE',
        accentColor: '#FBC105',
      },
      backgroundColor: {
        mainColor: '#121212',
        secondary: '#1F1F1F',
        panel: '#363636',
        accentColor: '#FBC105',
        blackOverlay: 'rgba(0, 0 ,0 ,0.7)',
      },
      borderColor: {
        accentColor: '#FBC105',
      },
    },
  },
  plugins: [],
}
