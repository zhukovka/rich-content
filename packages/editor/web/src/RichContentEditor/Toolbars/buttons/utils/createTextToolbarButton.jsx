import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RichUtils, setTextAlignment } from 'wix-rich-content-editor-common';
import TextButton from '../TextButton';
import { BUTTON_STYLES } from '../consts';

/*
  createTextToolbarButton
*/
export default ({ type, styles, icons, inactiveIcon = null, tooltipTextKey }) =>
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
      this.state = this.propsToState();
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.isVisible === false && nextProps.isVisible === true) {
        const { selectionBlockType } = this;
        const blockTypeFoundIndex = styles.findIndex(b => b === selectionBlockType);
        const blockTypeIndex = blockTypeFoundIndex > -1 ? blockTypeFoundIndex : undefined;
        this.setState({ blockTypeIndex });
      }
    }

    propsToState = () => (type === BUTTON_STYLES.BLOCK ? { blockTypeIndex: undefined } : {});

    get activeBlockType() {
      const { blockTypeIndex } = this.state;
      return blockTypeIndex !== undefined ? styles[blockTypeIndex] : 'unstyled';
    }

    get selectionBlockType() {
      const { getEditorState } = this.props;
      if (!getEditorState) {
        return false;
      }
      const editorState = getEditorState();
      return editorState
        .getCurrentContent()
        .getBlockForKey(editorState.getSelection().getStartKey())
        .getType();
    }

    get icon() {
      const { blockTypeIndex } = this.state;
      if (blockTypeIndex !== undefined) {
        return icons[blockTypeIndex];
      } else {
        return inactiveIcon ? inactiveIcon : icons[0];
      }
    }

    nextBlockTypeIndex = () => {
      const blockType = this.activeBlockType;
      let nextBlockTypeIndex = 0;
      if (blockType) {
        const blockTypeIndex = styles.findIndex(t => t === blockType);
        if (blockTypeIndex + 1 < styles.length) {
          nextBlockTypeIndex = blockTypeIndex + 1;
        } else {
          nextBlockTypeIndex = -1;
        }
      }
      return nextBlockTypeIndex > -1 ? nextBlockTypeIndex : undefined;
    };

    onBlockStyleClick = event => {
      event.preventDefault();
      const { getEditorState, setEditorState } = this.props;
      const blockTypeIndex = this.nextBlockTypeIndex();
      this.setState({ blockTypeIndex }, () => {
        const blockType = this.activeBlockType;
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
      const { getEditorState, setEditorState } = this.props;
      event.preventDefault();
      setEditorState(RichUtils.toggleInlineStyle(getEditorState(), styles[0]));
    };

    isActiveBlockType = () =>
      typeof this.blockType !== 'undefined' && this.blockType === this.activeBlockType;

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
        [BUTTON_STYLES.BLOCK]: this.isActiveBlockType(),
        [BUTTON_STYLES.INLINE]: this.isActiveInlineStyle(),
        [BUTTON_STYLES.ALIGNMENT]: this.isActiveAlignment(),
      }[type]);

    onClick = e =>
      ({
        [BUTTON_STYLES.BLOCK]: this.onBlockStyleClick(e),
        [BUTTON_STYLES.INLINE]: this.onInlineStyleClick(e),
        [BUTTON_STYLES.ALIGNMENT]: this.onAlignmentClick(e),
      }[type]);

    getDataHook = () =>
      ({
        [BUTTON_STYLES.BLOCK]: `textBlockStyleButton_${this.activeBlockType}`,
        [BUTTON_STYLES.INLINE]: `textInlineStyleButton_${styles[0]}`,
        [BUTTON_STYLES.ALIGNMENT]: `textAlignmentButton_${styles[0]}`,
      }[type]);

    getIcon = () =>
      ({
        [BUTTON_STYLES.BLOCK]: this.icon,
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
          shouldRefreshTooltips={!!this.props.shouldRefreshTooltips}
        />
      );
    }
  };
