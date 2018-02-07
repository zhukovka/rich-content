import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { insertLink, getLinkDataInSelection } from '~/Utils';
import LinkPanel from '~/Components/LinkPanel';

export default class TextLinkPanel extends Component {
  createLinkEntity = ({ url, targetBlank, nofollow }) => {
    if (!isEmpty(url)) {
      const { getEditorState, setEditorState } = this.props;
      const newEditorState = insertLink(getEditorState(), { url, targetBlank, nofollow });
      setEditorState(newEditorState);
    }
    this.hideLinkPanel();
  };

  hideLinkPanel = () => {
    this.props.onExtendContent(undefined);
    this.props.onOverrideContent(undefined);
  };

  render() {
    const { getEditorState } = this.props;
    const link = getLinkDataInSelection(getEditorState()) || {};
    const { url, targetBlank, nofollow } = link;
    return (<LinkPanel
      url={url}
      targetBlank={targetBlank}
      nofollow={nofollow}
      onDone={this.createLinkEntity}
      onCancel={this.hideLinkPanel}
      onOverrideContent={this.props.onOverrideContent}
    />);
  }
}

TextLinkPanel.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  onExtendContent: PropTypes.func.isRequired,
  onOverrideContent: PropTypes.func.isRequired,
  theme: PropTypes.object,
};
