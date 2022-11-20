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
    title: <Translate>How EOS Works</Translate>,
    description: (
      <Translate>
        Get familar with the concepts and how to work with the core software.
      </Translate>
    ),
    link: '/docs/latest/',
  },
  {
    title: <Translate>Getting Started </Translate>,
    description: (
      <Translate>
        Step by step instructions for setting up your environment.
      </Translate>
    ),
    link: '/docs/latest/getting-started/',
  },
  {
    title: <Translate>The Antelope Stack</Translate>,
    description: (
      <Translate>
        Bring the power of EOS into your dApp.
      </Translate>
    ),
    link: '/leap/latest/',
  },
  {
    title: <Translate>API Reference</Translate>,
    description: (
      <Translate>
        Consult our documentation for APIs and SDKs
      </Translate>
    ),
    link: '/docs/latest/api-listing',
  },
  {
    title: <Translate>Resources</Translate>,
    description: (
      <Translate>
        Information to help you get started
      </Translate>
    ),
    link: '/docs/latest/resources/',
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
