import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getModalStyles } from '~/Utils';
import AddPluginModal from '../AddPluginModal';
import PlusIcon from '../icons/plus-default.svg';
import TextButton from './TextButton';

export default class AddPluginButton extends Component {
  constructor(props) {
    super(props);
    props.pubsub.set('openAddPluginModal', this.openAddPluginModal);
  }

  handleClick = () => this.openAddPluginModal();

  openAddPluginModal = () => {
    const { getEditorState, setEditorState, pluginButtons, pubsub, theme } = this.props;
    const customStyles = {
      content: {
        height: '200px',
        top: 'calc(50% - 100px)',
      }
    };
    this.props.openExternalModal({
      modalElement: AddPluginModal,
      modalStyles: getModalStyles({ customStyles, fullScreen: false }),
      structure: pluginButtons,
      theme: theme.mobileAddPlugin,
      hidePopup: this.props.closeExternalModal,
      getEditorState,
      setEditorState,
      pubsub
    });
  }

  render() {
    const { theme } = this.props;
    return (
      <TextButton
        icon={PlusIcon}
        theme={theme}
        onClick={this.handleClick}
      />
    );
  }
}

AddPluginButton.propTypes = {
  pubsub: PropTypes.object.isRequired,
  openExternalModal: PropTypes.func.isRequired,
  closeExternalModal: PropTypes.func.isRequired,
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  pluginButtons: PropTypes.array,
  theme: PropTypes.object,
};
