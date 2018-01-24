import React, { Component } from 'react';
import PropTypes from 'prop-types';
import decorateComponentWithProps from 'decorate-component-with-props';
import LinkButton from '~/Common/LinkButton';
import BlockLinkPanel from './BlockLinkPanel';

class BlockLinkButton extends Component {
  state = {
    isOpen: false,
  }

  get isActive() {
    return !!this.props.pubsub.get('componentLink');
  }

  setLinkPanel = linkPanel => this.linkPanel = linkPanel;

  toggleLinkPanel = () => {
    if (this.state.isOpen) {
      this.linkPanel.onCloseRequested();
      this.props.onExtendContent(undefined);
      this.setState({ isOpen: false });
    } else {
      const { pubsub } = this.props;
      const props = {
        pubsub,
        ref: this.setLinkPanel,
      };
      const BlockLinkPanelWithProps = decorateComponentWithProps(BlockLinkPanel, props);
      this.props.onExtendContent(BlockLinkPanelWithProps);
      this.setState({ isOpen: true });
    }
  }

  render() {
    return <LinkButton onClick={this.toggleLinkPanel} isActive={this.isActive} />;
  }
}

BlockLinkButton.propTypes = {
  pubsub: PropTypes.object.isRequired,
  onExtendContent: PropTypes.func.isRequired,
};

export default BlockLinkButton;
