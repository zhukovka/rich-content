import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState } from '@wix/draft-js';
import isEmpty from 'lodash/isEmpty';
import { insertLink, getLinkDataInSelection, removeLinksInSelection } from '~/Utils';

import LinkIcon from './icons/link.svg';
import styles from '~/Styles/mobile-link-modal.scss';
import LinkPanelContainer from '~/Components/LinkPanelContainer';


export default class MobileTextLinkModal extends Component {
  hidePopup = () => this.props.hidePopup();

  createLinkEntity = ({ url, targetBlank, nofollow }) => {
    if (!isEmpty(url)) {
      const { getEditorState, setEditorState } = this.props;
      const newEditorState = insertLink(getEditorState(), { url, targetBlank, nofollow });
      setEditorState(newEditorState);
    }
    this.hidePopup();
  };

  deleteLink = () => {
    const { getEditorState, setEditorState } = this.props;
    const editorState = getEditorState();
    const selection = editorState.getSelection();
    const newEditorState = removeLinksInSelection(editorState);
    setEditorState(EditorState.acceptSelection(newEditorState, selection));
  }

  render() {
    const { getEditorState, theme, isMobile } = this.props;
    const linkData = getLinkDataInSelection(getEditorState());
    const { url, targetBlank, nofollow } = linkData || {};
    return (
      <div>
        <div className={styles.mobileLinkModal_titleContainer}>
          <div className={styles.mobileLinkModal_linkIconContainer} >
            <LinkIcon />
          </div>
          <h3 className={styles.mobileLinkModal_title}>Add a link</h3>
        </div>
        <LinkPanelContainer
          url={url}
          targetBlank={targetBlank}
          nofollow={nofollow}
          theme={theme}
          isActive={!isEmpty(linkData)}
          isMobile={isMobile}
          onDone={this.createLinkEntity}
          onCancel={this.hidePopup}
          onDelete={this.deleteLink}
        />
      </div>
    );
  }
}

MobileTextLinkModal.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  hidePopup: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  url: PropTypes.string,
  isMobile: PropTypes.bool,
  targetBlank: PropTypes.bool,
  nofollow: PropTypes.bool,
};
