import React, { Component } from 'react';
import isEmpty from 'lodash.isempty';
import LinkPanel from '~/Common/LinkPanel';

class BlockLinkPanel extends Component {

  wrapBlockInLink = ({ url, targetBlank }) => {
    const { store } = this.props;
    if (!isEmpty(url)) {
      store.set('componentLink', { url, targetBlank });
    }
    else {
      store.set('componentLink', undefined);
    }
    this.hideLinkPanel();
  }

  hideLinkPanel = () => {
    this.props.onOverrideContent(undefined);
  }

  render() {
    const componentLink = this.props.store.get('componentLink') || {};
    const { url, targetBlank } = componentLink;
    return (
      <LinkPanel
        url={url}
        targetBlank={targetBlank}
        onDone={this.wrapBlockInLink}
        onCancel={this.hideLinkPanel}
      />
    );
  }
}

export default BlockLinkPanel;
