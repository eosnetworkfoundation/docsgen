import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useAlternatePageUtils} from '@docusaurus/theme-common/internal';
import {translate} from '@docusaurus/Translate';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';
import IconLanguage from '@theme/Icon/Language';
import styles from './styles.module.css';
import { SidebarDABlue } from '@site/static/icons';

export default function LocaleDropdownNavbarItem({
  mobile,
  dropdownItemsBefore,
  dropdownItemsAfter,
  ...props
}) {
  const {
    i18n: {currentLocale, locales, localeConfigs},
    siteConfig
  } = useDocusaurusContext();

  const { lang } = siteConfig.customFields.featureFlags;

  if (!lang) {
    const alternatePageUtils = useAlternatePageUtils();
    const localeItems = locales.map((locale) => {
      const to = `pathname://${alternatePageUtils.createUrl({
        locale,
        fullyQualified: false,
      })}`;
      return {
        label: localeConfigs[locale].label,
        lang: localeConfigs[locale].htmlLang,
        to,
        target: '_self',
        autoAddBaseUrl: false,
        className:
          // eslint-disable-next-line no-nested-ternary
          locale === currentLocale
            ? // Similar idea as DefaultNavbarItem: select the right Infima active
              // class name. This cannot be substituted with isActive, because the
              // target URLs contain `pathname://` and therefore are not NavLinks!
              mobile
              ? 'menu__link--active'
              : 'dropdown__link--active'
            : '',
      };
    });
  
    let items = [];
  
    if (!dropdownItemsBefore && !dropdownItemsBefore) {
      items = localeItems;
    } else {
      items = [...dropdownItemsBefore, ...localeItems, ...dropdownItemsAfter];
    }
    
    // Mobile is handled a bit differently
    const dropdownLabel = localeConfigs[currentLocale].label;
  
    return (
      <DropdownNavbarItem
        {...props}
        mobile={mobile}
        className={styles.localeDropdown}
        label={
          <p>
            {dropdownLabel.slice(0, 2).toUpperCase()}
            <SidebarDABlue />
          </p>
        }
        items={items}
      />
    );
  } else {
    return null;
  }
}
