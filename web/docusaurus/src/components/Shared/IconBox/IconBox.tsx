import clsx from 'clsx';
import React from 'react';

import styles from './styles.module.css';

export const IconBox = ({ icon, color }: { icon: any, color?: "blue" | "yellow" }) => {
  return (
    <div className={clsx(styles.iconContainer, color && styles.yellow)}>
      <img src={icon} alt="icon" />
    </div>
  )
}