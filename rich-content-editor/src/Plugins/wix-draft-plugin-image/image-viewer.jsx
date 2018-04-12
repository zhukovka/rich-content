import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import includes from 'lodash/includes';
import get from 'lodash/get';
import { mergeStyles } from '~/Utils';
import getImageSrc from './get-image-source';
import styles from './default-image-styles.scss';
import ImageLoader from '~/Components/ImageLoader';

const getDefault = () => ({
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
    this.state = {};
  }

  getImageSrc(src) {
    const { helpers } = this.props;

    if (!src && (helpers && helpers.handleFileSelection)) {
      return null;
    }

    const imageUrl = {
      preload: '',
      highres: ''
    };

    if (this.props.dataUrl) {
      imageUrl.preload = imageUrl.highres = this.props.dataUrl;
    } else {
      let options = {};
      //do not render webp on preload - the SSR never renders webp and the same format should be kept
      imageUrl.preload = getImageSrc(src, helpers, { allowWebp: false });
      if (this.state.container) {
        const { width } = this.state.container.getBoundingClientRect();
        const requiredWidth = width || src.width || 1;
        //keep the image's original ratio
        const requiredHeight = (src.height && src.width) ? Math.ceil((src.height / src.width) * requiredWidth) : 2048;
        const requiredQuality = 90;
        options = { requiredWidth, requiredHeight, requiredQuality };
        imageUrl.highres = getImageSrc(src, helpers, options);
      }
    }

    if (!imageUrl.preload) {
      console.error(`image plugin mounted with invalid image source!`, src); //eslint-disable-line no-console
    }

    return imageUrl;
  }

  renderImage(imageClassName, imageSrc, alt) {
    return [
      <img key="preload" className={classNames(imageClassName, this.styles.imagePreload)} src={imageSrc.preload} alt={alt} />,
      <img
        key="highres" className={classNames(imageClassName, this.styles.imageHighres)} src={imageSrc.highres} alt={alt}
        onLoad={e => e.target.style.opacity = 1}
      />
    ];
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

  renderCaption(caption, isFocused, readOnly, styles, t) {
    const defaultCaption = t('ImageViewer_Caption');

    return (
      caption ?
        <div className={styles.imageCaption}>{caption}</div> :
        (!readOnly && isFocused) && <div className={styles.imageCaption}>{defaultCaption}</div>
    );
  }

  render() {
    const { styles } = this;
    const { componentData, className, onClick, isFocused, readOnly, settings, t } = this.props;
    const data = componentData || getDefault();
    const { metadata = {} } = componentData;
    const shouldRenderCaption = !includes(get(settings, 'toolbar.hidden'), 'settings');

    const itemClassName = classNames(styles.imageContainer, className);
    const imageClassName = classNames(styles.image);
    const imageSrc = this.getImageSrc(data.src);
    return (
      <div
        data-hook="imageViewer" onClick={onClick} className={itemClassName} ref={ele => {
          if (!this.state.container) {
            this.setState({ container: ele }); //saving the container on the state to trigger a new render
          }
        }}
      >
        <div className={styles.imageWrapper}>
          {this.renderImage(imageClassName, imageSrc, metadata.alt)}
          {this.renderLoader()}
        </div>
        {this.renderTitle(data, styles)}
        {this.renderDescription(data, styles)}
        {shouldRenderCaption && this.renderCaption(metadata.caption, isFocused, readOnly, styles, t)}
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
  readOnly: PropTypes.bool,
  settings: PropTypes.object,
  t: PropTypes.func,
};

export { ImageViewer, getDefault };
