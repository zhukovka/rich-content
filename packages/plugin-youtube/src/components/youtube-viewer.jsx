import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/youtube-viewer.scss';
import classNames from 'classnames';
class YoutubeViewer extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  render() {
    const {
      componentData: { youtube },
      ...rest
    } = this.props;
    return (
      <ReactPlayer className={classNames(this.styles.video_player)} url={youtube.url} {...rest} />
    );
  }
}

YoutubeViewer.propTypes = {
  theme: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
};

YoutubeViewer.defaultProps = {
  width: '100%',
  height: '100%',
  controls: true,
};

export default YoutubeViewer;
