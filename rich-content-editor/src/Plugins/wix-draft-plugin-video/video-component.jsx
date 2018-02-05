import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Styles from './default-video-styles.scss';

import Themable from '~/Components/Themable';

const DEFAULTS = {
  src: 'https://www.youtube.com/watch?v=YIywpvHewc0',
  config: {
    size: 'content',
    alignment: 'center'
  },
};

const MAX_WAIT_TIME = 5000;

class VideoComponent extends Themable {
  constructor(props) {
    super(props);
    const isPlayable = !props.blockProps || props.blockProps.readOnly === true;
    this.state = {
      isLoading: false,
      isLoaded: false,
      isPlayable,
    };
  }

  setPlayer = player => {
    this.player = player;
  };

  handlePlay = event => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ isLoading: true });
    setTimeout(() => this.handleReady(), MAX_WAIT_TIME);
  };

  handleVideoStart = player => {
    if (this.player !== player) {
      this.setState({
        isLoading: false,
        isLoaded: false,
      });
    }
  };

  handleReady = () => {
    if (!this.state.isLoaded) {
      this.setState({ isLoaded: true });
    }
  };

  renderOverlay = styles => {
    const { isLoaded } = this.state;
    return (
      <div className={classNames(styles.videoOverlay)}>
        {isLoaded && <span>To play this video, view this post from your live site</span>}
      </div>);
  };

  renderPlayer = styles => {
    const { componentData } = this.props;
    return (
      <ReactPlayer
        ref={this.setPlayer}
        className={classNames(styles.player)}
        width="100%"
        height="100%"
        url={componentData.src}
        onReady={this.handleReady}
        onStart={this.handleStart}
        controls
      />
    );
  };

  getDefaultStyles() {
    return Styles;
  }

  getTheme() {
    return this.props.theme;
  }

  renderDesktop(styles) {
    const { className, onClick } = this.props;
    const { isPlayable } = this.state;
    const containerClassNames = classNames(styles.videoContainer, className || '');
    return (
      <div onClick={onClick} className={containerClassNames}>
        {!isPlayable && this.renderOverlay(styles)}
        {this.renderPlayer(styles)}
      </div>
    );
  }
}

VideoComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  componentState: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  blockProps: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
};

export { VideoComponent as Component, DEFAULTS };
