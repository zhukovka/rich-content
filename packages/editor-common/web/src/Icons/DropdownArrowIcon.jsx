/* eslint-disable max-len */
import React from 'react';

const DropdownArrowIcon = props => (
  <svg width={19} height={19} viewBox="0 0 19 19" fill="currentColor" {...props}>
    <defs>
      <path
        d="M11.496 9.7l-5.43 5.176a.208.208 0 0 0 0 .304l.48.457a.234.234 0 0 0 .319 0l6.069-5.785a.21.21 0 0 0 0-.304l-6.07-5.785a.234.234 0 0 0-.319 0l-.479.457a.208.208 0 0 0 0 .304l5.43 5.176z"
        id="pathArrow"
      />
    </defs>
    <g fillRule="evenodd">
      <g>
        <mask>
          <use xlinkHref="#pathArrow" />
        </mask>
        <use fillRule="nonzero" transform="rotate(90 9.5 9.7)" xlinkHref="#pathArrow" />
      </g>
    </g>
  </svg>
);

export default DropdownArrowIcon;
