const path = require('path');

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
    prependData: `@import "_variables.scss";`,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
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
        destination: '/contacts',
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
