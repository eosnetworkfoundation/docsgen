import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import React from 'react';
import { Button } from '../Shared/Button/Button';
import { H3, P_XLarge } from '../Shared/Typography/Typography';

import styles from './styles.module.css';

export const SignUp = () => {
  const { siteConfig } = useDocusaurusContext();

  const { title, subtitle, action, buttonText } = siteConfig.customFields.main.signUp;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <H3 className={styles.title}>{title}</H3>
        <P_XLarge className={styles.subtitle}>{subtitle}</P_XLarge>
        <form action={action} className={styles.form}>
          <input className={styles.inputMobile} type="email" placeholder="Enter your email" pattern='' />
          <input className={styles.inputDesktop} type="email" placeholder="Enter your email" />
          <Button type="submit">{buttonText}</Button>
        </form>
      </div>
    </div>
  )
}