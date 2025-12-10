import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          950: '#030712',
          900: '#111827',
          800: '#1f2937',
          700: '#374151',
          400: '#9ca3af',
          100: '#f3f4f6',
        },
      },
    },
  },
  plugins: [],
} satisfies Config
