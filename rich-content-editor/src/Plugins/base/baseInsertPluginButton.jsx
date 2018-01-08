import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AtomicBlockUtils } from 'draft-js';
import noop from 'lodash/noop';
import cloneDeep from 'lodash/cloneDeep';
import classNames from 'classnames';
import Tooltip from 'wix-style-react/dist/src/Tooltip';
import Styles from '~/Styles/toolbar-button.scss';

export default ({ blockType, button, pubsub }) => {
  class InsertPluginButton extends Component {
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
      const data = button.data || {};
      this.addBlock(data);
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
      const { name, Icon, type } = button;
      const children = [<Icon key="0" />, hideName ? null : <span key="1">{name}</span>].filter(child => child);
      return (
        <button
          className={classNames(Styles.button, theme.button)}
          onClick={type !== 'file' ? this.onClick : noop}
          type="button"
          children={children}
        />
      );
    };

    renderUploadForm = () => {
      return (
        <form ref={this.setForm}>
          <input name="file" type="file" className={Styles.fileInput} onChange={this.handleFileChange} accept="image/*" tabIndex="-1" />
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
            {button.type === 'file' && this.renderUploadForm()}
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
