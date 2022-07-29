import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

import Link from '@docusaurus/Link';

import Translate, {translate} from '@docusaurus/Translate';

type FeatureItem = {
  title: string;
  description: JSX.Element;
  link: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: <Translate>Smart Contracts</Translate>,
    description: (
      <Translate>
        Leverage the power of EOS, and distributed computing to build your own dApp.
      </Translate>
    ),
    link: 'http://docs.eosnetwork.com/reference/mandel-contracts/classeosiosystem_1_1system__contract.html',
  },
  {
    title: <Translate>Developer Tools</Translate>,
    description: (
      <Translate>
        Under the hood look at the developer tools to work with the EOS blockchain.
      </Translate>
    ),
    link: '/eosdocs/developer-tools/',
  },
  {
    title: <Translate>Client SDK</Translate>,
    description: (
      <Translate>
        Bring the power of EOS into your website, or mobile app.
      </Translate>
    ),
    link: '/eosdocs/client-side/',
  },
];

function Feature({title, description, link}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
          <h3>{title}</h3>
          <p>{description}</p>
          <div className={styles.buttons}>
            <Link
              className="button button--secondary button--lg"
              to={link}>
              {title}
            </Link>
          </div>
        </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
