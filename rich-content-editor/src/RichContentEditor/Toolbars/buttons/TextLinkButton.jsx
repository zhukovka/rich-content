import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import { hasLinksInSelection, removeLinksInSelection } from '~/Utils';
import LinkButton from '~/Common/LinkButton';
import TextLinkPanel from './TextLinkPanel';

class TextLinkButton extends Component {

  onClick = () => {
    if (!this.isActive) {
      this.showLinkPanel();
    } else {
      this.removeLinks();
    }
  }

  showLinkPanel() {
    this.props.onOverrideContent(TextLinkPanel);
  }

  removeLinks = () => {
    const { getEditorState, setEditorState } = this.props;
    const editorState = getEditorState();
    const selection = editorState.getSelection();
    const newEditorState = removeLinksInSelection(editorState);
    setEditorState(EditorState.acceptSelection(newEditorState, selection));
  };

  get isActive() {
    return hasLinksInSelection(this.props.getEditorState());
  }

  render() {
    return <LinkButton onClick={this.onClick} isActive={this.isActive} />;
  }
}

export default TextLinkButton;
