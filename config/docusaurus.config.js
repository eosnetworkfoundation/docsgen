// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

// include(./redocly-versions.m4)

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'EOS Developer Documentation',
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
    locales: ['en'],  //devrel#192: remove non-english locales  -prev: locales: ['en', 'zh', 'ko'],
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
        googleTagManager: {
          containerId: 'GTM-T4SWD2V'
        },
      }),
    ],
    [
       'redocusaurus',
       {
         // Plugin Options for loading OpenAPI files
         specs: [
           // M4RedoclySpecsPlaceHolder()
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
             label: '3.0',
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
             label: '3.1',
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
            label: '3.1',
            path: 'latest',
            banner: 'none',
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
             label: '1.0',
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

  // custom fields for nav bar
  customFields: {
    navbar: {
      logo: {
        alt: 'EOS Network',
        src: 'img/eosn_logo.svg',
      },
      items: [
        {
          docId: 'index',
          position: 'left',
          label: 'Home',
          to: '/',
        },
        {
          type: 'dropdown',
          label: 'Learn',
          position: 'left',
          items: [
            {
              label: 'Smart Contracts', // This label is used for mobile view
              title: 'Smart Contracts',
              subtitle: 'Learn to develop on EOS',
              icon: '/icons/brief-case-icon.svg', //replace with required icon
              href: '/docs/latest/smart-contracts/getting-started/',
            },
            {
              label: 'Node Operation',
              title: 'Node Operation',
              subtitle: 'Learn how to operate an EOS node',
              icon: '/icons/db-icon.svg',
              href: '/docs/latest/',
            },
            {
              label: 'Web Development',
              title: 'Web Development',
              subtitle: 'Learn to integrate EOS into your web app',
              icon: '/icons/globe-icon.svg',
              href: '/docs/latest/smart-contracts/tutorials/',
            },
            {
              label: 'EOS EVM',
              title: 'EOS EVM',
              subtitle: 'Learn to develop on EOS EVM',
              icon: '/icons/box-icon.svg',
              href: '/docs/latest/resources/protocol/',
            }
          ],
        },
        // {
        //   docId: 'api-listing',
        //   position: 'left',
        //   label: 'APIs',
        //   to: '/docs/latest/api-listing/',
        // },
        {
          docId: 'courses',
          position: 'left',
          label: 'Courses',
          to: 'https://learn.eosnetwork.com/',
        },
        // hidden as per task description
        // {
        //   type: 'dropdown',
        //   label: 'Courses',
        //   position: 'left',
        //   items: [
        //     {
        //       label: 'Smart Contracts',
        //       icon: '/icons/brief-case-icon.svg',
        //       title: 'Smart contracts',
        //       subtitle: 'Start here to build and deploy basic smart contract',
        //       href: '/system-contracts/latest/',
        //     },
        //     {
        //       label: 'Smart Contracts',
        //       icon: '/icons/db-icon.svg',
        //       title: 'Smart contracts',
        //       subtitle: 'Start here to build and deploy basic smart contract',
        //       href: '/system-contracts/latest/',
        //     },
        //     {
        //       label: 'Smart Contracts',
        //       icon: '/icons/box-icon.svg',
        //       title: 'Smart contracts',
        //       subtitle: 'Start here to build and deploy basic smart contract',
        //       href: '/system-contracts/latest/',
        //     },
        //     {
        //       label: 'Smart Contracts',
        //       icon: '/icons/globe-icon.svg',
        //       title: 'Smart contracts',
        //       subtitle: 'Start here to build and deploy basic smart contract',
        //       href: '/system-contracts/latest/',
        //     },
        //     // ... more items
        //   ],
        // },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    main: {
      firstCards: [
        {
          icon: 'icons/ethereum-logo.svg', // docs
          title: 'EOS EVM',
          subtitle: 'Take advantage of the world\'s fastest EVM',
          link: '/docs/latest/eos-evm/getting-started',
        },
        {
          icon: '/icons/docs-icon.svg',
          title: 'Try EOS in DUNE',
          subtitle: 'Get started with smart contract development using DUNE',
          link: '/docs/latest/smart-contracts/getting-started/dune-guide/',
        }
      ],
      secondCards: [
        {
          icon: 'icons/molecules-icon.svg',
          title: 'Go deeper',
          subtitle: 'Take a look under the hood',
          link: '/docs/latest/resources/protocol/',
          color: 'yellow',
        },
        {
          icon: '/icons/chat-icon.svg',
          title: 'Tic-tac-toe',
          subtitle: 'Learn how to make Tic-tac-toe fully on-chain!',
          link: '/docs/latest/smart-contracts/tutorials/tic-tac-toe-game-contract',
          color: 'yellow',
        },
        {
          icon: '/icons/ref-icon.svg',
          title: 'Reference',
          subtitle: "Consult the API references explore the EOS RPC",
          link: '/docs/latest/api-listing/',
        },
        {
          icon: '/icons/docs-icon.svg',
          title: 'Glossary',
          subtitle: 'Confused with some terms? Read them all here',
          link: '/docs/latest/glossary',
        }
      ],
      wideCard: {
        title: 'Smart Contracts',
        subtitle: 'Learn how to build Smart Contracts on EOS',
        icon: '/icons/emerald-icon.svg',
        href: '/docs/latest/smart-contracts/getting-started/',
      },
      signUp: {
        title: 'Sign up for developer alerts',
        subtitle: `
          Don't be caught with your pants down. Breaking changes will happen. If you want to stay on top of things when they do make sure to sign up for developer alerts emails.
        `,
        action: 'https://eosnetwork.us8.list-manage.com/subscribe/post',
        buttonText: 'ALERT ME',
      },
    },
    featureFlags: {
      lang: true,
    }
  },

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        logo: {
          alt: 'EOS Network',
          src: 'img/eosn_logo.svg',
        },
        // keep this items array as is, this is used just to let docosaurus know that something is there
        items: [
          {
            type: 'doc',
            docId: 'index',
            position: 'left',
            label: 'Welcome',
          },
        ]
      },
      colorMode: {
        disableSwitch: true,
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
          externalUrlRegex: 'docs.eosnetwork.com',

          // Optional: Algolia search parameters
          searchParameters: {},

          // Optional: path for search page that enabled by default (`false` to disable it)
          searchPagePath: 'search',

          //... other Algolia params
      },
      docs: {
        /* closes sibling categories when expanding a category */
        sidebar: { autoCollapseCategories: true },
      },
      footer: {
        style: 'dark',
        logo: {
          alt: 'EOS Network',
          src: 'img/eosn_logo_white.svg',
          srcDark: 'img/eosn_logo.svg',
        },
        links: [
          // {
          //   title: 'Websites',
          //   items: [
          //     { label: 'EOS Network',
          //       href: 'https://eosnetwork.com/',
          //     },
          //   ],
          // },
          {
            title: 'Terms',
            items: [
              {
                label: 'Terms & Conditions, Privacy',
                href: 'https://eosnetwork.com/terms-and-conditions',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/eosnetworkfoundation',
                logo: '/icons/github-icon.svg',
              },
              {
                label: 'Discord',
                href: 'https://discord.gg/XjVqej4uT5',
                logo: '/icons/discord-icon.svg',
              },
              // UNCOMMENT LATES WHEN WE HAVE ICONS
              // {
              //   label: 'Telegram',
              //   href: 'https://t.me/EOSNetworkFoundation',
              //   logo: '/icons/telegram-icon.svg',
              // },
              // {
              //   label: 'Twitter',
              //   href: 'https://twitter.com/eosnfoundation',
              //   logo: '/icons/twitter-icon.svg',
              // },
              // {
              //   label: 'Youtube',
              //   href: 'https://www.youtube.com/c/everythingeos',
              //   logo: '/icons/youtube-icon.svg',
              // },
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
