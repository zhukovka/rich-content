import { BUTTON_STYLES } from '../consts';
import { RichUtils, setTextAlignment } from 'wix-rich-content-editor-common';

export default ({
  type,
  styles,
  icons,
  inactiveIcon,
  tooltipKey,
  t,
  getEditorState,
  setEditorState,
  externalOnClick,
  alignment,
}) => {
  let blockTypeIndex;

  function activeBlockType() {
    return blockTypeIndex !== undefined ? styles[blockTypeIndex] : 'unstyled';
  }

  function selectionBlockType() {
    if (!getEditorState) {
      return false;
    }
    const editorState = getEditorState();
    return editorState
      .getCurrentContent()
      .getBlockForKey(editorState.getSelection().getStartKey())
      .getType();
  }

  function icon() {
    if (blockTypeIndex !== undefined) {
      return icons[blockTypeIndex];
    } else {
      return inactiveIcon ? inactiveIcon : icons[0];
    }
  }

  const nextBlockTypeIndex = () => {
    const blockType = activeBlockType();
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

  const onBlockStyleClick = event => {
    event.preventDefault();
    blockTypeIndex = nextBlockTypeIndex();
    const blockType = activeBlockType();
    setEditorState(RichUtils.toggleBlockType(getEditorState(), blockType));
  };

  const onAlignmentClick = () => {
    if (externalOnClick) {
      externalOnClick(styles[0]);
    } else {
      const newEditorState = setTextAlignment(getEditorState(), styles[0]);
      setEditorState(newEditorState);
    }
  };

  const onInlineStyleClick = event => {
    event.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(getEditorState(), styles[0]));
  };

  function isActiveBlockType() {
    return typeof this.blockType !== 'undefined' && this.blockType === this.activeBlockType;
  }

  const isActiveAlignment = () => alignment === styles[0];

  const isActiveInlineStyle = () => {
    if (getEditorState) {
      return getEditorState()
        .getCurrentInlineStyle()
        .has(styles[0]);
    } else {
      return false;
    }
  };

  const isActive = () =>
    ({
      [BUTTON_STYLES.BLOCK]: isActiveBlockType,
      [BUTTON_STYLES.INLINE]: isActiveInlineStyle,
      [BUTTON_STYLES.ALIGNMENT]: isActiveAlignment,
    }[type]());

  const onClick = e =>
    ({
      [BUTTON_STYLES.BLOCK]: onBlockStyleClick,
      [BUTTON_STYLES.INLINE]: onInlineStyleClick,
      [BUTTON_STYLES.ALIGNMENT]: onAlignmentClick,
    }[type](e));

  const getIcon = () =>
    ({
      [BUTTON_STYLES.BLOCK]: icon(),
      [BUTTON_STYLES.INLINE]: icons[0],
      [BUTTON_STYLES.ALIGNMENT]: icons[0],
    }[type]);

  return {
    tooltip: t(tooltipKey),
    name,
    onClick,
    isActive,
    isDisabled,
    label,
    buttonType: 'button',
  };
};
