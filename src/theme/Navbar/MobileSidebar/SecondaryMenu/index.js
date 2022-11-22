import React from 'react';
import {useThemeConfig} from '@docusaurus/theme-common';
import {useNavbarSecondaryMenu, useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import Translate from '@docusaurus/Translate';
import SearchBar from '@site/src/theme/SearchBar';
import CustomTOC from '@site/src/components/CustomTOC/CustomTOC';
import { useLocation } from '@docusaurus/router';

import styles from './styles.module.css';

function SecondaryMenuBackButton(props) {
  return (
    <button {...props} type="button" className="clean-btn navbar-sidebar__back">
      <Translate
        id="theme.navbar.mobileSidebarSecondaryMenu.backButtonLabel"
        description="The label of the back button to return to main menu, inside the mobile navbar sidebar secondary menu (notably used to display the docs sidebar)">
        ← Back to main menu
      </Translate>
    </button>

  );
}
// The secondary menu slides from the right and shows contextual information
// such as the docs sidebar
export default function NavbarMobileSidebarSecondaryMenu() {
  const isPrimaryMenuEmpty = useThemeConfig().navbar.items.length === 0;
  const mobileSidebar = useNavbarMobileSidebar();
  const secondaryMenu = useNavbarSecondaryMenu();
  const location = useLocation();

  const onClick = () => mobileSidebar.toggle();
  
  if (location.state) {
    const {doc} = location.state;

    return (
      <>
        {!isPrimaryMenuEmpty && (
          <SecondaryMenuBackButton onClick={() => secondaryMenu.hide()} />
        )}
        <div className={styles.secondary_menu}>
          <SearchBar />
          {secondaryMenu.content}
          <CustomTOC doc={location.state.doc} onClick={onClick} />
        </div>
      </>
    );
  } else return null
}
