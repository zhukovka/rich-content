import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { insertLink } from '~/Utils';
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
  };

  render() {
    return <LinkPanel onDone={this.createLinkEntity} onCancel={this.hideLinkPanel} />;
  }
}

TextLinkPanel.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  onExtendContent: PropTypes.func.isRequired,
  theme: PropTypes.object,
};
