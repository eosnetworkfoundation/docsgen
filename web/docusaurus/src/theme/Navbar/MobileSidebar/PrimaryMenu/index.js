import React from 'react';
import { useThemeConfig } from '@docusaurus/theme-common';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import NavbarItem from '@theme/NavbarItem';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import { NavbarMobileSidebarLocaleMenu } from '@site/src/components/NavbarMobileSidebarLocaleMenu/NavbarMobileSidebarLocaleMenu';

export default function NavbarMobilePrimaryMenu() {
  const mobileSidebar = useNavbarMobileSidebar();
  // TODO how can the order be defined for mobile?
  // Should we allow providing a different list of items?
  const { siteConfig } = useDocusaurusContext();
  const items = siteConfig.customFields.navbar.items;
  const { lang } = siteConfig.customFields.featureFlags;
  const leftItems = items.filter((item) => item.position === 'left');
  const rightItems = items.filter((item) => item.position === 'right');

  return (
    <div>
      <NavbarMobileSidebarLocaleMenu />
      {!lang && <div className="menu__divider" />}
      <ul className={`${lang && 'menu__list_top_margin'} menu__list`}>
        {leftItems.map((item, i) => (
          <NavbarItem
            mobile
            {...item}
            onClick={() => mobileSidebar.toggle()}
            key={i}
          />
        ))}
      </ul>
    </div>
  );
}
