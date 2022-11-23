import React from 'react';
import { IconBox } from '../Shared/IconBox/IconBox';
import { H4, P_Small } from '../Shared/Typography/Typography';

import styles from './styles.module.css';

interface CardProps {
  icon: any;
  title: string;
  subtitle: string;
  link: string;
  color?: 'blue' | 'yellow';
}

export const Card = ({ icon, title, subtitle, link, color }: CardProps) => {
  return (
    <a className={styles.card} href={link}>
      <IconBox icon={icon} color={color} />
      <div className={styles.infoContainer}>
        <H4>{title}</H4>
        <P_Small>{subtitle}</P_Small>
      </div>
    </a>
  )
}