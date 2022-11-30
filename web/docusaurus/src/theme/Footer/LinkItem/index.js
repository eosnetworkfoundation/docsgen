import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import isInternalUrl from '@docusaurus/isInternalUrl';
import IconExternalLink from '@theme/Icon/ExternalLink';
export default function FooterLinkItem({item}) {
  const { href, logo, label} = item;
  return (
    <Link
      className="footer__link-item"
      href={href}
      >
      {logo && (
        <img
          className="footer__community-logo"
          src={logo}
          alt={label}
        />
      )}
    </Link>
  );
}
