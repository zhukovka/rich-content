import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AtomicBlockUtils, EditorState, SelectionState } from '@wix/draft-js';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
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

      const newSelection = new SelectionState({
        anchorKey: newBlock.getKey(),
        anchorOffset: 0,
        focusKey: newBlock.getKey(),
        focusOffset: 0,
      });
      setEditorState(EditorState.forceSelection(newEditorState, newSelection));
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
      const buttonClassNames = classNames(Styles.button, theme && theme.button);
      const iconClassNames = classNames(Styles.icon, theme && theme.icon);
      const labelClassNames = classNames(Styles.label, theme && theme.label);
      return (
        <button className={buttonClassNames} onClick={this.onClick}>
          <div className={iconClassNames}>
            <Icon key="0" />
          </div>
          {!hideName && <span key="1" className={labelClassNames}>{name}</span>}
        </button>
      );
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
          <input
            name="file"
            type="file"
            className={Styles.fileInput}
            onChange={this.handleFileChange}
            accept="image/*"
            tabIndex="-1"
            multiple={button.multi}
          />
        </form>
      );
    };

    render() {
      const { theme, isMobile } = this.props;
      const { tooltipText } = button;
      const showTooltip = !isMobile && !isEmpty(tooltipText);
      const buttonWrapperClassNames = classNames(
        Styles.buttonWrapper,
        {
          [Styles.mobile]: isMobile,
        },
        theme && theme.buttonWrapper
      );

      const Button = (
        <div className={buttonWrapperClassNames} onMouseDown={this.preventBubblingUp}>
          {this.renderButton()}
          {button.type === 'file' && this.renderFileUploadForm()}
          {button.type === 'video' && this.renderVideoUploadForm(this.state.isVideoUploadModalOpen)}
        </div>
      );

      if (showTooltip) {
        return (
          <Tooltip
            content={tooltipText}
            textAlign="center"
            maxWidth=""
            moveBy={{ x: -8 }}
            shouldCloseOnClickOutside theme="dark"
          >
            {Button}
          </Tooltip>
        );
      } else {
        return Button;
      }
    }
  }

  InsertPluginButton.propTypes = {
    getEditorState: PropTypes.func.isRequired,
    setEditorState: PropTypes.func.isRequired,
    hidePluginSelectPopup: PropTypes.func,
    hideName: PropTypes.bool,
    theme: PropTypes.object,
    isMobile: PropTypes.bool,
  };

  return InsertPluginButton;
};
