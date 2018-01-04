import React, { Component } from 'react';
import decorateComponentWithProps from 'decorate-component-with-props';
import LinkButton from '~/Common/LinkButton';
import BlockLinkPanel from './BlockLinkPanel';

class BlockLinkButton extends Component {
  state = {
    isActive: false,
  }

  componentDidMount() {
    this.setState({ isActive: !!this.props.pubsub.get('componentLink')});
  }

  showLinkPanel = () => {
    const { pubsub } = this.props;
    const props = {
      store: pubsub.store,
    }
    const BlockLinkPanelWithProps = decorateComponentWithProps(BlockLinkPanel, props);
    this.props.onOverrideContent(BlockLinkPanelWithProps);
  }

  render() {
    return <LinkButton onClick={this.showLinkPanel} isActive={this.state.isActive} />;
  }
}

export default BlockLinkButton;
