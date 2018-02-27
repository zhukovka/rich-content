import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { isVideoUrl } from '~/Utils/urlValidators';
import styles from './video-upload-modal.scss';
import CameraIcon from './icons/video-camera.svg';
import ErrorIcon from './icons/error.svg';
import classNames from 'classnames';
import SettingsPanelFooter from '~/Components/SettingsPanelFooter';
import Tooltip from '~/Components/Tooltip';
import { mergeStyles } from '~/Utils/mergeStyles';

export default class VideoUploadModal extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    const { componentData } = this.props;
    this.state = {
      url: componentData.src || '',
      isValidUrl: props.url ? isVideoUrl(props.url) : true,
    };
  }

  onUrlChange = e => {
    const url = e.target.value;
    this.setState({ url, isValidUrl: true });
  };

  afterOpenModal = () => this.input.focus();

  onConfirm = () => {
    const { url } = this.state;
    if (isVideoUrl(url)) {
      if (this.props.onConfirm) {
        this.props.onConfirm({ ...this.props.componentData, src: url });
      } else {
        this.props.pubsub.update('componentData', { src: url });
      }
      this.onCloseRequested();
    } else {
      this.setState({ isValidUrl: false });
    }
  };

  onCloseRequested = () => {
    this.setState({ isOpen: false });
    this.props.helpers.closeModal();
  };

  handleKeyPress = e => {
    if (e.charCode === 13) {
      this.onConfirm();
    }
  };

  render() {
    const { theme, doneLabel, cancelLabel } = this.props;
    const { styles } = this;
    return (
      <div onKeyPress={this.handleKeyPress} className={styles.container}>
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
            value={this.state.url}
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
              theme={theme}
            >
              <span><ErrorIcon className={styles.errorIcon} /></span>
            </Tooltip>
          )}
        </div>
        <SettingsPanelFooter
          className={styles.modal_footer}
          save={() => this.onConfirm()}
          cancel={() => this.onCloseRequested()}
          saveLabel={doneLabel}
          cancelLabel={cancelLabel}
          theme={theme}
        />
      </div>
    );
  }
}

VideoUploadModal.propTypes = {
  onConfirm: PropTypes.func,
  pubsub: PropTypes.object.isRequired,
  helpers: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
  url: PropTypes.string,
  theme: PropTypes.object.isRequired,
  doneLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
};

VideoUploadModal.defaultProps = {
  doneLabel: 'Add Now',
  cancelLabel: 'Cancel',
};
