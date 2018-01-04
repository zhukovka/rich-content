import React, { Component } from 'react';
import decorateComponentWithProps from 'decorate-component-with-props';
import LinkButton from '~/Common/LinkButton';
import BlockLinkPanel from './BlockLinkPanel';

class BlockLinkButton extends Component {

  get isActive() {
    return !!this.props.pubsub.get('componentLink');
  }

  showLinkPanel = () => {
    const { pubsub } = this.props;
    const props = {
      store: pubsub.store,
    }
    const BlockLinkPanelWithProps = decorateComponentWithProps(BlockLinkPanel, props);
    this.props.onExtendContent(BlockLinkPanelWithProps);
  }

  render() {
    return <LinkButton onClick={this.showLinkPanel} isActive={this.isActive} />;
  }
}

export default BlockLinkButton;
