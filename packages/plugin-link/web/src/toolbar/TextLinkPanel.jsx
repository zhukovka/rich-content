import { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState } from '@wix/draft-js';
import { isEmpty } from 'lodash';
import {
  insertLinkAtCurrentSelection,
  getLinkDataInSelection,
  removeLinksInSelection,
  NewLinkPanelContainer,
  decorateComponentWithProps,
} from 'wix-rich-content-editor-common';

export default class TextLinkPanel extends Component {
  componentDidMount() {
    const {
      anchorTarget,
      relValue,
      getEditorState,
      setEditorState,
      theme,
      t,
      uiSettings,
    } = this.props;
    const linkData = getLinkDataInSelection(getEditorState());
    const { url, target, rel } = linkData || {};
    const targetBlank = target ? target === '_blank' : anchorTarget === '_blank';
    const nofollow = rel ? rel === 'nofollow' : relValue === 'nofollow';
    const linkContainerProps = {
      getEditorState,
      setEditorState,
      url,
      targetBlank,
      nofollow,
      theme,
      anchorTarget,
      relValue,
      t,
      isActive: !isEmpty(linkData),
      onDone: this.createLinkEntity,
      onCancel: this.onCancel,
      hidePanel: this.hideLinkPanel,
      onDelete: this.deleteLink,
      onOverrideContent: this.props.onOverrideContent,
      uiSettings,
    };

    const LinkPanelContainerWithProps = decorateComponentWithProps(
      NewLinkPanelContainer,
      linkContainerProps
    );
    this.props.onOverrideContent(LinkPanelContainerWithProps);
  }

  createLinkEntity = ({ url, targetBlank, nofollow, linkToAnchor, defaultName }) => {
    const { anchorTarget: _anchorTarget, relValue } = this.props;
    const anchorTarget = linkToAnchor ? '_self' : _anchorTarget;
    if (!isEmpty(url)) {
      const { getEditorState, setEditorState } = this.props;
      const newEditorState = insertLinkAtCurrentSelection(getEditorState(), {
        url,
        targetBlank,
        nofollow,
        anchorTarget,
        relValue,
        defaultName,
      });
      setEditorState(newEditorState);
    }
    this.hideLinkPanel();
  };

  deleteLink = () => {
    const { getEditorState, setEditorState } = this.props;
    const editorState = getEditorState();
    const newEditorState = removeLinksInSelection(editorState, setEditorState);
    setEditorState(newEditorState);
  };

  onCancel = () => {
    const { getEditorState, setEditorState } = this.props;
    const editorState = getEditorState();
    const selection = editorState.getSelection();
    const newEditorState = EditorState.forceSelection(
      editorState,
      selection.merge({ anchorOffset: selection.focusOffset })
    );
    setEditorState(newEditorState);
    this.hideLinkPanel();
  };

  hideLinkPanel = () => {
    this.props.onExtendContent(undefined);
    this.props.onOverrideContent(undefined);
  };

  render() {
    return false;
  }
}

TextLinkPanel.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  onExtendContent: PropTypes.func.isRequired,
  onOverrideContent: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
  t: PropTypes.func,
  uiSettings: PropTypes.object,
};
