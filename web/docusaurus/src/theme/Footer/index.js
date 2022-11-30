import React from 'react';
import {useThemeConfig} from '@docusaurus/theme-common';
import FooterLinks from '@theme/Footer/Links';
import FooterLogo from '@theme/Footer/Logo';
import FooterCopyright from '@theme/Footer/Copyright';
import FooterLayout from '@theme/Footer/Layout';
function Footer() {
  const {footer} = useThemeConfig();
  if (!footer) {
    return null;
  }
  const {copyright, links, logo, style} = footer;

  const communityLinks = links.filter(link => link.title === 'Community')[0];
  const termsAndPrivacyLinks = links.filter(link => link.title === 'Terms')[0];

  return (
    <FooterLayout
      style={style}
      links={communityLinks && <FooterLinks links={communityLinks} />}
      terms={termsAndPrivacyLinks}
      logo={logo && <FooterLogo logo={logo} />}
      copyright={copyright && <FooterCopyright copyright={copyright} />}
    />
  );
}
export default React.memo(Footer);
