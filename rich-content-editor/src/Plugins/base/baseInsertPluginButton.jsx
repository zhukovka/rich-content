import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AtomicBlockUtils } from '@wix/draft-js';
import cloneDeep from 'lodash/cloneDeep';
import classNames from 'classnames';
import Tooltip from 'wix-style-react/dist/src/Tooltip';
import Styles from '~/Styles/toolbar-button.scss';
import { VideoUploadModal } from '../wix-draft-plugin-video/videoUploadModal';

export default ({ blockType, button, pubsub }) => {
  class InsertPluginButton extends Component {
    constructor() {
      super();
      this.state = {};
    }

    addBlock = data => {
      const { getEditorState, setEditorState, hidePluginSelectPopup } = this.props;
      const contentState = getEditorState().getCurrentContent();
      const contentStateWithEntity = contentState.createEntity(blockType, 'IMMUTABLE', cloneDeep(data));
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const newEditorState = AtomicBlockUtils.insertAtomicBlock(getEditorState(), entityKey, ' ');
      if (hidePluginSelectPopup) {
        hidePluginSelectPopup();
      }
      const recentlyCreatedKey = newEditorState.getSelection().getAnchorKey();
      //when adding atomic block, there is the atomic itself, and then there is a text block with one space,
      // so get the block before the space
      const newBlock = newEditorState.getCurrentContent().getBlockBefore(recentlyCreatedKey);
      setEditorState(newEditorState);

      return newBlock;
    };

    onClick = event => {
      event.preventDefault();
      switch (button.type) {
        case 'file':
          break;
        case 'video':
          this.openVideoUploadModal();
          break;
        default:
          this.addBlock(button.data || {});
      }
    };

    addVideoBlock = url => {
      this.closeVideoUploadModal();
      this.addBlock({ ...button.data, src: url });
    };

    handleFileChange = event => {
      if (event.target.files.length > 0) {
        const files = Array.from(event.target.files);
        const recentlyCreated = this.addBlock(button.data);
        const state = { userSelectedFiles: { files } };
        pubsub.set('initialState_' + recentlyCreated.getKey(), state);

        this.resetForm();
      }
    };

    setForm = form => (this.form = form);

    resetForm = () => this.form && this.form.reset();

    preventBubblingUp = event => event.preventDefault();

    renderButton = () => {
      const { theme, hideName } = this.props;
      const { name, Icon } = button;
      const children = [<Icon key="0" />, hideName ? null : <span key="1">{name}</span>].filter(child => child);
      return <button className={classNames(Styles.button, theme.button)} onClick={this.onClick} type="button" children={children} />;
    };

    openVideoUploadModal = () => {
      this.setState({ isVideoUploadModalOpen: true });
    };

    closeVideoUploadModal = () => {
      this.setState({ isVideoUploadModalOpen: false });
    };

    renderVideoUploadForm = show => (show ? <VideoUploadModal isOpen onConfirm={this.addVideoBlock} onCancel={this.closeVideoUploadModal} /> : null);

    renderFileUploadForm = () => {
      return (
        <form ref={this.setForm}>
          <input name="file" type="file" className={Styles.fileInput} onChange={this.handleFileChange} accept="image/*" tabIndex="-1" multiple={button.multi}/>
        </form>
      );
    };

    render() {
      const { theme } = this.props;
      const { tooltipText } = button;
      return (
        <Tooltip content={tooltipText} textAlign="center" maxWidth="" moveBy={{ x: -8 }} shouldCloseOnClickOutside theme="dark">
          <div className={classNames(Styles.buttonWrapper, theme.buttonWrapper)} onMouseDown={this.preventBubblingUp}>
            {this.renderButton()}
            {button.type === 'file' && this.renderFileUploadForm()}
            {button.type === 'video' && this.renderVideoUploadForm(this.state.isVideoUploadModalOpen)}
          </div>
        </Tooltip>
      );
    }
  }

  InsertPluginButton.propTypes = {
    getEditorState: PropTypes.func.isRequired,
    setEditorState: PropTypes.func.isRequired,
    hidePluginSelectPopup: PropTypes.func,
    hideName: PropTypes.bool,
    theme: PropTypes.object,
  };

  return InsertPluginButton;
};
