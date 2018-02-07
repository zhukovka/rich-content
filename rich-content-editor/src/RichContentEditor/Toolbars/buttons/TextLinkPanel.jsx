import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState } from '@wix/draft-js';
import isEmpty from 'lodash/isEmpty';
import { insertLink, getLinkDataInSelection, removeLinksInSelection } from '~/Utils';
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

  deleteLink = () => {
    const { getEditorState, setEditorState } = this.props;
    const editorState = getEditorState();
    const selection = editorState.getSelection();
    const newEditorState = removeLinksInSelection(editorState);
    setEditorState(EditorState.acceptSelection(newEditorState, selection));
  }

  hideLinkPanel = () => {
    this.props.onExtendContent(undefined);
    this.props.onOverrideContent(undefined);
  };

  render() {
    const { getEditorState } = this.props;
    const linkData = getLinkDataInSelection(getEditorState()) || {};
    const { url, targetBlank, nofollow } = linkData;
    return (<LinkPanel
      url={url}
      targetBlank={targetBlank}
      nofollow={nofollow}
      isActive={!isEmpty(linkData)}
      onDone={this.createLinkEntity}
      onCancel={this.hideLinkPanel}
      onDelete={this.deleteLink}
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
