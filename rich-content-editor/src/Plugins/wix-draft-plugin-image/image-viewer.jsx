import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import getImageSrc from './get-image-source';
import Styles from './default-image-styles.scss';
import ImageLoader from '~/Components/ImageLoader';
import Themable from '~/Components/Themable';

const getDefault = () => ({
  data: {},
  config: {
    alignment: 'center',
    size: 'content',
    showTitle: true,
    showDescription: true,
  },
});

class ImageViewer extends Themable {

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
    return <div className={Styles.overlay}><ImageLoader type={'medium'}/></div>;
  }

  renderTitle(data, styles) {
    const config = data.config || {};
    return !!config.showTitle && <div className={classNames(styles.imageTitle)}>{(data && data.title) || ''}</div>;
  }
  renderDescription(data, styles) {
    const config = data.config || {};
    return !!config.showDescription &&
      <div className={classNames(styles.imageDescription)}>{(data && data.description) || ''}</div>;
  }

  getDefaultStyles() {
    return Styles;
  }

  getTheme() {
    return this.props.theme;
  }

  renderDesktop(styles) {
    const { componentData, className, onClick } = this.props;
    const data = componentData || getDefault();

    const itemClassName = classNames(styles.imageContainer, className);
    const imageClassName = classNames(styles.image);
    const imageSrc = this.getImageSrc(data.item);
    return (
      <div onClick={onClick} className={itemClassName}>
        <div>
          <img className={imageClassName} src={imageSrc} />
          {this.renderLoader()}
        </div>
        {this.renderTitle(data, styles)}
        {this.renderDescription(data, styles)}
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
