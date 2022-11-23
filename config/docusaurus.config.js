// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

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
        lastVersion: 'current', // switch to 3.1
        path: 'eosdocs/leap',
        routeBasePath: 'leap',
        sidebarPath: require.resolve('./sidebarsLeap.js'),
        versions: {
          current: {
            label: '3.2-rc1',
            path: 'latest', // switch to 3.2-rc1
            banner: 'unreleased',
          },
          /* DROPME
          '3.1' : {
            label: '3.1',
            path: 'latest',
            banner: 'none',
          }
          DROPME */
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
              label: 'Getting started', // This label is used for mobile view
              title: 'Getting started',
              subtitle: 'Get started with EOSIO',
              icon: '/icons/brief-case-icon.svg', //replace with required icon
              href: '/docs/latest/getting-started/',
            },
            {
              label: 'Core concepts',
              title: 'Core concepts',
              icon: '/icons/db-icon.svg',
              subtitle: 'Learn about the core concepts of EOSIO',
              href: '/docs/latest/overview/core_concepts',
            },
            {
              label: 'Tutorials',
              title: 'Tutorials',
              icon: '/icons/box-icon.svg',
              subtitle: 'Learn how to build on EOSIO',
              href: '/docs/latest/tutorials/',
            },
            {
              label: 'Protocol',
              title: 'Protocol',
              icon: '/icons/globe-icon.svg',
              subtitle: 'Learn about the EOSIO protocol',
              href: '/docs/latest/protocol/',
            },
            {
              label: 'Tools',
              title: 'Tools',
              icon: '/icons/globe-icon.svg',
              subtitle: 'Learn about the EOSIO tools',
              href: '/docs/latest/community-developer-tools/',
            },
            {
              label: 'Glossary',
              title: 'Glossary',
              icon: '/icons/globe-icon.svg',
              subtitle: 'Learn about the EOSIO protocol',
              href: '/docs/latest/glossary',
            },
          ],
        },
        {
          docId: 'api-listing',
          position: 'left',
          label: 'API Reference',
          to: '/docs/latest/api-listing/',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    main: {
      firstCards: [
        {
          icon: 'icons/docs-icon.svg',
          title: 'Smart Contracts',
          subtitle: 'Start here to build and deploy basic smart contract',
          link: '/docs/smart-contracts/overview',
        },
        {
          icon: '/icons/emerald-icon.svg',
          title: 'EOSIO Basics',
          subtitle: 'Gain a basic-level understanding of EOSIO core concepts.',
          link: '/docs/eosio-basics/overview',
        }
      ],
      secondCards: [
        {
          icon: 'icons/molecules-icon.svg',
          title: 'Run a Node',
          subtitle: 'Learn how to run an EOSIO node and manage your servers.',
          link: '/docs/smart-contracts/overview',
          color: 'yellow',
        },
        {
          icon: '/icons/chat-icon.svg',
          title: 'Advanced topics',
          subtitle: 'Dig in with comprehensive info about smart contracts, the protocol and security.',
          link: '/docs/eosio-basics/overview',
          color: 'yellow',
        },
        {
          icon: '/icons/ref-icon.svg',
          title: 'Reference',
          subtitle: "Consult the API references to see exactly what's available from an EOSIO node",
          link: '/docs/smart-contracts/overview',
        },
        {
          icon: '/icons/sdk-icon.svg',
          title: 'Client SDKs',
          subtitle: 'Learn how to integrate EOSIO into your decentralized applications',
          link: '/docs/eosio-basics/overview',
        }
      ],
      wideCard: {
        title: 'Public and Private Keys',
        subtitle: 'We all have to start somewhere, and this is the first step on your journey to developing decentralized applications with EOSIO',
        icon: '/icons/keys-icon.svg',
        href: '#',
      },
      signUp: {
        title: 'Sign up for developer alerts',
        subtitle: `
          Sometimes things require breaking changes.
          These could come from wallets, the protocol, or anywhere on the stack.
          If you want to stay apprised of such situations make sure to sign up for the developer alerts.
        `,
        action: 'https://eosnetwork.us8.list-manage.com/subscribe/post',
        buttonText: 'SIGN ME UP SCOTTY',
      }
    },
  },

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        logo: {
          alt: 'EOS Network',
          src: 'img/eosn_logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'index',
            position: 'left',
            label: 'Welcome',
          },
        ],
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
          //searchParameters: {},

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
        logo: {
          alt: 'EOS Network',
          src: 'img/eosn_logo_white.svg',
          srcDark: 'img/eosn_logo.svg',
        },
        links: [
          {
            title: 'Websites',
            items: [
              { label: 'EOS Network',
                href: 'https://eosnetwork.com/',
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
