import React from 'react';

import styles from './styles.module.css';

export const CardWrapper = ({ children }: { children: any }) => {
  if (children.length > 2) {
    const firstChildren = children.slice(0, 2);
    const secondChildren = children.slice(2, 4);

    return (
      <div className={styles.cardWrapper}> 
          {firstChildren}
        <div className={styles.divider} />
          {secondChildren}
      </div>
    );
  }
 
  return (
    <div className={styles.cardWrapper}>
      {children}
    </div>
  )
}