import React, { Component } from 'react';
import PropTypes from 'prop-types';
import decorateComponentWithProps from 'decorate-component-with-props';
import { MODALS } from '~/RichContentEditor/RichContentModal';
import { hasLinksInSelection, getModalStyles } from '~/Utils';
import LinkButton from '~/Components/LinkButton';
import TextLinkPanel from './TextLinkPanel';

export default class TextLinkButton extends Component {
  showLinkPanel = () => {
    const { onExtendContent, onOverrideContent, getEditorState, setEditorState, theme, isMobile, helpers, keyName } = this.props;
    const modalStyles = getModalStyles({ fullScreen: false });
    if (isMobile) {
      if (helpers && helpers.openModal) {
        const modalProps = {
          helpers,
          modalStyles,
          isMobile,
          getEditorState,
          setEditorState,
          theme: theme.modal || {},
          modalName: MODALS.MOBILE_TEXT_LINK_MODAL,
          hidePopup: helpers.closeModal
        };
        helpers.openModal(modalProps);
      } else {
        console.error('Open external helper function is not defined for toolbar button with keyName ' + keyName); //eslint-disable-line no-console
      }
    } else {
      const linkPanelProps = {
        onExtendContent,
        onOverrideContent,
        theme
      };
      const TextLinkPanelWithProps = decorateComponentWithProps(TextLinkPanel, linkPanelProps);
      onExtendContent(TextLinkPanelWithProps);
    }
  }

  get isActive() {
    return hasLinksInSelection(this.props.getEditorState());
  }

  render() {
    const { theme } = this.props;
    return (<LinkButton
      onClick={this.showLinkPanel}
      isActive={this.isActive}
      theme={theme}
    />);
  }
}

TextLinkButton.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  onExtendContent: PropTypes.func.isRequired,
  onOverrideContent: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  isMobile: PropTypes.bool,
  helpers: PropTypes.object,
  keyName: PropTypes.string,
};
