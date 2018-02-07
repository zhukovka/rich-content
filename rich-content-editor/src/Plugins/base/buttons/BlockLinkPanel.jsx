import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import LinkPanel from '~/Components/LinkPanel';

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

  hideLinkPanel = () => {
    this.props.onExtendContent(undefined);
    this.props.onOverrideContent(undefined);
  };

  render() {
    const componentLink = this.props.pubsub.get('componentLink') || {};
    const { url, targetBlank, nofollow } = componentLink;
    return (
      <LinkPanel
        url={url}
        targetBlank={targetBlank}
        nofollow={nofollow}
        onDone={this.wrapBlockInLink}
        onCancel={this.hideLinkPanel}
        onOverrideContent={this.props.onOverrideContent}
      />
    );
  }
}

BlockLinkPanel.propTypes = {
  pubsub: PropTypes.object.isRequired,
  onExtendContent: PropTypes.func.isRequired,
  onOverrideContent: PropTypes.func.isRequired,
};

export default BlockLinkPanel;
