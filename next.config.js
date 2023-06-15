const { getAllPosts } = require('./src/utils/api-docs');
const generateDocPagePath = require('./src/utils/generate-doc-page-path');

module.exports = {
  poweredByHeader: false,
  experimental: {
    appDir: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/fonts/:slug*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:all*(svg|jpg|png)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, must-revalidate',
          },
        ],
      },
    ];
  },
  async redirects() {
    const docPosts = await getAllPosts();
    const docsRedirects = docPosts.reduce((acc, post) => {
      const { slug, redirectFrom: postRedirects } = post;
      if (!postRedirects || !postRedirects.length) {
        return acc;
      }

      const postRedirectsArray = postRedirects.map((redirect) => ({
        source: redirect,
        destination: generateDocPagePath(slug),
        permanent: true,
      }));

      return [...acc, ...postRedirectsArray];
    }, []);

    return [
      {
        source: '/team',
        destination: '/about-us',
        permanent: true,
      },
      {
        source: '/jobs',
        destination: '/careers',
        permanent: true,
      },
      // Proxy has an error message, that suggests to read `https://neon.tech/sni` for more details.
      {
        source: '/sni',
        destination: '/docs/connect/connection-errors',
        permanent: true,
      },
      {
        source: '/docs',
        destination: '/docs/introduction',
        permanent: true,
      },
      {
        source: '/early-access',
        destination: '/',
        permanent: true,
      },
      {
        source: '/driver',
        destination: '/docs/serverless/serverless-driver',
        permanent: false,
      },
      {
        source: '/blog/postgres-autoscaling',
        destination: '/blog/scaling-serverless-postgres',
        permanent: false,
      },
      {
        source: '/api-reference',
        destination: 'https://api-docs.neon.tech/',
        permanent: true,
      },
      {
        source: '/api-reference/v2',
        destination: 'https://api-docs.neon.tech/v2',
        permanent: true,
      },
      ...docsRedirects,
    ];
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports not ending in ".inline.svg"
      {
        ...fileLoaderRule,
        test: /(?<!inline)\.svg$/i,
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.inline.svg$/i,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgo: true,
              svgoConfig: {
                plugins: [
                  {
                    name: 'preset-default',
                    params: {
                      overrides: {
                        removeViewBox: false,
                      },
                    },
                  },
                  'prefixIds',
                ],
              },
            },
          },
        ],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};
