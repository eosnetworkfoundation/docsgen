// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'EOS Developer Documenation',
  tagline: 'Documentation for Developing on EOS Blockchain',
  url: 'https://docs.eosnetwork.com/',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  // image under statics directory
  favicon: 'img/cropped-EOS-Network-Foundation-Site-Icon-1-150x150.png',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'eosnetwork', // Usually your GitHub org/user name.
  projectName: 'developer-documentation', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh', 'ko'],
    path: 'i18n',
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
        calendar: 'gregory',
        path: 'en',
      },
      zh: {
        label: '中文 Chinese',
        direction: 'ltr',
        htmlLang: 'zh-CN',
        calendar: 'gregory',
        path: 'zh',
      },
      ko: {
        label: '한국어 Korean',
        direction: 'ltr',
        htmlLang: 'ko-KR',
        calendar: 'gregory',
        path: 'ko',
      },
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          // id: 'docs', // omitted => default instance
          lastVersion: 'current',
          path: 'eosdocs/docs',
          routeBasePath: 'docs',
          sidebarPath: require.resolve('./sidebars.js'),
          versions: {
            current: {
               label: 'latest',
               path: 'latest',
            },
          },
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
    [
       'redocusaurus',
       {
         // Plugin Options for loading OpenAPI files
         specs: [
           {
             spec: 'openapi/leap-plugins/latest/chain.swagger.yaml',
             route: '/leap-plugins/latest/chain.api/',
           },
           {
             spec: 'openapi/leap-plugins/latest/db_size.swagger.yaml',
             route: '/leap-plugins/latest/db_size.api/',
           },
           {
             spec: 'openapi/leap-plugins/latest/net.swagger.yaml',
             route: '/leap-plugins/latest/net.api/',
           },
           {
             spec: 'openapi/leap-plugins/latest/producer.swagger.yaml',
             route: '/leap-plugins/latest/producer.api/',
           },
           {
             spec: 'openapi/leap-plugins/latest/test_control.swagger.yaml',
             route: '/leap-plugins/latest/test_control.api/',
           },
           {
             spec: 'openapi/leap-plugins/latest/trace_api.swagger.yaml',
             route: '/leap-plugins/latest/trace.api/',
           },
         ],
         // Theme Options for modifying how redoc renders them
         theme: {
           // Change with your site colors
           primaryColor: '#1890ff',
         },
       },
     ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'cdt',
        lastVersion: 'current',
        path: 'eosdocs/cdt',
        routeBasePath: 'cdt',
        sidebarPath: require.resolve('./sidebarsCdt.js'),
        versions: {
          current: {
             label: 'latest',
             path: 'latest',
          },
        },
        // ... other options
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'system-contracts',
        lastVersion: 'current',
        path: 'eosdocs/system-contracts',
        routeBasePath: 'system-contracts',
        sidebarPath: require.resolve('./sidebarsSystemContracts.js'),
        versions: {
          current: {
             label: 'latest',
             path: 'latest',
          },
        },
        // ... other options
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'leap',
        lastVersion: 'current',
        path: 'eosdocs/leap',
        routeBasePath: 'leap',
        sidebarPath: require.resolve('./sidebarsLeap.js'),
        versions: {
          current: {
             label: 'latest',
             path: 'latest',
          },
        },
        // ... other options
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'dune',
        lastVersion: 'current',
        path: 'eosdocs/DUNE',
        routeBasePath: 'DUNE',
        sidebarPath: require.resolve('./sidebarsDUNE.js'),
        versions: {
          current: {
             label: 'latest',
             path: 'latest',
          },
        },
        // ... other options
      },
    ],

    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'eosjs',
        lastVersion: 'current',
        path: 'eosdocs/eosjs',
        routeBasePath: 'eosjs',
        sidebarPath: require.resolve('./sidebars_eosjs_sdk.js'),
        versions: {
          current: { label: 'latest', path: 'latest', },
        },
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'swift-sdk',
        lastVersion: 'current',
        path: 'eosdocs/swift-sdk',
        routeBasePath: 'swift-sdk',
        sidebarPath: require.resolve('./sidebars_swift_sdk.js'),
        versions: {
          current: { label: 'latest', path: 'latest', },
        },
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'EOS Developer Documenation',
        logo: {
          alt: 'EOS Network',
          src: 'img/eosn_logo.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'index',
            position: 'left',
            label: 'Welcome',
          },
          {
            type: 'dropdown',
            label: 'Leap',
            position: 'left',
            items: [
              {
                label: '3.1',
                href: '/leap/latest/',
              },
              // ... more items
            ],
          },
          {
            type: 'dropdown',
            label: 'CDT',
            position: 'left',
            items: [
              {
                label: '3.0',
                href: '/cdt/latest/',
              },
            ],
          },
          {
            type: 'dropdown',
            label: 'EOS System Contracts',
            position: 'left',
            items: [
              {
                label: '3.1',
                href: '/system-contracts/latest/',
              },
              // ... more items
            ],
          },
          {
            type: 'dropdown',
            label: 'DUNE',
            position: 'left',
            items: [
              {
                label: '1.0',
                href: '/DUNE/latest/',
              },
            ],
          },
          {
            type: 'doc',
            docId: 'api-listing',
            position: 'left',
            label: 'API Reference',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/eosnetworkfoundation',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      algolia: {
          // The application ID provided by Algolia
          appId: 'XINC4ZXHCU',

          // Public API key: it is safe to commit it
          apiKey: 'f79cac8feb6c21d666ea50f725d69c0e',

          indexName: 'eosnetwork',

          // Optional: see doc section below
          contextualSearch: true,

          // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
          externalUrlRegex: 'external\\.com|domain\\.com',

          // Optional: Algolia search parameters
          searchParameters: {},

          // Optional: path for search page that enabled by default (`false` to disable it)
          searchPagePath: 'search',

          //... other Algolia params
      },
      docs: {
        /* closes sibling categories when expanding a category */
        sidebar: { autoCollapseCategories: true, },
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Websites',
            items: [
              { label: 'EOS Network',
                href: 'https://eosnetwork.com/',
              },
              { label: 'EOS Support',
                href: 'https://eossupport.io/',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Twitter',
                href: 'https://twitter.com/eosnfoundation',
              },
              {
                label: 'Discord',
                href: 'https://discord.gg/eos-network',
              },
              {
                label: 'Telegram',
                href: 'https://t.me/EOSNetworkFoundation',
              },
              {
                label: 'Youtube',
                href: 'https://www.youtube.com/c/everythingeos',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} EOS Network.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
