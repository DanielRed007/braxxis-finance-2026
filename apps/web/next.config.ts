import type { NextConfig } from 'next';

const config: NextConfig = {
  transpilePackages: ['@braxxis/shared', '@braxxis/domain'],
};

export default config;
