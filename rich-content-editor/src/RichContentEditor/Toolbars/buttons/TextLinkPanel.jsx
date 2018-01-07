import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isempty';
import { insertLink } from '~/Utils';
import LinkPanel from '~/Common/LinkPanel';

export default class TextLinkPanel extends Component {

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

TextLinkPanel.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  onOverrideContent: PropTypes.func.isRequired,
  theme: PropTypes.object,
};
