import React from 'react';
import Select from 'react-select'
import clsx from 'clsx';
import TOCItems from '@theme/TOCItems';
import styles from './styles.module.css';
// Using a custom className
// This prevents TOCInline/TOCCollapsible getting highlighted by mistake

const options = [
  { value: '3.1', label: 'v3.1' },
  { value: '2.8', label: 'v2.8' },
  { value: '1.9', label: 'v1.9' }
]

const defaultValue = options[0]

const LINK_CLASS_NAME = 'table-of-contents__link toc-highlight';
const LINK_ACTIVE_CLASS_NAME = 'table-of-contents__link--active';
export default function TOC({className, ...props}) {

  const handleOnChange = (selectedOption) => {
    console.log(`navigating to ${selectedOption.value}`);
  }

  return (
    <div className={clsx(styles.tableOfContents, 'thin-scrollbar', className)}>
      <Select
        options={options}
        defaultValue={defaultValue}
        className={styles.select}
        onChange={handleOnChange}
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
      <div className={styles.linkContainer}>
        <a className={styles.link} href="">Suggest Edits</a>
        <a className={styles.link} href="">Request Changes</a>
      </div>
      <TOCItems
        {...props}
        linkClassName={LINK_CLASS_NAME}
        linkActiveClassName={LINK_ACTIVE_CLASS_NAME}
      />
    </div>
  );
}
