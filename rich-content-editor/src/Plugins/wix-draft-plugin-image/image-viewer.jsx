import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import get from 'lodash/get';
import getImageSrc from './get-image-source';
import Styles from './default-image-styles.scss';

const getDefault = () => ({
  data: {},
  config: {
    alignment: 'center',
    size: 'content',
    showTitle: true,
    showDescription: true,
  },
});

const ImageLoader = (
  { theme, type } //eslint-disable-line react/prop-types
) => (
  <div className={classNames(Styles.loaderOverlay, get(theme, 'loaderOverlay'))}>
    <div className={classNames(Styles.loader, get(theme, 'loader'), { [Styles[type]]: type })} />
  </div>
);

ImageLoader.propTypes = {
  theme: PropTypes.object.isRequired,
  type: PropTypes.string,
};

ImageLoader.defaultProps = {
  type: 'mini'
};


class ImageViewer extends React.Component {

  getImageSrc(item) {
    const { helpers } = this.props;
    let imageUrl;
    if (this.props.dataUrl) {
      imageUrl = this.props.dataUrl;
    } else {
      imageUrl = getImageSrc(item, helpers);
    }

    if (!imageUrl) {
      console.error(`image plugin mounted with invalid image source!`, item); //eslint-disable-line no-console
    }

    return imageUrl;
  }

  renderLoader() {
    if (!this.props.isLoading) {
      return null;
    }
    return <ImageLoader />;
  }

  renderTitle(data, theme) {
    const config = data.config || {};
    return !!config.showTitle && <div className={theme.title}>{(data && data.title) || ''}</div>;
  }
  renderDescription(data, theme) {
    const config = data.config || {};
    return !!config.showDescription && <div className={theme.description}>{(data && data.description) || ''}</div>;
  }

  render() {
    const { componentData, className, onClick, theme } = this.props;
    const data = componentData || getDefault();

    const itemClassName = classNames(Styles.container, className, theme.container);
    const imageClassName = classNames(Styles.image, theme.image);
    const imageSrc = this.getImageSrc(data.item);
    return (
      <div onClick={onClick} className={itemClassName}>
        <div>
          <img className={imageClassName} src={imageSrc} />
          {this.renderLoader()}
        </div>
        {this.renderTitle(data, theme)}
        {this.renderDescription(data, theme)}
      </div>
    );
  }
}

ImageViewer.propTypes = {
  componentData: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  helpers: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  dataUrl: PropTypes.string
};

export { ImageViewer, getDefault };
