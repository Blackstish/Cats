const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: false, // 👈 DISABLING PWA IN DEVELOPMENT MODE
  register: true,
  skipWaiting: true,
  runtimeCaching,
});

const nextConfig = withPWA({
  reactStrictMode: false, // 👈 DISABLING THIS TO AVOID DOUBLE RENDER
  eslint: {
    ignoreDuringBuilds: true, // 👈 ВИМКНЕННЯ ESLINT ПІД ЧАС БІЛДУ
  },
});

module.exports = nextConfig;
