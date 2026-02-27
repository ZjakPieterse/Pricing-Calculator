import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        panel: '#0f172a',
        neon: '#22d3ee',
        accent: '#a78bfa'
      },
      boxShadow: {
        glow: '0 0 24px rgba(34, 211, 238, 0.25)'
      }
    }
  },
  plugins: []
} satisfies Config;
