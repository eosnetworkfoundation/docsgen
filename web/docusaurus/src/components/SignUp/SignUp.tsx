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
        <form action={action} method="POST" className={styles.form}>
          <input type="hidden" name="u" value="d65a053d24b3cc087dfb925bb" />
          <input type="hidden" name="id" value="be3f545626" />
          <input type="hidden" name="orig-lang" value="1" />
          <input className={styles.inputMobile} name="MERGE0" id="MERGE0" type="email" placeholder="Enter your email" pattern='' />
          <input className={styles.inputDesktop} name="MERGE0" id="MERGE1" type="email" placeholder="Enter your email" />
          <Button type="submit">{buttonText}</Button>
        </form>
      </div>
    </div>
  )
}
