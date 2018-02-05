import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getModalStyles } from '~/Utils';
import AddPluginModal from '../AddPluginModal';
import PlusIcon from '../icons/plus-default.svg';
import Styles from '~/Styles/toolbar-button.scss';

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

  preventBubblingUp = event => event.preventDefault();

  render() {
    const { theme } = this.props;
    const buttonWrapperClassNames = classNames(Styles.buttonWrapper, theme && theme.buttonWrapper);
    const buttonClassNames = classNames(Styles.button, theme && theme.button);
    const iconClassNames = classNames(Styles.icon, theme && theme.icon);
    return (
      <div className={buttonWrapperClassNames} onMouseDown={this.preventBubblingUp}>
        <button className={buttonClassNames} onClick={this.handleClick}>
          <div className={iconClassNames}>
            <PlusIcon />
          </div>
        </button>
      </div>
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
