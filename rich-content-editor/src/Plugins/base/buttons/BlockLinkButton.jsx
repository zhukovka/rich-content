import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    };
    const BlockLinkPanelWithProps = decorateComponentWithProps(BlockLinkPanel, props);
    this.props.onExtendContent(BlockLinkPanelWithProps);
  }

  render() {
    return <LinkButton onClick={this.showLinkPanel} isActive={this.isActive}/>;
  }
}

BlockLinkButton.propTypes = {
  pubsub: PropTypes.object.isRequired,
  onExtendContent: PropTypes.func.isRequired,
};

export default BlockLinkButton;
