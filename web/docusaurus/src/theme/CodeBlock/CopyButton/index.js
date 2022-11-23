import React, { useCallback, useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
// @ts-expect-error: TODO, we need to make theme-classic have type: module
import copy from 'copy-text-to-clipboard';
import { translate } from '@docusaurus/Translate';
import styles from './styles.module.css';
import BrowserOnly from '@docusaurus/BrowserOnly';
export default function CopyButton({ code, className, title }) {
  const [isCopied, setIsCopied] = useState(false);
  const copyTimeout = useRef(undefined);
  const handleCopyCode = useCallback(() => {
    copy(code);
    setIsCopied(true);
    copyTimeout.current = window.setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  }, [code]);
  useEffect(() => () => window.clearTimeout(copyTimeout.current), []);
  return (
    <BrowserOnly>
      {() => (
        <button
        type="button"
        aria-label={
          isCopied
            ? translate({
              id: 'theme.CodeBlock.copied',
              message: 'Copied',
              description: 'The copied button label on code blocks',
            })
            : translate({
              id: 'theme.CodeBlock.copyButtonAriaLabel',
              message: 'Copy code to clipboard',
              description: 'The ARIA label for copy code blocks button',
            })
        }
        title={translate({
          id: 'theme.CodeBlock.copy',
          message: 'Copy',
          description: 'The copy button label on code blocks',
        })}
        className={clsx(
          'clean-btn',
          className,
          styles.copyButton,
          isCopied && styles.copyButtonCopied,
        )}
        onClick={handleCopyCode}>
        <span className={styles.copyButtonIcons} aria-hidden="true">
          <svg className={styles.copyButtonIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="transparent" d="M20 9H11C9.89543 9 9 9.89543 9 11V20C9 21.1046 9.89543 22 11 22H20C21.1046 22 22 21.1046 22 20V11C22 9.89543 21.1046 9 20 9Z" stroke="#666666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path fill="transparent" d="M5 15H4C3.46957 15 2.96086 14.7893 2.58579 14.4142C2.21071 14.0391 2 13.5304 2 13V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H13C13.5304 2 14.0391 2.21071 14.4142 2.58579C14.7893 2.96086 15 3.46957 15 4V5" stroke="#666666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <svg className={title ? styles.copyButtonSuccessIconWithTitle : styles.copyButtonSuccessIcon} viewBox="0 0 24 24">
            <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
          </svg>
        </span>
      </button>
      )}
    </BrowserOnly>
  );
}
