import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Modal from 'react-modal';
import { isVideoUrl } from './videoUrlValidators';
import s from '~/Styles/video-upload-modal.scss';
import CameraIcon from './icons/video-camera.svg';
import CloseIcon from './icons/x-icon.svg';
import ErrorIcon from './icons/error.svg';
import classNames from 'classnames';
import Tooltip from 'wix-style-react/dist/src/Tooltip';

export class VideoUploadModal extends Component {
  constructor() {
    super();

    this.state = {
      isValidUrl: true,
    };
  }

  onUrlChange = e => {
    const url = e.target.value;
    this.setState({ videoUrl: url, isValidUrl: true });
  };

  afterOpenModal = () => this.input.focus();

  onConfirm = e => {
    e.stopPropagation();
    const { videoUrl } = this.state;
    if (isVideoUrl(videoUrl)) {
      this.props.onConfirm(videoUrl);
    } else {
      this.setState({ isValidUrl: false });
    }
  };

  onCancel = e => {
    e.stopPropagation();
    this.props.onCancel();
  }

  handleKeyPress = e => {
    if (e.charCode === 13) {
      this.onConfirm();
    }
  };

  render() {
    const { isOpen } = this.props;
    return (
      <Modal
        ariaHideApp={false}
        isOpen={isOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.onCancel}
        shouldCloseOnOverlayClick
        shouldFocusAfterRender
        contentLabel="Video Upload"
        parentSelector={() => document.querySelector('.DraftEditor-root')}
        className={s.modal}
        overlayClassName={s.overlay}
      >
        <div onKeyPress={this.handleKeyPress}>
          <CloseIcon className={s.closeIcon} onClick={this.onCancel} />
          <div className={s.header}>
            <CameraIcon className={s.cameraIcon} />Add a video from YouTube or Vimeo
          </div>
          <div className={s.textInput}>
            <input
              ref={ref => (this.input = ref)}
              className={classNames({ [s.invalid]: !this.state.isValidUrl })}
              placeholder="e.g. https://youtu.be/6sx-xGiFIjk"
              onChange={this.onUrlChange}
              value={this.state.videoUrl}
              onDoubleClick={() =>
                this.setState({
                  videoUrl: 'https://www.youtube.com/watch?v=_OBlgSz8sSM',
                })
              }
            />
            {this.state.isValidUrl ? null : (
              <Tooltip
                content={'Invalid URL'}
                textAlign="center"
                maxWidth=""
                shouldCloseOnClickOutside
                theme="dark"
              >
                <ErrorIcon className={s.errorIcon} />
              </Tooltip>
            )}
          </div>
          <div className={s.btns}>
            <button className={s.btnCancel} onClick={this.onCancel}>
              Cancel
            </button>
            <button className={s.btnConfirm} onClick={this.onConfirm}>
              Add Now
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

VideoUploadModal.propTypes = {
  onCancel: PropTypes.any.isRequired,
  onConfirm: PropTypes.any.isRequired,
  isOpen: PropTypes.any.isRequired,
};
