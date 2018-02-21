import React, { Component } from 'react';
import PropTypes from 'prop-types';
import decorateComponentWithProps from 'decorate-component-with-props';
import LinkButton from '~/Components/LinkButton';
import BlockLinkPanel from './BlockLinkPanel';

class BlockLinkButton extends Component {
  get isActive() {
    return !!this.props.pubsub.get('componentLink');
  }

  showLinkPanel = () => {
    const { pubsub, onExtendContent, onOverrideContent, theme } = this.props;
    const linkPanelProps = {
      pubsub,
      onExtendContent,
      onOverrideContent,
      theme
    };
    const BlockLinkPanelWithProps = decorateComponentWithProps(BlockLinkPanel, linkPanelProps);
    onExtendContent(BlockLinkPanelWithProps);
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
  theme: PropTypes.object,
};

export default BlockLinkButton;
