import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import LinkPanel from '~/Common/LinkPanel';

class BlockLinkPanel extends Component {
  wrapBlockInLink = ({ url, targetBlank }) => {
    const { store } = this.props;
    if (!isEmpty(url)) {
      store.set('componentLink', { url, targetBlank });
    } else {
      store.set('componentLink', undefined);
    }
    this.hideLinkPanel();
  };

  hideLinkPanel = () => {
    this.props.onExtendContent(undefined);
  };

  render() {
    const componentLink = this.props.store.get('componentLink') || {};
    const { url, targetBlank, nofollow } = componentLink;
    return <LinkPanel url={url} targetBlank={targetBlank} nofollow={nofollow} onDone={this.wrapBlockInLink} onCancel={this.hideLinkPanel} />;
  }
}

BlockLinkPanel.propTypes = {
  store: PropTypes.object.isRequired,
  onExtendContent: PropTypes.func.isRequired,
};

export default BlockLinkPanel;
