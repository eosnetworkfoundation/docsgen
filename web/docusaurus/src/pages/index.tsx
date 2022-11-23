import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageHeader from '@site/src/components/Header/Header';
import { WideCard } from '../components/WideCard/WideCard';
import { Card } from '../components/Card/Card';
import { CardWrapper } from '../components/CardWrapper/CardWrapper';

import { SignUp } from '../components/SignUp/SignUp';

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();

  const { firstCards, secondCards } = siteConfig.customFields.main;
  
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      wrapperClassName="index-page"
      description="Description will go into a meta tag in <head />">
      <div id="long-line-bg" />
      <HomepageHeader />
      <main>
        <WideCard />
        <CardWrapper>
          {firstCards.map((item, index) => (
            <Card key={index} icon={item.icon} title={item.title} subtitle={item.subtitle} link={item.link} />
          ))}
        </CardWrapper>
        <SignUp />
        <CardWrapper>
            {secondCards.map((item, index) => (
              <Card key={index} icon={item.icon} title={item.title} subtitle={item.subtitle} link={item.link} color={item.color} />
            ))}
        </CardWrapper>
      </main>
    </Layout>
  );
}
