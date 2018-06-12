import React from 'react';
import PropTypes from 'prop-types';
import { getUrlMatches, normalizeUrl } from 'wix-rich-content-common';

export const LinkStrategy = (contentBlock, callback) => {
  const text = contentBlock.getText();
  if (!text) {
    return [];
  }

  const linkMatches = getUrlMatches(text);
  if (!linkMatches || linkMatches.length === 0) {
    return [];
  }

  linkMatches.forEach(({ index, lastIndex }) => {
    callback(index, lastIndex);
  });
};

export const LinkComponent = ({ children, decoratedText }) =>
  <a rel="noopener noreferrer" target="_blank" href={normalizeUrl(decoratedText)}>{children}</a>;

LinkComponent.propTypes = {
  children: PropTypes.node,
  decoratedText: PropTypes.string,
};
