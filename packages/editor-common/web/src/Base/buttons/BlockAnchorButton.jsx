import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  getModalStyles,
  EditorModals,
  decorateComponentWithProps,
} from 'wix-rich-content-editor-common';
import AnchorLinkPanel from './AnchorLinkPanel';
import AnchorButton from './AnchorButton';

export default class BlockAnchorButton extends Component {
  showAnchorPanel = () => {
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
      pubsub,
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
      const anchorPanelProps = {
        getEditorState,
        setEditorState,
        onExtendContent,
        onOverrideContent,
        anchorTarget,
        relValue,
        theme,
        t,
        uiSettings,
        pubsub,
        helpers,
      };
      const TextAnchorPanelWithProps = decorateComponentWithProps(
        AnchorLinkPanel,
        anchorPanelProps
      );
      onOverrideContent(TextAnchorPanelWithProps);
    }
  };

  isActive = () => {
    const componentData = this.props.pubsub.get('componentData');
    return !!componentData?.config?.link;
  };

  render() {
    const { theme, isMobile, t, tabIndex, config } = this.props;
    const anchorButtonTooltip = t('TextAnchorButton_Tooltip');
    const buttonStyles = {
      button: theme.inlineToolbarButton,
      buttonWrapper: theme.inlineToolbarButton_wrapper,
      icon: theme.inlineToolbarButton_icon,
      active: theme.inlineToolbarButton_active,
    };
    const icon = config?.ANCHOR?.toolbar?.icons?.anchor;
    return (
      <AnchorButton
        onClick={this.showAnchorPanel}
        isActive={this.isActive()}
        theme={{ ...theme, ...buttonStyles }}
        isMobile={isMobile}
        tooltipText={anchorButtonTooltip}
        tabIndex={tabIndex}
        icon={icon}
      />
    );
  }
}

BlockAnchorButton.propTypes = {
  pubsub: PropTypes.object.isRequired,
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
