import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    daisyui,
    plugin(({ addComponents }) => {
      addComponents({
        '.btn': {
          height: '2.25rem',
          minHeight: '2.25rem',
          paddingTop: '0.475rem',
          paddingBottom: '0.475rem',
          paddingLeft: '1.125rem',
          paddingRight: '1.125rem',
        },
      });
    }),
  ],
};
export default config;
