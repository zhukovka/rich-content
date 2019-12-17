import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Context, mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/link-preview.scss';

class LinkPreview extends Component {
  static propTypes = {
    metadata: PropTypes.shape({
      imageUrl: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      url: PropTypes.string,
    }),
  };

  static contextType = Context.type;

  render() {
    this.styles = this.styles || mergeStyles({ styles, theme: this.context.theme });
    return <div className={styles.linkPreview} />;
  }
}

export default LinkPreview;
