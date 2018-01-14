import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Modal from 'react-modal';
import { isVideoUrl } from './videoUrlValidators';
import s from '~/Styles/video-upload-modal.scss';
import CameraIcon from './icons/video-camera.svg';
import ErrorIcon from './icons/error.svg';
import classNames from 'classnames';
import Tooltip from 'wix-style-react/dist/src/Tooltip';

export class VideoUploadModal extends Component {
  constructor() {
    super();

    this.state = {
      isVideoUploadModalOpen: false,
      isValidUrl: true,
    };
  }

  onUrlChange = e => {
    const url = e.target.value;
    this.setState({ videoUrl: url, isValidUrl: isVideoUrl(url) });
  };

  afterOpenModal = () => this.input.focus();

  onConfirm = () => {
    if (this.state.isValidUrl) {
      this.props.onConfirm(this.state.videoUrl);
    }
  };

  render() {
    const { onCancel, isOpen } = this.props;
    return (
      <Modal
        isOpen={isOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={onCancel}
        shouldCloseOnOverlayClick
        shouldFocusAfterRender
        contentLabel="Example Modal"
        parentSelector={() => document.querySelector('.DraftEditor-root')}
        className={s.modal}
        overlayClassName={s.overlay}
      >
        <div className={s.header}>
          <CameraIcon />Add a video from YouTube or Vimeo
        </div>
        <div className={s.textInput}>
          <input
            ref={ref => (this.input = ref)}
            className={classNames({ [s.invalid]: !this.state.isValidUrl })}
            placeholder="e.g. https://youtu.be/6sx-xGiFIjk"
            onChange={this.onUrlChange}
            value={this.state.videoUrl}
          />
          {this.state.isValidUrl ? null : (
            <Tooltip content={'Invalid URL'} textAlign="center" maxWidth="" shouldCloseOnClickOutside theme="dark">
              <ErrorIcon className={s.errorIcon} />
            </Tooltip>
          )}
        </div>
        <div className={s.btns}>
          <button className={s.btnCancel} onClick={onCancel}>
            Cancel
          </button>
          <button className={s.btnConfirm} onClick={this.onConfirm}>
            Add Now
          </button>
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
