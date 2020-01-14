import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  hasEntityInSelectionByType,
  getModalStyles,
  AnchorButton,
  EditorModals,
  decorateComponentWithProps,
} from 'wix-rich-content-editor-common';
import AnchorLinkPanel from './AnchorLinkPanel';

export default class TextAnchorButton extends Component {
  showLinkPanel = () => {
    const {
      onExtendContent,
      onOverrideContent,
      getEditorState,
      setEditorState,
      theme,
      isMobile,
      linkModal,
      helpers,
      keyName,
      anchorTarget,
      relValue,
      t,
      uiSettings,
    } = this.props;
    const modalStyles = getModalStyles({ fullScreen: false, isMobile });
    if (isMobile || linkModal) {
      if (helpers && helpers.openModal) {
        const modalProps = {
          helpers,
          modalStyles,
          isMobile,
          getEditorState,
          setEditorState,
          t,
          theme,
          anchorTarget,
          relValue,
          modalName: EditorModals.MOBILE_TEXT_ANCHOR_MODAL,
          hidePopup: helpers.closeModal,
          uiSettings,
        };
        helpers.openModal(modalProps);
      } else {
        //eslint-disable-next-line no-console
        console.error(
          'Open external helper function is not defined for toolbar button with keyName ' + keyName
        );
      }
    } else {
      const linkPanelProps = {
        onExtendContent,
        onOverrideContent,
        anchorTarget,
        relValue,
        theme,
        t,
        uiSettings,
      };
      const TextLinkPanelWithProps = decorateComponentWithProps(AnchorLinkPanel, linkPanelProps);
      onOverrideContent(TextLinkPanelWithProps);
    }
  };

  get isActive() {
    return hasEntityInSelectionByType(this.props.getEditorState(), 'wix-draft-plugin-anchor');
  }

  render() {
    const { theme, isMobile, t, tabIndex, config } = this.props;
    const anchorButtonTooltip = t('TextAnchorButton_Tooltip');
    const buttonStyles = {
      button: theme.inlineToolbarButton,
      buttonWrapper: theme.inlineToolbarButton_wrapper,
      icon: theme.inlineToolbarButton_icon,
      active: theme.inlineToolbarButton_active,
    };
    const icon = config?.LINK?.toolbar?.icons?.link;
    return (
      <AnchorButton
        onClick={this.showLinkPanel}
        isActive={this.isActive}
        theme={{ ...theme, ...buttonStyles }}
        isMobile={isMobile}
        tooltipText={anchorButtonTooltip}
        tabIndex={tabIndex}
        icon={icon}
      />
    );
  }
}

TextAnchorButton.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  onExtendContent: PropTypes.func.isRequired,
  onOverrideContent: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  isMobile: PropTypes.bool,
  linkModal: PropTypes.bool,
  helpers: PropTypes.object,
  keyName: PropTypes.string,
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
  t: PropTypes.func,
  tabIndex: PropTypes.number,
  uiSettings: PropTypes.object,
  config: PropTypes.object,
};
