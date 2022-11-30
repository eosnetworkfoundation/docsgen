import React, { useEffect, useState } from 'react';
import { useDocsSidebar } from '@docusaurus/theme-common/internal';
import Layout from '@theme/Layout';
import BackToTopButton from '@theme/BackToTopButton';
import DocPageLayoutSidebar from '@theme/DocPage/Layout/Sidebar';
import DocPageLayoutMain from '@theme/DocPage/Layout/Main';
import styles from './styles.module.css';
import { SidebarDABlue } from '@site/static/icons';
import clsx from 'clsx';

export default function DocPageLayout({ children }) {
  const sidebar = useDocsSidebar();
  const [hiddenSidebarContainer, setHiddenSidebarContainer] = useState(false);
  const [isHoveringSidebar, setIsHoveringSidebar] = useState(false);
  const [isManuallyCollapsed, setIsManuallyCollapsed] = useState(false);

  useEffect(() => {
    // await for 300ms
    const timeout = setTimeout(() => {
      if (hiddenSidebarContainer) {
        setHiddenSidebarContainer(!isHoveringSidebar);
      } else if (!isHoveringSidebar && isManuallyCollapsed) {
        setHiddenSidebarContainer(true);
      }
    }
      , 300);

    return () => {
      clearTimeout(timeout);
    }

  }, [isHoveringSidebar]);

  const toggleSidebar = () => {
    setHiddenSidebarContainer(!hiddenSidebarContainer);
    setIsManuallyCollapsed(!isManuallyCollapsed);
  }

  const onSidebarHover = () => {
    setIsHoveringSidebar(true);
  }

  const onSidebarLeave = () => {
    setIsHoveringSidebar(false);
  }

  return (
    <Layout wrapperClassName={styles.docsWrapper}>
      <BackToTopButton />
      <div className={styles.docPage}>
        <div className={styles.docContainer}>
          <div
            className={
              clsx(
                styles.collapseSidebarContainer,
                hiddenSidebarContainer && styles.collapsedSidebarContainer,
              )
            }
          >
            <button
              className={clsx(styles.collapseSidebar, hiddenSidebarContainer && styles.collapsedSidebar)}
              onClick={toggleSidebar}
            >
              <SidebarDABlue />
            </button>
          </div>
          {sidebar && (
            <DocPageLayoutSidebar
              sidebar={sidebar.items}
              hiddenSidebarContainer={hiddenSidebarContainer}
              onHover={onSidebarHover}
              onLeave={onSidebarLeave}
            />
          )}
          <DocPageLayoutMain hiddenSidebarContainer={hiddenSidebarContainer}>
            {children}
          </DocPageLayoutMain>
        </div>
      </div>
    </Layout>
  );
}
