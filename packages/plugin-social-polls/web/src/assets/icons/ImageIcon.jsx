/* eslint-disable max-len */
import React from 'react';

export const ImageIcon = props => (
  <svg width="40" height="40" viewBox="0 0 40 40" {...props}>
    <g fill="none" fillRule="evenodd">
      <rect fill="#fff" width="40" height="40" x="0" y="0" rx="1" />
      <rect width="39" height="39" x=".5" y=".5" stroke="#333" rx="1" />
      <path fill="#333" d="M14 17.725L40 46.275 -12 46.275z" mask="url(#prefix__b)" />
      <path fill="#333" d="M31.5 23L41.786 34.605 51 45 12 45z" mask="url(#prefix__b)" />
      <path
        stroke="#333"
        d="M13.98 17.977c-.129.006-.254.06-.348.161L-7.861 41.5h55.759l-16.09-18.375c-.1-.079-.222-.113-.341-.105-.128.008-.252.065-.343.17l-5.903 6.744L13.98 17.977z"
        mask="url(#prefix__b)"
      />
      <path
        stroke="#333"
        strokeLinecap="round"
        d="M33 11c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4z"
        mask="url(#prefix__b)"
      />
      <circle cx="29" cy="11" r="4" fill="#333" mask="url(#prefix__b)" />
    </g>
  </svg>
);
