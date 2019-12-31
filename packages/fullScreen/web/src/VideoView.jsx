import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';

export default class VideoView extends Component {
  constructor(props) {
    super(props);
    this.state = { isPlaying: false };
  }

  static getDerivedStateFromProps(props) {
    if (props.disabled) {
      return { isPlaying: false };
    }
    return null;
  }

  render() {
    const { styles } = this.props;
    const height = (window.screen.height * 9) / 16;
    return (
      <ReactPlayer
        playing={this.state.isPlaying}
        onPlay={() => this.setState({ isPlaying: true })}
        onPause={() => this.setState({ isPlaying: false })}
        style={styles}
        height={height}
        width={'80%'}
        {...this.props}
      />
    );
  }
}

VideoView.propTypes = {
  styles: PropTypes.object,
  disabled: PropTypes.bool,
};
