import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import YoutubeViewer from './youtube-viewer';
import styles from '../../statics/styles/youtube-component.scss';
import classNames from 'classnames';

class YoutubeComponent extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  renderOverlay = (styles, t) => {
    const overlayText = t('VideoComponent_Overlay');
    return (
      <div className={styles.video_overlay}>
        <span className={styles.video_overlay_message}>{overlayText}</span>
      </div>
    );
  };

  renderPlayer = (componentData, settings, theme) => {
    return <YoutubeViewer componentData={componentData} settings={settings} theme={theme} />;
  };

  render() {
    const { className, t, componentData, settings, theme } = this.props;
    const containerClassNames = classNames(this.styles.video_container, className || '');
    return (
      <div data-hook="videoPlayer" className={containerClassNames}>
        {this.renderOverlay(styles, t)}
        {this.renderPlayer(componentData, settings, theme)}
      </div>
    );
  }
}

YoutubeComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  settings: PropTypes.object,
  className: PropTypes.string,
  t: PropTypes.func,
};

export { YoutubeComponent as Component };
