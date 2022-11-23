import clsx from 'clsx';
import React from 'react';

import styles from './styles.module.css';

export const H1_Bold = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <h1 className={clsx(className, styles.h1Bold)}>{children}</h1>;
};

export const H1 = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <h1 className={clsx(styles.h1Regular, className)}>{children}</h1>;
};

export const H1_Light = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <h1 className={clsx(className, styles.h1Light)}>{children}</h1>;
};

export const H2_Bold = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <h2 className={clsx(className, styles.h2Bold)}>{children}</h2>;
};

export const H2 = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <h2 className={clsx(className, styles.h2Regular)}>{children}</h2>;
};

export const H2_Light = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <h2 className={clsx(className, styles.h2Light)}>{children}</h2>;
};

export const H3_Bold = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <h3 className={clsx(className, styles.h3Bold)}>{children}</h3>;
};

export const H3 = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <h3 className={clsx(className, styles.h3Regular)}>{children}</h3>;
};

export const H3_Light = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <h3 className={clsx(className, styles.h3Light)}>{children}</h3>;
};

export const H4_Bold = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <h4 className={clsx(className, styles.h4Bold)}>{children}</h4>;
};

export const H4 = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <h4 className={clsx(className, styles.h4Regular)}>{children}</h4>;
};

export const H4_Light = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <h4 className={clsx(className, styles.h4Light)}>{children}</h4>;
};

export const H5_Bold = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <h5 className={clsx(className, styles.h5Bold)}>{children}</h5>;
};

export const H5 = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <h5 className={clsx(className, styles.h5Regular)}>{children}</h5>;
};

export const H5_Light = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <h5 className={clsx(className, styles.h5Light)}>{children}</h5>;
};

export const H6_Bold = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <h6 className={clsx(className, styles.h6Bold)}>{children}</h6>;
};

export const H6 = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <h6 className={clsx(className, styles.h6Regular)}>{children}</h6>;
};

export const H6_Light = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <h6 className={clsx(className, styles.h6Light)}>{children}</h6>;
};

export const P_XS_Bold = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <p className={clsx(className, styles.pXSBold)}>{children}</p>;
};

export const P_XS = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <p className={clsx(className, styles.pXSregular)}>{children}</p>;
};

export const P_XS_Light = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <p className={clsx(className, styles.pXSLight)}>{children}</p>;
};

export const P_Bold = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <p className={clsx(className, styles.pBold)}>{children}</p>;
};

export const P = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <p className={clsx(className, styles.pRegular)}>{children}</p>;
};

export const P_Light = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <p className={clsx(className, styles.pLight)}>{children}</p>;
};

export const P_Small_Bold = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <p className={clsx(className, styles.pSmallBold)}>{children}</p>;
};

export const P_Small = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <p className={clsx(className, styles.pSmallRegular)}>{children}</p>;
};

export const P_Small_Light = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <p className={clsx(className, styles.pSmallLight)}>{children}</p>;
};

export const P_Medium_Bold = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <p className={clsx(className, styles.pMediumBold)}>{children}</p>;
};

export const P_Medium = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <p className={clsx(className, styles.pMediumRegular)}>{children}</p>;
};

export const P_Medium_Light = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <p className={clsx(className, styles.pMediumLight)}>{children}</p>;
};

export const P_Large_Bold = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <p className={clsx(className, styles.pLargeBold)}>{children}</p>;
};

export const P_Large = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <p className={clsx(className, styles.pLargeRegular)}>{children}</p>;
};

export const P_Large_Light = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <p className={clsx(className, styles.pLargeLight)}>{children}</p>;
};

export const P_XLarge_Bold = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <p className={clsx(className, styles.pXLargeBold)}>{children}</p>;
};

export const P_XLarge = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <p className={clsx(styles.pXLargeRegular, className)}>{children}</p>;
};

export const P_XLarge_Light = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <p className={clsx(className, styles.pXLargeLight)}>{children}</p>;
};

