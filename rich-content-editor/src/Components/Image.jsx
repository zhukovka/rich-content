import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from '~/Styles/image.scss';
import { mergeStyles } from '~/Utils/mergeStyles';

class Image extends Component {
  static propTypes = {
    resizeMode: PropTypes.oneOf(['contain', 'cover']),
    src: PropTypes.string.isRequired,
    theme: PropTypes.object.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    resizeMode: 'contain'
  };

  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  render() {
    const { src, resizeMode, className } = this.props;
    const imageStyle = {
      backgroundImage: `url(${src})`,
      backgroundSize: resizeMode
    };
    return (
      <div className={classnames(styles.image_container, className)} style={imageStyle}>
        <img src={src} className={styles.image_placeholder}/>
      </div>);
  }
}

export default Image;
