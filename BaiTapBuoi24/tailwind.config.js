tailwind.config = {
  theme: {
    extend: {
      
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          DEFAULT: '#5048e4',
          dark: '#3730a3',
        },
        'light-grey': '#b3becd',
        dark: '#232431',
        accent: '#EDF2FE',
        surface: '#f8fafc',
        grey: '#818995',
      },

      borderColor: {
          DEFAULT: '#e0e7ff',
      },

      fontFamily: {
        sans: ['"Inter"', 'sans-serif'], 
      },

      maxWidth: {
        'main': '1200px',
      },

      boxShadow: {
        'blue': '0 4px 20px #e3e2ff',
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)', 
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      },

      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },

      animation: {
        'fade-in-up': 'fadeInUp 0.4s ease-out forwards', 
      }
    },
  }
}