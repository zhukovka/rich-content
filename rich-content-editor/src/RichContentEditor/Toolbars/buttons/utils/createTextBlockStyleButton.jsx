import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RichUtils } from '@wix/draft-js';
import { translate } from 'react-i18next';

import TextButton from '../TextButton';

export default ({ blockTypes, Icons, InactiveIcon = null, tooltipTextKey }) => {
  class TextBlockStyleButton extends Component {
    static propTypes = {
      getEditorState: PropTypes.func.isRequired,
      setEditorState: PropTypes.func.isRequired,
      theme: PropTypes.object.isRequired,
      isMobile: PropTypes.bool,
      t: PropTypes.func
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
      const { theme, isMobile, t } = this.props;
      const tooltipText = t(tooltipTextKey);
      let Icon;
      if (blockTypeIndex !== undefined) {
        Icon = Icons[blockTypeIndex];
      } else {
        Icon = InactiveIcon ? InactiveIcon : Icons[0];
      }
      return (
        <TextButton
          icon={Icon}
          theme={theme}
          isMobile={isMobile}
          isActive={this.blockTypeIsActive}
          onClick={this.setBlockStyle}
          tooltipText={tooltipText}
        />
      );
    }
  }

  return translate(null)(TextBlockStyleButton);
};
