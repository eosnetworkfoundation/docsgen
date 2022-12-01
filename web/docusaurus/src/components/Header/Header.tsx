import React from 'react';
import clsx from 'clsx';
import Translate, {translate} from '@docusaurus/Translate';

import styles from './styles.module.css';
import { H1, H1_Bold, P_XLarge } from '../Shared/Typography/Typography';

const SiteDesc = <Translate>Let a better and decentralized world that begins with you, start here</Translate>;

const HomepageHeader = () => {
  return (
    <header className={clsx('hero hero--primary', styles.heroPrimary)}>
      <div className={styles.container}>
        <span className={styles.title}>
          <H1_Bold>Build your future</H1_Bold>
          <H1> with EOS</H1>
        </span>
        <P_XLarge className='subtitle'>{SiteDesc}</P_XLarge>
      </div>
    </header>
  );
}

export default HomepageHeader;
