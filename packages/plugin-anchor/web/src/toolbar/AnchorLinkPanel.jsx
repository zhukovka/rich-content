import { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import { isEmpty } from 'lodash';
import {
  insertAnchorAtCurrentSelection,
  getLinkDataInSelection,
  removeLinksInSelection,
  AnchorPanelContainer,
  decorateComponentWithProps,
  getEntityByType,
} from 'wix-rich-content-editor-common';

export default class AnchorLinkPanel extends Component {
  componentDidMount() {
    const { anchorTarget, relValue, getEditorState, theme, t, uiSettings } = this.props;
    const linkData = getLinkDataInSelection(getEditorState());
    const { name, target } = linkData || {};
    const anchorsEntities = getEntityByType(getEditorState(), 'wix-draft-plugin-anchor');
    const targetBlank = target ? target === '_blank' : anchorTarget === '_blank';
    const linkContainerProps = {
      anchorsEntities,
      name,
      targetBlank,
      theme,
      anchorTarget,
      relValue,
      t,
      isActive: !isEmpty(linkData),
      onDone: this.createLinkEntity,
      onCancel: this.hideLinkPanel,
      onDelete: this.deleteLink,
      onOverrideContent: this.props.onOverrideContent,
      uiSettings,
    };

    const LinkPanelContainerWithProps = decorateComponentWithProps(
      AnchorPanelContainer,
      linkContainerProps
    );
    this.props.onOverrideContent(LinkPanelContainerWithProps);
  }

  createLinkEntity = ({ name }) => {
    const { anchorTarget } = this.props;
    if (!isEmpty(name)) {
      const { getEditorState, setEditorState } = this.props;
      const newEditorState = insertAnchorAtCurrentSelection(getEditorState(), {
        name,
        anchorTarget,
      });
      setEditorState(newEditorState);
    }
    this.hideLinkPanel();
  };

  deleteLink = () => {
    const { getEditorState, setEditorState } = this.props;
    const editorState = getEditorState();
    const selection = editorState.getSelection();
    const newEditorState = removeLinksInSelection(editorState, 'wix-draft-plugin-anchor');
    setEditorState(EditorState.acceptSelection(newEditorState, selection));
  };

  hideLinkPanel = () => {
    this.props.onExtendContent(undefined);
    this.props.onOverrideContent(undefined);
  };

  render() {
    return false;
  }
}

AnchorLinkPanel.propTypes = {
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
