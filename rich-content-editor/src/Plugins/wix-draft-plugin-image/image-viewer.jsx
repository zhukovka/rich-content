import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { mergeStyles } from '~/Utils';
import getImageSrc from './get-image-source';
import styles from './default-image-styles.scss';
import ImageLoader from '~/Components/ImageLoader';

const getDefault = () => ({
  data: {},
  config: {
    alignment: 'center',
    size: 'content',
    showTitle: true,
    showDescription: true,
  },
});

class ImageViewer extends React.Component {

  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

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

  renderImage(imageClassName, imageSrc, alt) {
    return (
      alt ?
        <img className={imageClassName} src={imageSrc} alt={alt} /> :
        <img className={imageClassName} src={imageSrc} />
    );
  }

  renderLoader() {
    if (!this.props.isLoading) {
      return null;
    }
    return <div className={this.styles.imageOverlay}><ImageLoader type={'medium'} theme={this.props.theme}/></div>;
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

  renderCaption(caption, isFocused, styles) {
    return (
      caption ?
        <div className={styles.imageCaption}>{caption}</div> :
        isFocused && <div className={styles.imageCaption}>Enter image caption (optional)</div>
    );
  }

  render() {
    const { styles } = this;
    const { componentData, className, onClick, isFocused } = this.props;
    const data = componentData || getDefault();
    const { item = {} } = componentData;
    const { metadata = {} } = item;

    const itemClassName = classNames(styles.imageContainer, className);
    const imageClassName = classNames(styles.image);
    const imageSrc = this.getImageSrc(data.item);
    return (
      <div onClick={onClick} className={itemClassName}>
        <div>
          {this.renderImage(imageClassName, imageSrc, metadata.alt)}
          {this.renderLoader()}
        </div>
        {this.renderTitle(data, styles)}
        {this.renderDescription(data, styles)}
        {this.renderCaption(metadata.caption, isFocused, styles)}
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
  dataUrl: PropTypes.string,
  isFocused: PropTypes.bool,
};

export { ImageViewer, getDefault };
