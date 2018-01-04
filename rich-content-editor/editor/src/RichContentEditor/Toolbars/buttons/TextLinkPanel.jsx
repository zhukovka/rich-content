import React, { Component } from 'react';
import isEmpty from 'lodash.isempty';
import { insertLink } from '~/Utils';
import LinkPanel from '~/Common/LinkPanel';

class TextLinkPanel extends Component {

  createLinkEntity = ({ url, targetBlank }) => {
    if (!isEmpty(url)) {
      const { getEditorState, setEditorState } = this.props;
      const newEditorState = insertLink(getEditorState(), { url, targetBlank });
      setEditorState(newEditorState);
    }
    this.hideLinkPanel();
  }

  hideLinkPanel = () => {
    this.props.onOverrideContent(undefined);
  }

  render() {
    return (
      <LinkPanel
        onDone={this.createLinkEntity}
        onCancel={this.hideLinkPanel}
      />
    );
  }
}

export default TextLinkPanel;
