# Docusource - Site Navigation

All of this configuration is in a single configuration file `config/docusarus.config.js`.

## Everything managed by Docusaurus
- localization Dropdown
- shortcuts to doc-ids inside docusaurus
- left sidebar site index
- right sidebar document table of contents
- footer

## How to Edit Top Menu Bar (customize for user)
Make changes to `config/docusarus.config.js`
[Navbar Configuration](https://docusaurus.io/docs/api/themes/configuration#navbar)
## Search
Make changes to `config/docusarus.config.js`
[Algolia Search](https://docusaurus.io/docs/search#using-algolia-docsearch)
## Drop down list of doc categories, such as dev roles
Make changes to `config/docusarus.config.js`
[Navbar Items](https://docusaurus.io/docs/api/themes/configuration#navbar-dropdown-type)
## How to Edit Left SideBar
Multiple side bars are used. You can find them in `web/docusaurus/src/` as `sidebar_*.js` files. The association between sidebars and docusarus is found in `config/docusarus.config.js`. Look for  `sidebarPath`
[Multiple Sidebars](https://docusaurus.io/docs/sidebar/multiple-sidebars)
## How to Edit Right SideBar (table of contents)
Make changes to `config/docusarus.config.js`
[Customizing Table of Contents](https://docusaurus.io/docs/markdown-features/toc#customizing-table-of-contents-generation)
## How to Edit Footer
Make changes to `config/docusarus.config.js`
[Change Footer Links](https://docusaurus.io/docs/api/themes/configuration#footer-links)
