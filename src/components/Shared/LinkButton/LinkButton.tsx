import React from 'react';

import styles from './styles.module.css';

interface LinkButtonProps {
  text: string;
  href: string;
  onClick?: () => void;
}

export const LinkButton = ({ text, href, onClick }: LinkButtonProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <a className={styles.linkButton} href={href} onClick={handleClick}>
      {text}
    </a>
  );
}