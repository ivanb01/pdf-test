const path = require('path');

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
    prependData: `@import "_variables.scss";`,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['upload.wikimedia.org'],
  },
  async redirects() {
    return [
      {
        source: '/contacts',
        destination: '/contacts/clients',
        permanent: true,
      },
      {
        source: '/',
        destination: '/public/home',
        permanent: true,
      },
      {
        source: '/authentication',
        destination: '/authentication/sign-in',
        permanent: true,
      },
    ];
  },
};
