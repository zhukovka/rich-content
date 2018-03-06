import React, { Component } from 'react';
import PropTypes from 'prop-types';
import decorateComponentWithProps from 'decorate-component-with-props';
import { MODALS } from '~/RichContentEditor/RichContentModal';
import { getModalStyles } from '~/Utils';
import LinkButton from '~/Components/LinkButton';
import BlockLinkPanel from './BlockLinkPanel';

class BlockLinkButton extends Component {
  get isActive() {
    return !!this.props.pubsub.get('componentLink');
  }

  showLinkPanel = () => {
    const { pubsub, onExtendContent, onOverrideContent, theme, isMobile, helpers, keyName, componentState } = this.props;
    const modalStyles = getModalStyles({ fullScreen: false });
    if (isMobile) {
      if (helpers && helpers.openModal) {
        const modalProps = {
          componentState,
          helpers,
          pubsub,
          modalStyles,
          isMobile,
          theme: theme.modal || {},
          modalName: MODALS.MOBILE_BLOCK_LINK_MODAL,
          hidePopup: helpers.closeModal
        };
        helpers.openModal(modalProps);
      } else {
        console.error('Open external helper function is not defined for toolbar button with keyName ' + keyName); //eslint-disable-line no-console
      }
    } else {
      const linkPanelProps = {
        pubsub,
        onExtendContent,
        onOverrideContent,
        theme
      };
      const BlockLinkPanelWithProps = decorateComponentWithProps(BlockLinkPanel, linkPanelProps);
      onExtendContent(BlockLinkPanelWithProps);
    }
  };

  render() {
    const { theme } = this.props;
    return (<LinkButton
      onClick={this.showLinkPanel}
      isActive={this.isActive}
      theme={theme}
    />);
  }
}

BlockLinkButton.propTypes = {
  pubsub: PropTypes.object.isRequired,
  onExtendContent: PropTypes.func.isRequired,
  onOverrideContent: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  isMobile: PropTypes.bool,
  helpers: PropTypes.object,
  keyName: PropTypes.string,
  componentState: PropTypes.object,
};

export default BlockLinkButton;
