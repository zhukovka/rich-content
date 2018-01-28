import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import getImageSrc from './get-image-source';
import Styles from './default-image-styles.scss';
import ImageLoader from '~/Common/image-loader';

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
    return !!config.showTitle && <div className={classNames(Styles.imageTitle, theme.imageTitle)}>{(data && data.title) || ''}</div>;
  }
  renderDescription(data, theme) {
    const config = data.config || {};
    return !!config.showDescription &&
      <div className={classNames(Styles.imageDescription, theme.imageDescription)}>{(data && data.description) || ''}</div>;
  }

  render() {
    const { componentData, className, onClick, theme } = this.props;
    const data = componentData || getDefault();

    const itemClassName = classNames(Styles.imageContainer, className, theme.imageContainer);
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
