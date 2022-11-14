import React from 'react';
export default function IconMenu({
  width = 30,
  height = 30,
  className,
  ...restProps
}) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 30 30"
      aria-hidden="true"
      {...restProps}>
      <path d="M4 10H26" stroke="black" strokeLinecap="round"/>
      <path d="M4 16H26" stroke="black" strokeLinecap="round"/>
      <path d="M4 22H26" stroke="black" strokeLinecap="round"/>
    </svg>
    
  );
}
