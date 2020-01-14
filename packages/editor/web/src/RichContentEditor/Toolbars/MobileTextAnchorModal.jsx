import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import { isEmpty } from 'lodash';
import {
  insertAnchorAtCurrentSelection,
  getLinkDataInSelection,
  removeLinksInSelection,
  getEntityByType,
} from 'wix-rich-content-editor-common';
import MobileAnchorModal from './MobileAnchorModal';

export default class MobileTextAnchorModal extends Component {
  constructor(props) {
    super(props);
    const { getEditorState } = props;
    this.anchorsEntities = getEntityByType(getEditorState(), 'wix-draft-plugin-anchor');
  }

  hidePopup = () => this.props.hidePopup();

  createLinkEntity = ({ name }) => {
    if (!isEmpty(name)) {
      const { getEditorState, setEditorState, anchorTarget } = this.props;
      const newEditorState = insertAnchorAtCurrentSelection(getEditorState(), {
        name,
        anchorTarget,
      });
      setEditorState(newEditorState);
    }
    this.hidePopup();
  };

  deleteLink = () => {
    const { getEditorState, setEditorState } = this.props;
    const editorState = getEditorState();
    const selection = editorState.getSelection();
    const newEditorState = removeLinksInSelection(editorState, 'wix-draft-plugin-anchor');
    setEditorState(EditorState.acceptSelection(newEditorState, selection));
  };

  render() {
    const { getEditorState, theme, isMobile, anchorTarget, relValue, t, uiSettings } = this.props;
    const linkData = getLinkDataInSelection(getEditorState());
    const { name, target, rel } = linkData || {};
    const targetBlank = target ? target === '_blank' : anchorTarget === '_blank';
    const nofollow = rel ? rel === 'nofollow' : relValue === 'nofollow';
    return (
      <MobileAnchorModal
        anchorsEntities={this.anchorsEntities}
        name={name}
        targetBlank={targetBlank}
        nofollow={nofollow}
        theme={theme}
        isActive={!isEmpty(linkData)}
        isMobile={isMobile}
        anchorTarget={anchorTarget}
        relValue={relValue}
        onDone={this.createLinkEntity}
        onCancel={this.hidePopup}
        onDelete={this.deleteLink}
        uiSettings={uiSettings}
        t={t}
      />
    );
  }
}

MobileTextAnchorModal.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  hidePopup: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  url: PropTypes.string,
  isMobile: PropTypes.bool,
  targetBlank: PropTypes.bool,
  nofollow: PropTypes.bool,
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
  t: PropTypes.func,
  uiSettings: PropTypes.object,
};
