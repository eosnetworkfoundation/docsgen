import React from 'react';
import LinkItem from '@theme/Footer/LinkItem';
function Separator() {
  return <span className="footer__link-separator">·</span>;
}
function SimpleLinkItem({ item }) {
  return <LinkItem item={item} />;
}
export default function FooterLinksSimple({ links }) {
  return (
    <div className="footer__links">
      {links.items.map((item, i) => (
        <React.Fragment key={i}>
          <SimpleLinkItem item={item} />
        </React.Fragment>
      ))}
    </div>
  );
}
