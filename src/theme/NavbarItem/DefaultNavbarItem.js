import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import NavbarNavLink from '@theme/NavbarItem/NavbarNavLink';
import { useLocation } from '@docusaurus/router';
function DefaultNavbarItemDesktop({
  className,
  isDropdownItem = false,
  isActive,
  ...props
}) {
  const element = (
    <NavbarNavLink
      className={clsx(
        isDropdownItem ? 'dropdown__link' : 'navbar__item navbar__link',
        className,
        isActive() ? 'navbar__link__active__custom' : '',
      )}
      isDropdownLink={isDropdownItem}
      {...props}
    />
  );
  if (isDropdownItem) {
    return <li>{element}</li>;
  }
  return element;
}

function DefaultNavbarItemMobile({className, isDropdownItem, ...props}) {
  return (
    <li className="menu__list-item">
      <NavbarNavLink className={clsx('menu__link', className)} {...props} />
    </li>
  );
}

export default function DefaultNavbarItem({
  mobile = false,
  position, // Need to destructure position from props so that it doesn't get passed on.
  ...props
}) {
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (props.href === location.pathname || props.to === location.pathname) {
      setIsActive(true);
    }

    return () => {
      setIsActive(false);
    }
  }, [location.pathname]);

  const Comp = mobile ? DefaultNavbarItemMobile : DefaultNavbarItemDesktop;

  return (
    <Comp
        {...props}
        activeClassName={
          props.activeClassName ??
          (mobile ? 'menu__link--active' : 'navbar__link--active')
        }
        isActive={() => isActive}
      />
  );
}
