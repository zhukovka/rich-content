import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Modal from 'react-modal';
import { isVideoUrl } from '~/Utils/urlValidators';
import Styles from '~/Styles/video-upload-modal.scss';
import CameraIcon from './icons/video-camera.svg';
import CloseIcon from './icons/x-icon.svg';
import ErrorIcon from './icons/error.svg';
import classNames from 'classnames';
import Tooltip from '~/Components/Tooltip';

export class VideoUploadModal extends Component {
  constructor() {
    super();

    this.state = {
      isValidUrl: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen && !this.props.isOpen) {
      this.onOpen(nextProps);
    }
  }

  onOpen = props => {
    this.setState({ url: props.url, isValidUrl: true });
  }

  onUrlChange = e => {
    const url = e.target.value;
    this.setState({ url, isValidUrl: true });
  };

  afterOpenModal = () => this.input.focus();

  onConfirm = e => {
    e.stopPropagation();
    const { url } = this.state;
    if (isVideoUrl(url)) {
      this.props.onConfirm(url);
    } else {
      this.setState({ isValidUrl: false });
    }
  };

  onCancel = e => {
    e.stopPropagation();
    this.props.onCancel();
  };

  handleKeyPress = e => {
    if (e.charCode === 13) {
      this.onConfirm();
    }
  };

  render() {
    const { isOpen, url } = this.props;
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
        className={Styles.modal}
        overlayClassName={Styles.overlay}
      >
        <div onKeyPress={this.handleKeyPress}>
          <CloseIcon className={Styles.closeIcon} onClick={this.onCancel} />
          <div className={classNames(Styles.header)}>
            <CameraIcon className={Styles.cameraIcon} />
            <h3>Add a video from YouTube or Vimeo</h3>
          </div>
          <div className={Styles.textInput}>
            <input
              ref={ref => (this.input = ref)}
              className={classNames({ [Styles.invalid]: !this.state.isValidUrl })}
              placeholder="e.g. https://youtu.be/6sx-xGiFIjk"
              onChange={this.onUrlChange}
              value={this.state.url || url}
              onDoubleClick={() =>
                this.setState({
                  url: 'https://www.youtube.com/watch?v=_OBlgSz8sSM',
                })
              }
            />
            {this.state.isValidUrl ? null : (
              <Tooltip
                content={'Invalid URL'}
                textAlign="center"
                maxWidth=""
                moveBy={{ x: -23, y: -5 }}
                shouldCloseOnClickOutside
                theme="dark"
              >
                <ErrorIcon className={Styles.errorIcon} />
              </Tooltip>
            )}
          </div>
          <div className={Styles.btns}>
            <button className={Styles.btnCancel} onClick={this.onCancel}>
              Cancel
            </button>
            <button className={Styles.btnConfirm} onClick={this.onConfirm}>
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
  url: PropTypes.string,
};
