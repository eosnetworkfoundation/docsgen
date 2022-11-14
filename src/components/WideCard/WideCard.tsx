import React from 'react';
import { LinkButton } from '../Shared/LinkButton/LinkButton';
import { IconBox } from '../Shared/IconBox/IconBox';

import styles from './styles.module.css';
import { H2_Bold, P_Medium } from '../Shared/Typography/Typography';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export const WideCard = () => {
  const { siteConfig } = useDocusaurusContext();

  const { title, subtitle, icon, href } = siteConfig.customFields.main.wideCard;
  
  return (
    <div className={styles.wideCard}>
      <div className={styles.cardContainer}>
        <div className={styles.iconTitleWrapper}>
          <IconBox icon={icon} />
          <H2_Bold className={styles.titleMobile}>{title}</H2_Bold>
        </div>
        <div className={styles.actionContent}>
          <H2_Bold className={styles.title}>{title}</H2_Bold>
          <P_Medium className={styles.subtitle}>{subtitle}</P_Medium>

          <LinkButton href={href} text={"Read more"} />
        </div>
      </div>
    </div>
  );
}