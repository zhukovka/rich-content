import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import LinkPanel from '~/Common/LinkPanel';

class BlockLinkPanel extends Component {

  setLinkPanel = linkPanel => this.linkPanel = linkPanel;

  wrapBlockInLink = ({ url, targetBlank, nofollow }) => {
    const { pubsub } = this.props;
    if (!isEmpty(url)) {
      pubsub.set('componentLink', { url, targetBlank, nofollow });
    } else {
      pubsub.set('componentLink', undefined);
    }
    this.hideLinkPanel();
  };

  onCloseRequested = () => {
    if (get(this, 'linkPanel.state.url', undefined)) {
      const { url, targetBlank, nofollow } = this.linkPanel.state;
      this.wrapBlockInLink({ url, targetBlank, nofollow });
    }
  }


  hideLinkPanel = () => {
    this.props.onExtendContent(undefined);
  };

  render() {
    const componentLink = this.props.pubsub.get('componentLink') || {};
    const { url, targetBlank, nofollow } = componentLink;
    return (
      <LinkPanel
        ref={this.setLinkPanel}
        url={url}
        targetBlank={targetBlank}
        nofollow={nofollow}
        onDone={this.wrapBlockInLink}
        onCancel={this.hideLinkPanel}
      />
    );
  }
}

BlockLinkPanel.propTypes = {
  pubsub: PropTypes.object.isRequired,
  onExtendContent: PropTypes.func.isRequired,
};

export default BlockLinkPanel;
