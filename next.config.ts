import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: '/Users/mykhailo.tymoshenko/Documents/Projects/my/daikin'
  }
};

export default withNextIntl(nextConfig);
