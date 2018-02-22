import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RichUtils } from '@wix/draft-js';
import TextButton from '../TextButton';

export default ({ blockType, Icon }) =>
  class TextBlockStyleButton extends Component {
    static propTypes = {
      getEditorState: PropTypes.func.isRequired,
      setEditorState: PropTypes.func.isRequired,
      theme: PropTypes.object.isRequired,
    };

    toggleStyle = event => {
      const { getEditorState, setEditorState } = this.props;
      event.preventDefault();
      setEditorState(RichUtils.toggleBlockType(getEditorState(), blockType));
    };

    blockTypeIsActive = () => {
      const { getEditorState } = this.props;
      if (!getEditorState) {
        return false;
      }

      const editorState = getEditorState();
      const type = editorState
        .getCurrentContent()
        .getBlockForKey(editorState.getSelection().getStartKey())
        .getType();
      return type === blockType;
    };

    render() {
      const { theme } = this.props;
      return (
        <TextButton
          icon={Icon}
          theme={theme}
          isActive={this.blockTypeIsActive}
          onClick={this.toggleStyle}
        />
      );
    }
  };
