import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { VideoUploadModal } from '../wix-draft-plugin-video/toolbar/videoUploadModal';

export class VideoReplaceButton extends Component {
  constructor() {
    super();

    this.state = {
      isVideoUploadModalOpen: false,
      isValidUrl: true,
    };
  }

  handleVideoReplace = url => {
    this.closeVideoUploadModal();
    this.props.pubsub.update('componentData', { src: url });
  };

  openVideoUploadModal = () => {
    const { src } = this.props.pubsub.get('componentData');
    this.setState({ isVideoUploadModalOpen: true, src });
  };

  closeVideoUploadModal = () => {
    this.setState({ isVideoUploadModalOpen: false });
  };

  render() {
    const { icon, className } = this.props;
    return (
      <div className={className}>
        <button type="button" onClick={this.openVideoUploadModal}>
          {icon}
        </button>
        <VideoUploadModal
          isOpen={this.state.isVideoUploadModalOpen}
          onConfirm={this.handleVideoReplace}
          onCancel={this.closeVideoUploadModal}
          url={this.state.src}
          doneLabel={'Replace'}
        />
      </div>
    );
  }
}

VideoReplaceButton.propTypes = {
  className: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  pubsub: PropTypes.object.isRequired,
};
