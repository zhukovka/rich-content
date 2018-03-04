import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RichUtils } from '@wix/draft-js';
import TextButton from '../TextButton';

export default ({ blockTypes, Icons }) =>
  class TextBlockStyleButton extends Component {
    static propTypes = {
      getEditorState: PropTypes.func.isRequired,
      setEditorState: PropTypes.func.isRequired,
      theme: PropTypes.object.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        blockTypeIndex: undefined,
      };
    }

    get blockType() {
      const { blockTypeIndex } = this.state;
      return blockTypeIndex !== undefined ? blockTypes[blockTypeIndex] : undefined;
    }


    nextBlockTypeIndex = () => {
      const blockType = this.blockType;
      let nextBlockTypeIndex = 0;
      if (blockType) {
        const blockTypeIndex = blockTypes.findIndex(t => t === blockType);
        if (blockTypeIndex + 1 < blockTypes.length) {
          nextBlockTypeIndex = blockTypeIndex + 1;
        } else {
          nextBlockTypeIndex = -1;
        }
      }
      return nextBlockTypeIndex > -1 ? nextBlockTypeIndex : undefined;
    }

    setBlockStyle = event => {
      event.preventDefault();
      const { getEditorState, setEditorState } = this.props;
      const blockTypeIndex = this.nextBlockTypeIndex();
      this.setState({ blockTypeIndex }, () => {
        const blockType = this.blockType;
        setEditorState(RichUtils.toggleBlockType(getEditorState(), blockType));
      });
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
      return typeof type !== 'undefined' && type === this.blockType;
    };

    render() {
      const { blockTypeIndex } = this.state;
      const { theme } = this.props;
      const Icon = blockTypeIndex ? Icons[blockTypeIndex] : Icons[0];
      return (
        <TextButton
          icon={Icon}
          theme={theme}
          isActive={this.blockTypeIsActive}
          onClick={this.setBlockStyle}
        />
      );
    }
  };
