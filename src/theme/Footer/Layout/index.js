import React from 'react';
import clsx from 'clsx';
export default function FooterLayout({style, links, terms, logo, copyright}) {
  const termContent = terms.items[0];

  return (
    <footer
      className={clsx('footer', {
        'footer--dark': style === 'dark',
      })}>
      <div className="container container-fluid">
        {logo && 
          <div className="footer__logo_container">
            {logo}
            {links}
            </div>
            }
        {copyright && (
          <div className="footer__bottom text--center">
            {termContent && (
              <div className="footer__terms">
                <a href={termContent.href} target="_blank" rel="noreferrer noopener">
                  {termContent.label}
                </a>
              </div>
            )}
            {copyright}
          </div>
        )}
      </div>
    </footer>
  );
}
