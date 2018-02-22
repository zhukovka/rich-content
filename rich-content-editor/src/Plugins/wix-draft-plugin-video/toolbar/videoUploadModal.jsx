import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Modal from 'react-modal';
import { isVideoUrl } from '~/Utils/urlValidators';
import styles from './video-upload-modal.scss';
import CameraIcon from './icons/video-camera.svg';
import CloseIcon from './icons/x-icon.svg';
import ErrorIcon from './icons/error.svg';
import classNames from 'classnames';
import SettingsPanelFooter from '~/Components/SettingsPanelFooter';
import Tooltip from '~/Components/Tooltip';
import { mergeStyles } from '~/Utils/mergeStyles';

export class VideoUploadModal extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
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

  onConfirm = () => {
    const { url } = this.state;
    if (isVideoUrl(url)) {
      this.props.onConfirm(url);
    } else {
      this.setState({ isValidUrl: false });
    }
  };

  onCancel = () => {
    this.props.onCancel();
  };

  handleKeyPress = e => {
    if (e.charCode === 13) {
      this.onConfirm();
    }
  };

  render() {
    const { isOpen, url, theme, doneLabel, cancelLabel } = this.props;
    const { styles } = this;
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
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <div onKeyPress={this.handleKeyPress} className={styles.modal_content}>
          <CloseIcon className={styles.closeIcon} onClick={this.onCancel} />
          <div className={classNames(styles.header)}>
            <CameraIcon className={classNames(styles.cameraIcon, styles.header_icon)} />
            <h3 className={styles.header_text}>Add a video from YouTube or Vimeo</h3>
          </div>
          <div className={styles.textInput}>
            <input
              ref={ref => (this.input = ref)}
              className={classNames(styles.textInput_input, { [styles.textInput_input_invalid]: !this.state.isValidUrl })}
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
                moveBy={{ x: -23, y: -5 }}
              >
                <span><ErrorIcon className={styles.errorIcon} /></span>
              </Tooltip>
            )}
          </div>
          <SettingsPanelFooter
            className={styles.modal_footer}
            save={() => this.onConfirm()}
            cancel={() => this.onCancel()}
            saveLabel={doneLabel}
            cancelLabel={cancelLabel}
            theme={theme}
          />
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
  theme: PropTypes.object.isRequired,
  doneLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
};

VideoUploadModal.defaultProps = {
  doneLabel: 'Add Now',
  cancelLabel: 'Cancel',
};
