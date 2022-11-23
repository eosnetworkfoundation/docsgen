import React from 'react';
import {
  splitNavbarItems,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import LocaleDropdownNavbarItem from '@site/src/theme/NavbarItem/LocaleDropdownNavbarItem';

import styles from './styles.module.css';

export const NavbarMobileSidebarLocaleMenu = () => {
  const mobile = useNavbarMobileSidebar();

  return (
    <div className={styles.localeItem}>
      <LocaleDropdownNavbarItem mobile={mobile} dropdownItemsAfter={[]} dropdownItemsBefore={[]} />
    </div>
  )
}