import React from 'react';
import clsx from 'clsx';

import styles from './styles.module.css';

// Recursive component rendering the toc tree
function TOCItemTree({toc, className, linkClassName, isChild, isMobile, onClick}) {
  if (!toc.length) {
    return null;
  }

  return (
    <ul className={clsx(isChild ? undefined : className, styles.tocUl, isChild && styles.tocUlChild)}>
      {toc.map((heading) => (
        <li key={heading.id} onClick={isMobile ? onClick : undefined}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <a
            href={`#${heading.id}`}
            className={clsx(linkClassName ?? undefined, isChild && styles.tocItemChild, styles.tocItem)}
            // Developer provided the HTML, so assume it's safe.
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{__html: heading.value}}
          />
          <TOCItemTree
            isChild
            toc={heading.children}
            className={className}
            linkClassName={linkClassName}
          />
        </li>
      ))}
    </ul>
  );
}
// Memo only the tree root is enough
export default React.memo(TOCItemTree);
