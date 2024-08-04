import createNextIntlPlugin from 'next-intl/plugin';
import path from 'node:path';

const withNextIntl = createNextIntlPlugin('./src/shared/lib/i18n/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [process.env.NEXT_PUBLIC_IMAGE_DOMAIN],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
      // exclude: [path.resolve(process.cwd(), 'src/app')],
    });

    return config;
  },
};

export default withNextIntl(nextConfig);
