import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Styles from './default-video-styles.scss';

const DEFAULTS = {
  src: 'https://www.youtube.com/watch?v=YIywpvHewc0',
  config: {
    size: 'content'
  }
};

const MAX_WAIT_TIME = 5000;

class VideoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isLoaded: false,
      isPlayable: props.blockProps.readOnly === true
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

  renderOverlay = () => {
    const { isLoaded } = this.state;
    return (
      <div className={Styles.overlay}>
        {isLoaded &&
        <span>To play this video, view this post from your live site</span>
        }
      </div>
    );
  }

  renderPlayer = () => {
    const { componentData } = this.props;
    return (
      <ReactPlayer
        ref={this.setPlayer}
        className={Styles.player}
        width="100%"
        height="100%"
        url={componentData.src}
        onReady={this.handleReady}
        onStart={this.handleStart}
        controls
      />
    );
  }

  render() {
    const {
      className,
      onClick,
    } = this.props;
    const { isPlayable } = this.state;
    const containerClassNames = classNames(Styles.container, className || '');
    return (
      <div onClick={onClick} className={containerClassNames}>
        {!isPlayable && this.renderOverlay()}
        {this.renderPlayer()}
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

export {
  VideoComponent as Component,
  DEFAULTS
};
