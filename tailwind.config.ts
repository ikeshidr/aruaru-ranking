import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF7A35',
          hover: '#FF6420',
          light: '#FFE8D6',
          soft: '#FFF4E6',
        },
        surface: '#FFFFFF',
        bg: '#FAF8F4',
        border: '#F0EDE8',
        text: {
          DEFAULT: '#2D2D33',
          muted: '#8B8B95',
          faint: '#BFBFC8',
        },
        category: {
          student: { DEFAULT: '#FF5A6E', bg: '#FFE5E9' },
          work: { DEFAULT: '#3672FF', bg: '#E3EAFF' },
          daily: { DEFAULT: '#29B164', bg: '#DEFAEA' },
          hobby: { DEFAULT: '#9966FF', bg: '#EFE5FF' },
          love: { DEFAULT: '#FF5FA3', bg: '#FFE1EF' },
          family: { DEFAULT: '#D68A2C', bg: '#FFF0D9' },
        },
      },
      borderRadius: {
        card: '24px',
      },
      boxShadow: {
        card: '0 1px 3px rgb(0 0 0 / 0.02), 0 4px 20px rgb(45 45 51 / 0.04)',
      },
      fontFamily: {
        rounded: [
          'var(--font-mplus-rounded)',
          '"Hiragino Maru Gothic ProN"',
          '"Hiragino Sans"',
          '"Yu Gothic"',
          '"Noto Sans JP"',
          'system-ui',
          'sans-serif',
        ],
      },
    },
  },
};

export default config;
