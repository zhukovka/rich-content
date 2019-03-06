import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles } from '../Utils/mergeStyles';
import Context from '../Utils/Context';
import styles from '../../statics/styles/loaders.scss';

class ImageLoader extends React.Component {
  render() {
    this.styles = this.styles || mergeStyles({ styles, theme: this.context.theme });
    return (
      <div
        className={classNames(this.props.overlayClassName, this.styles.loaderOverlay)}
        data-hook="imageLoader"
      >
        <div
          className={classNames(this.props.loaderClassName, this.styles.loader, {
            [this.styles[this.props.type]]: this.props.type,
          })}
        />
      </div>
    );
  }
}

ImageLoader.contextType = Context.type;

ImageLoader.propTypes = {
  type: PropTypes.string,
  overlayClassName: PropTypes.string,
  loaderClassName: PropTypes.string,
};

ImageLoader.defaultProps = {
  type: 'mini',
  overlayClassName: '',
  loaderClassName: '',
};

export default ImageLoader;
