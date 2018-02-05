import React, { Component } from 'react';
import PropTypes from 'prop-types';
import decorateComponentWithProps from 'decorate-component-with-props';
import LinkButton from '~/Components/LinkButton';
import BlockLinkPanel from './BlockLinkPanel';

class BlockLinkButton extends Component {
  state = {
    isOpen: false,
  }

  componentDidMount() {
    this.props.pubsub.subscribe('visibleBlock', this.onVisibilityChanged);
  }

  componentWillUnmount() {
    this.props.pubsub.unsubscribe('visibleBlock', this.onVisibilityChanged);
  }

  onVisibilityChanged = visibleBlock => {
    if (!visibleBlock && this.state.isOpen) {
      this.toggleLinkPanel();
    }
  };

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
    const { theme } = this.props;
    return (<LinkButton
      onClick={this.toggleLinkPanel}
      isActive={this.isActive}
      theme={theme}
    />);
  }
}

BlockLinkButton.propTypes = {
  pubsub: PropTypes.object.isRequired,
  onExtendContent: PropTypes.func.isRequired,
  theme: PropTypes.object,
};

export default BlockLinkButton;
