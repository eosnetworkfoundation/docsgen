import Link from '@docusaurus/Link';
import React from 'react';
import { H5_Bold, P_XS } from '../Shared/Typography/Typography';

import styles from './styles.module.css';

interface DropDownItemProps {
  title: string;
  subtitle: string;
  icon: string;
  href: string;
  onClick?: () => void;
}

export const DropDownItem = ({ title, subtitle, icon, href, onClick }: DropDownItemProps) => {
  return (
    <li className={styles.container} onClick={onClick}>
      <Link href={href} className={styles.wrapper}>
        <div className={styles.icon}>
          <img src={icon} alt={title} />
        </div>
        <div className={styles.content}>
          <H5_Bold>{title}</H5_Bold>
          <P_XS>{subtitle}</P_XS>
        </div>
      </Link>
    </li>
  )
}