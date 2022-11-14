import React from 'react';

import styles from './styles.module.css';

interface ButtonProps {
  children: React.ReactElement | string;
  type: "button" | "submit" | "reset" | undefined;
}

export const Button = ({ children, type }: ButtonProps) => {
  return (
    <button className={styles.button} type={type}>
      {children}
    </button>
  );
}