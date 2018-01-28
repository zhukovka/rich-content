import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import get from 'lodash/get';
import LoaderStyles from '~/Styles/loaders.scss';

const ImageLoader = ({ theme, type, overlayClassName, loaderClassName }) => (
  <div className={classNames(overlayClassName, get(theme, 'loaderOverlay'))}>
    <div className={classNames(loaderClassName, get(theme, 'loader'), { [LoaderStyles[type]]: type })} />
  </div>
);

ImageLoader.propTypes = {
  theme: PropTypes.object.isRequired,
  type: PropTypes.string,
  overlayClassName: PropTypes.string,
  loaderClassName: PropTypes.string
};

ImageLoader.defaultProps = {
  type: 'mini',
  overlayClassName: LoaderStyles.loaderOverlay,
  loaderClassName: LoaderStyles.loader
};

export default ImageLoader;
