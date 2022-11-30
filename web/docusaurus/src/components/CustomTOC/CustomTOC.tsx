import React, { useEffect, useState } from 'react';
import Select from 'react-select'
import clsx from 'clsx';
import { useAllDocsData } from '@docusaurus/plugin-content-docs/client';
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
  const pathParts = path.split('/');
  return {
    pluginId: pathParts[1],
    version: pathParts[2],
  }
}

const LINK_CLASS_NAME = 'table-of-contents__link toc-highlight';
const LINK_ACTIVE_CLASS_NAME = 'table-of-contents__link--active';

export default function CustomTOC({ doc, onClick }) {
  const [options, setOptions] = useState([]);
  const [currentVersion, setCurrentVersion] = useState({});
  const { allDocsData } = useDocsSearchVersionsHelpers();
  const location = useLocation();
  const history = useHistory();
  const {pathname} = location;

  const { tags } = doc.metadata;
  const suggestLink = tags.length > 0 ? tags[0].label : null;

  useEffect(() => {
    Object.keys(allDocsData).forEach((key) => {
      const { pluginId } = getPathKey(pathname);
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
    const { pluginId, version } = getPathKey(pathname);
    const newPath = pathname.replace(`/${pluginId}/${version}`, path);
    
    if (newPath === pathname) {
      return;
    }

    history.push(newPath);
  }

  return (
    <div className={clsx(styles.customTableOfContents)}>
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
            width: '100%',
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
      <div className={clsx(styles.linkContainer, doc.toc.length && styles.linkContainerWithTOC)}>
        {tags.length > 0 && <a className={styles.link} href={`https://github.com/${suggestLink}`} target="_blank">Suggest Edits</a>}
        <a className={styles.link} href={`https://github.com/eosnetworkfoundation/docs/issues/new?body=sometexthere&title=${suggestTitle}`} target="_blank">Request Changes</a>
      </div>
      {doc.toc && doc.toc.length > 0 && (
        <TOCItems
        {...doc}
        onClick={onClick}
        isMobile
        linkClassName={LINK_CLASS_NAME}
        linkActiveClassName={LINK_ACTIVE_CLASS_NAME}
      />
      )}
    </div>
  );
}
