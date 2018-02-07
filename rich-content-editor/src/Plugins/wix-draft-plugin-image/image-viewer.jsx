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

  renderLoader() {
    if (!this.props.isLoading) {
      return null;
    }
    return <div className={this.styles.imageComponent_overlay}><ImageLoader type={'medium'} theme={this.props.theme}/></div>;
  }

  renderTitle(data, styles) {
    const config = data.config || {};
    return !!config.showTitle && <div className={classNames(styles.imageComponent_title)}>{(data && data.title) || ''}</div>;
  }
  renderDescription(data, styles) {
    const config = data.config || {};
    return !!config.showDescription &&
      <div className={classNames(styles.imageComponent_description)}>{(data && data.description) || ''}</div>;
  }

  render() {
    const { styles } = this;
    const { componentData, className, onClick } = this.props;
    const data = componentData || getDefault();

    const itemClassName = classNames(styles.imageComponent_container, className);
    const imageClassName = classNames(styles.imageComponent_image);
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
