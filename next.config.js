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
  async redirects() {
    return [
      {
        source: '/contacts',
        destination: '/contacts/clients',
        permanent: true,
      },
      {
        source: '/',
        destination: '/public/features',
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
