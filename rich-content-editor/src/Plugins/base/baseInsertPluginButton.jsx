import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AtomicBlockUtils, EditorState, SelectionState } from '@wix/draft-js';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import classNames from 'classnames';
import Tooltip from '~/Components/Tooltip';
import styles from '~/Styles/toolbar-button.scss';
import { mergeStyles } from '~/Utils/mergeStyles';

export default ({ blockType, button, helpers, pubsub, theme }) => {
  class InsertPluginButton extends Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.styles = mergeStyles({ styles, theme });
    }

    addBlock = data => {
      const { getEditorState, setEditorState, hidePopup } = this.props;
      const contentState = getEditorState().getCurrentContent();
      const contentStateWithEntity = contentState.createEntity(blockType, 'IMMUTABLE', cloneDeep(data));
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const newEditorState = AtomicBlockUtils.insertAtomicBlock(getEditorState(), entityKey, ' ');
      if (hidePopup) {
        hidePopup();
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
        case 'modal':
          this.toggleButtonModal();
          break;
        default:
          this.addBlock(button.data || {});
      }
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
      const { styles } = this;
      const { showName } = this.props;
      const { name, Icon } = button;
      return (
        <button className={styles.button} onClick={this.onClick}>
          <div className={styles.icon}>
            <Icon key="0" />
          </div>
          {showName && <span key="1" className={styles.label}>{name}</span>}
        </button>
      );
    };

    toggleButtonModal = () => {
      if (helpers && helpers.openModal) {
        helpers.openModal({
          modalName: button.modalName,
          modalStyles: button.modalStyles,
          theme: theme.modal,
          componentData: button.data,
          onConfirm: this.addBlock,
          helpers,
        });
      }
    }

    renderFileUploadForm = () => {
      const { styles } = this;
      return (
        <form ref={this.setForm}>
          <input
            name="file"
            type="file"
            className={styles.fileInput}
            onChange={this.handleFileChange}
            accept="image/*"
            tabIndex="-1"
            multiple={button.multi}
          />
        </form>
      );
    };

    render() {
      const { styles } = this;
      const { isMobile } = this.props;
      const { tooltipText } = button;
      const showTooltip = !isMobile && !isEmpty(tooltipText);
      const buttonWrapperClassNames = classNames(
        styles.buttonWrapper, { [styles.mobile]: isMobile });

      const Button = (
        <div className={buttonWrapperClassNames} onMouseDown={this.preventBubblingUp}>
          {this.renderButton()}
          {button.type === 'file' && this.renderFileUploadForm()}
        </div>
      );

      if (showTooltip) {
        return (
          <Tooltip
            content={tooltipText}
            moveBy={{ x: 10 }}
            theme={theme}
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
    hidePopup: PropTypes.func,
    showName: PropTypes.bool,
    isMobile: PropTypes.bool,
  };

  return InsertPluginButton;
};
