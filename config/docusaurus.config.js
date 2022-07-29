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
  projectName: 'engineering/developer_documentation', // Usually your repo name.

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
          path: 'eosdocs',
          routeBasePath: 'eosdocs',
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
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
            href: 'https://docs.eosnetwork.com/reference/mandel-contracts/annotated.html',
            position: 'left',
            label: 'Smart Contracts',
          },
          {
            type: 'doc',
            docId: 'client-side/index',
            position: 'left',
            label: 'Client Side',
          },
          {
            type: 'doc',
            docId: 'developer-tools/index',
            position: 'left',
            label: 'Developer Tools',
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
          /*
          // ********* More links in footer
          {
            title: 'More',
            items: [
              {
                label: 'FOOLABLE-TBR',
                to: '/',
              },
              {
                label: 'GitHub-TBR',
                href: 'https://github.com/facebook/docusaurus',
              },
            ],
          },
          */
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
