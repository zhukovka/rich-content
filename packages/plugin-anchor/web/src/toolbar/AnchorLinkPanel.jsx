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
    const anchorData = getLinkDataInSelection(getEditorState());
    const { name, target } = anchorData || {};
    const anchorsEntities = getEntityByType(getEditorState(), 'wix-draft-plugin-anchor');
    const targetBlank = target ? target === '_blank' : anchorTarget === '_blank';
    const anchorContainerProps = {
      anchorsEntities,
      name,
      targetBlank,
      theme,
      anchorTarget,
      relValue,
      t,
      isActive: !isEmpty(anchorData) && !isEmpty(anchorData.name),
      onDone: this.createAnchorEntity,
      onCancel: this.hideAnchorPanel,
      onDelete: this.deleteAnchor,
      onOverrideContent: this.props.onOverrideContent,
      uiSettings,
    };

    const AnchorPanelContainerWithProps = decorateComponentWithProps(
      AnchorPanelContainer,
      anchorContainerProps
    );
    this.props.onOverrideContent(AnchorPanelContainerWithProps);
  }

  createAnchorEntity = ({ name }) => {
    const { anchorTarget } = this.props;
    if (!isEmpty(name)) {
      const { getEditorState, setEditorState } = this.props;
      const newEditorState = insertAnchorAtCurrentSelection(getEditorState(), {
        name,
        anchorTarget,
      });
      setEditorState(newEditorState);
    }
    this.hideAnchorPanel();
  };

  deleteAnchor = () => {
    const { getEditorState, setEditorState } = this.props;
    const editorState = getEditorState();
    const selection = editorState.getSelection();
    const newEditorState = removeLinksInSelection(editorState, 'wix-draft-plugin-anchor');
    setEditorState(EditorState.acceptSelection(newEditorState, selection));
  };

  hideAnchorPanel = () => {
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
