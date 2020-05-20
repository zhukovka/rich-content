import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RichUtils, setTextAlignment } from 'wix-rich-content-editor-common';
import TextButton from '../TextButton';
import { BUTTON_STYLES } from '../consts';

/*
  createTextToolbarButton
*/
export default ({ type, styles, icons, tooltipTextKey }) =>
  class TextToolbarButton extends Component {
    static propTypes = {
      getEditorState: PropTypes.func.isRequired,
      setEditorState: PropTypes.func.isRequired,
      theme: PropTypes.object.isRequired,
      isVisible: PropTypes.bool,
      isMobile: PropTypes.bool,
      t: PropTypes.func,
      tabIndex: PropTypes.number,
      alignment: PropTypes.string,
      onClick: PropTypes.func,
      shouldRefreshTooltips: PropTypes.bool,
    };

    constructor(props) {
      super(props);
      this.state = { blockTypeIndex: -1 };
    }

    componentWillReceiveProps(nextProps) {
      if (
        type === BUTTON_STYLES.BLOCK &&
        this.props.isVisible === false &&
        nextProps.isVisible === true
      ) {
        const selectedBlockType = this.getSelectedBlockType();
        const blockTypeIndex = styles.findIndex(b => b === selectedBlockType);
        this.setState({ blockTypeIndex });
      }
    }

    getActiveBlockType = () => styles[this.state.blockTypeIndex] || 'unstyled';

    getSelectedBlockType() {
      const editorState = this.props.getEditorState();
      const blockKey = editorState.getSelection().getStartKey();
      return editorState
        .getCurrentContent()
        .getBlockForKey(blockKey)
        .getType();
    }

    getCurrentIcon = () => icons[this.state.blockTypeIndex] || icons[0];

    getNextBlockTypeIndex = () => {
      const blockType = this.getActiveBlockType();
      const styleIndex = styles.findIndex(t => t === blockType);
      return styleIndex !== -1 ? (styleIndex + 1) % styles.length : 0;
    };

    onBlockStyleClick = event => {
      event.preventDefault();
      const { getEditorState, setEditorState } = this.props;
      const blockTypeIndex = this.getNextBlockTypeIndex();
      this.setState({ blockTypeIndex }, () => {
        const blockType = this.getActiveBlockType();
        setEditorState(RichUtils.toggleBlockType(getEditorState(), blockType));
      });
    };

    onAlignmentClick = () => {
      const { onClick, getEditorState, setEditorState } = this.props;
      if (onClick) {
        onClick(styles[0]);
      } else {
        const newEditorState = setTextAlignment(getEditorState(), styles[0]);
        setEditorState(newEditorState);
      }
    };

    onInlineStyleClick = event => {
      event.preventDefault();
      const { getEditorState, setEditorState } = this.props;
      setEditorState(RichUtils.toggleInlineStyle(getEditorState(), styles[0]));
    };

    isActiveBlockType() {
      return typeof this.blockType !== 'undefined' && this.blockType === this.getActiveBlockType();
    }

    isActiveAlignment = () => this.props.alignment === styles[0];

    isActiveInlineStyle = () => {
      const { getEditorState } = this.props;
      if (getEditorState) {
        return getEditorState()
          .getCurrentInlineStyle()
          .has(styles[0]);
      } else {
        return false;
      }
    };

    isActive = () =>
      ({
        [BUTTON_STYLES.BLOCK]: this.isActiveBlockType,
        [BUTTON_STYLES.INLINE]: this.isActiveInlineStyle,
        [BUTTON_STYLES.ALIGNMENT]: this.isActiveAlignment,
      }[type]());

    onClick = e =>
      ({
        [BUTTON_STYLES.BLOCK]: this.onBlockStyleClick,
        [BUTTON_STYLES.INLINE]: this.onInlineStyleClick,
        [BUTTON_STYLES.ALIGNMENT]: this.onAlignmentClick,
      }[type](e));

    getDataHook = () =>
      ({
        [BUTTON_STYLES.BLOCK]: `textBlockStyleButton_${this.getActiveBlockType()}`,
        [BUTTON_STYLES.INLINE]: `textInlineStyleButton_${styles[0]}`,
        [BUTTON_STYLES.ALIGNMENT]: `textAlignmentButton_${styles[0]}`,
      }[type]);

    getIcon = () =>
      ({
        [BUTTON_STYLES.BLOCK]: this.getCurrentIcon(),
        [BUTTON_STYLES.INLINE]: icons[0],
        [BUTTON_STYLES.ALIGNMENT]: icons[0],
      }[type]);

    render() {
      const Icon = this.getIcon();
      const { theme, isMobile, t, tabIndex } = this.props;
      const tooltipText = t(tooltipTextKey);
      return (
        <TextButton
          icon={Icon}
          theme={theme}
          isMobile={isMobile}
          isActive={this.isActive}
          onClick={this.onClick}
          tooltipText={tooltipText}
          dataHook={this.getDataHook()}
          tabIndex={tabIndex}
          shouldRefreshTooltips={this.props.shouldRefreshTooltips}
        />
      );
    }
  };
