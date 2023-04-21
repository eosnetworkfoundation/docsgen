import React, { useEffect, useState } from 'react';
import Select from 'react-select'
import clsx from 'clsx';
import { useAllDocsData } from '@docusaurus/plugin-content-docs/client';
import {useDoc} from '@docusaurus/theme-common/internal';
import TOCItems from '@theme/TOCItems';
import styles from './styles.module.css';
import { useLocation, useHistory } from '@docusaurus/router';
// Using a custom className
// This prevents TOCInline/TOCCollapsible getting highlighted by mistake
const suggestTitle = '<ENTER A TITLE HERE>';

function useDocsSearchVersionsHelpers() {
  const allDocsData = useAllDocsData();
  // State of the version select menus / algolia facet filters
  // docsPluginId -> versionName map
  const [searchVersions, setSearchVersions] = useState(() =>
    Object.entries(allDocsData).reduce(
      (acc, [pluginId, pluginData]) => ({
        ...acc,
        [pluginId]: pluginData.versions[0].name,
      }),
      {},
    ),
  );
  // Set the value of a single select menu
  const setSearchVersion = (pluginId, searchVersion) =>
    setSearchVersions((s) => ({...s, [pluginId]: searchVersion}));
  const versioningEnabled = Object.values(allDocsData).some(
    (docsData) => docsData.versions.length > 1,
  );
  return {
    allDocsData,
    versioningEnabled,
    searchVersions,
    setSearchVersion,
  };
}

const getPathKey = (path) => {
  // duplicate what is in config, react can't access docusarus config from here
  // this must match docusaurus.config.js
  const i18n = { locales: ['en', 'zh', 'ko'], defaultLocale: 'en' }
  const pathParts = path.split('/');
  // look at first directory in URL
  // simple check for locales matching config entry 'en' 'zh' 'ko'
  const localeFromUrl = i18n.locales.find(locale => locale === pathParts[1])
  if (localeFromUrl) {
    return {
      localKey: pathParts[1],
      pluginId: pathParts[2],
      version: pathParts[3],
    }
  }
  // undefined localeFromURL
  // get default from config
  return {
    localKey: i18n.defaultLocale,
    pluginId: pathParts[1],
    version: pathParts[2],
  }
}

const LINK_CLASS_NAME = 'table-of-contents__link toc-highlight';
const LINK_ACTIVE_CLASS_NAME = 'table-of-contents__link--active';

export default function TOC({className, ...props}) {
  const [options, setOptions] = useState([]);
  const [currentVersion, setCurrentVersion] = useState({});
  const { allDocsData } = useDocsSearchVersionsHelpers();
  const doc = useDoc();
  const location = useLocation();
  const history = useHistory();
  const {pathname} = location;

  const { tags } = doc.metadata;
  const suggestLink = tags.length > 0 ? tags[0].label : null;
  const suggestBody = encodeURIComponent(`
  <ENTER DESCRIPTION HERE>

  File: [${suggestLink}](https://github.com/${suggestLink})
  `);

  useEffect(() => {
    Object.keys(allDocsData).forEach((key) => {
      const { localKey, pluginId } = getPathKey(pathname);
      const currentDoc = allDocsData[pluginId === 'docs' ? 'default' : pluginId.toLowerCase()];
      const { versions } = currentDoc;

      if (versions) {
        const versionOptions = versions.map((version) => ({
          value: version.name,
          label: version.label,
          path: version.path,
        }));
        setOptions(versionOptions);

        const currentOption = versionOptions.find((option) => pathname.includes(option.path));

        setCurrentVersion(currentOption);
      }
    });
  }, [allDocsData, pathname]);

  const handleOnChange = (selectedOption) => {
    const { path } = selectedOption;
    const { localKey, pluginId, version } = getPathKey(pathname);
    let newPath = undefined;
    if (localKey === 'en') {
      newPath = pathname.replace(`/${pluginId}/${version}`, path);
    } else {
      newPath = pathname.replace(`/${localKey}/${pluginId}/${version}`, path);
    }

    history.push(newPath);
  }

  return (
    <div className={clsx(styles.tableOfContents, 'thin-scrollbar', className)}>
      <Select
        options={options}
        value={currentVersion}
        className={styles.select}
        onChange={handleOnChange}
        isSearchable={false}
        styles={{
          control: (provided, state) => ({
            ...provided,
            background: '#F4F5F6',
            borderRadius: '6px',
            height: '60px',
            width: '310px',
            margin: 'auto',
            outline: 'none',
            padding: '10px 24px'
          }),
          indicatorSeparator: (provided, state) => ({
            ...provided,
            display: 'none'
          }),
          dropdownIndicator: (provided, state) => ({
            ...provided,
            color: '#000000',
            padding: '0px 10px'
          }),
          menu: (provided, state) => ({
            ...provided,
            background: '#F4F5F6',
            borderRadius: '6px',
            width: '310px',
            margin: 'auto',
            outline: 'none',
          }),
          menuList: (provided, state) => ({
            ...provided,
            padding: '0px'
          }),
        }}
        />
      <div className={clsx(styles.linkContainer, props.toc.length && styles.linkContainerWithTOC)}>
        {tags.length > 0 && <a className={styles.link} href={`https://github.com/${suggestLink}`} target="_blank">Suggest Edits</a>}
        <a className={styles.link} href={`https://github.com/eosnetworkfoundation/docs/issues/new?body=${suggestBody}&title=${suggestTitle}`} target="_blank">Request Changes</a>
      </div>
      <TOCItems
        {...props}
        linkClassName={LINK_CLASS_NAME}
        linkActiveClassName={LINK_ACTIVE_CLASS_NAME}
      />
    </div>
  );
}
