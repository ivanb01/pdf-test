const path = require('path');

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "_variables.scss";`,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/contacts',
        permanent: true,
      },
      {
        source: '/authentication',
        destination: '/authentication/sign-in',
        permanent: true,
      },
      {
        source: '/contacts',
        destination: '/contacts/clients',
        permanent: true,
      },
    ];
  },
};
