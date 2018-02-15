import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import LinkPanelContainer from '~/Components/LinkPanelContainer';

class BlockLinkPanel extends Component {
  wrapBlockInLink = ({ url, targetBlank, nofollow }) => {
    const { pubsub } = this.props;
    if (!isEmpty(url)) {
      pubsub.set('componentLink', { url, targetBlank, nofollow });
    } else {
      pubsub.set('componentLink', undefined);
    }
    this.hideLinkPanel();
  };

  deleteLink = () => {
    this.props.pubsub.set('componentLink', undefined);
  }

  hideLinkPanel = () => {
    this.props.onExtendContent(undefined);
    this.props.onOverrideContent(undefined);
  };

  render() {
    const { theme } = this.props;
    const componentLink = this.props.pubsub.get('componentLink');
    const { url, targetBlank, nofollow } = componentLink || {};
    return (
      <LinkPanelContainer
        url={url}
        targetBlank={targetBlank}
        nofollow={nofollow}
        isActive={!!componentLink}
        onDone={this.wrapBlockInLink}
        onCancel={this.hideLinkPanel}
        onDelete={this.deleteLink}
        onOverrideContent={this.props.onOverrideContent}
        theme={theme}
      />
    );
  }
}

BlockLinkPanel.propTypes = {
  pubsub: PropTypes.object.isRequired,
  onExtendContent: PropTypes.func.isRequired,
  onOverrideContent: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,

};

export default BlockLinkPanel;
