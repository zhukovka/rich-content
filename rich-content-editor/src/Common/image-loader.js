import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import get from 'lodash/get';
import LoaderStyles from '~/Styles/loaders.scss';

const ImageLoader = ({ theme, type }) => (
  <div className={classNames(LoaderStyles.loaderOverlay, get(theme, 'loaderOverlay'))}>
    <div className={classNames(LoaderStyles.loader, get(theme, 'loader'), { [LoaderStyles[type]]: type })} />
  </div>
);

ImageLoader.propTypes = {
  theme: PropTypes.object.isRequired,
  type: PropTypes.string,
  overlayClassName: PropTypes.string,
  loaderClassName: PropTypes.string
};

ImageLoader.defaultProps = {
  type: 'mini'
};

export default ImageLoader;
