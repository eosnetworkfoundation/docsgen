import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { DropdownIcon } from '@site/static/icons';

export default function PaginatorNavLink(props) {
  const { permalink, title, subLabel, isNext } = props;
  return (
    <Link
      className={clsx(
        'pagination-nav__link',
        isNext ? 'pagination-nav__link--next' : 'pagination-nav__link--prev',
      )}
      to={permalink}>
      <div className={isNext ? 'pagination-nav__link__content-next' : "pagination-nav__link__content-prev"}>
        <div className={isNext ? 'dropdown-icon-rotated-right' : 'dropdown-icon-rotated-left'}>
          <DropdownIcon />
        </div>
        <div>
          {subLabel && <div className="pagination-nav__sublabel">{subLabel}</div>}
          <div className="pagination-nav__label">{title}</div>
        </div>
      </div>
    </Link>
  );
}
