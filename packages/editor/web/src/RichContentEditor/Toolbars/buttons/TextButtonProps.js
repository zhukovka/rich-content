/* eslint-disable */
import { HEADER_BLOCK } from 'wix-rich-content-common';
import {
  AlignLeftIcon,
  AlignTextCenterIcon,
  AlignRightIcon,
  AlignJustifyIcon,
} from 'wix-rich-content-editor-common';
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  BlockQuoteIcon,
  TitleIcon,
  TitleOneIcon,
  TitleTwoIcon,
  OrderedListIcon,
  UnorderedListIcon,
} from '../../Icons';
import generateTextButtonProps from './utils/generateTextToolbarButtonProps';
import { BUTTON_STYLES } from './consts';
export const boldButtonProps = ({
  icon,
  t,
  getEditorState,
  setEditorState,
  externalOnClick,
  alignment,
}) =>
  generateTextButtonProps({
    styles: ['BOLD'],
    type: BUTTON_STYLES.INLINE,
    icons: [icon || BoldIcon],
    tooltipTextKey: 'BoldButton_Tooltip',
    t,
    getEditorState,
    setEditorState,
    externalOnClick,
    alignment,
  });

export const italicButtonProps = ({
  icon,
  t,
  getEditorState,
  setEditorState,
  externalOnClick,
  alignment,
}) =>
  generateTextButtonProps({
    styles: ['ITALIC'],
    type: BUTTON_STYLES.INLINE,
    icons: [icon || ItalicIcon],
    tooltipTextKey: 'ItalicButton_Tooltip',
    t,
    getEditorState,
    setEditorState,
    externalOnClick,
    alignment,
  });

export const underlineButtonProps = ({
  icon,
  t,
  getEditorState,
  setEditorState,
  externalOnClick,
  alignment,
}) =>
  generateTextButtonProps({
    styles: ['UNDERLINE'],
    type: BUTTON_STYLES.INLINE,
    icons: [icon || UnderlineIcon],
    tooltipTextKey: 'UnderlineButton_Tooltip',
    t,
    getEditorState,
    setEditorState,
    externalOnClick,
    alignment,
  });

export const titleButtonProps = (inactiveIconTitle, iconForTitleOne, iconForTitleTwo) =>
  generateTextButtonProps({
    styles: ['unstyled', HEADER_BLOCK.TWO, HEADER_BLOCK.THREE],
    type: BUTTON_STYLES.BLOCK,
    icons: [
      inactiveIconTitle || TitleIcon,
      iconForTitleOne || TitleOneIcon,
      iconForTitleTwo || TitleTwoIcon,
    ],
    tooltipTextKey: 'TitleButton_Tooltip',
    t,
    getEditorState,
    setEditorState,
    externalOnClick,
    alignment,
  });

export const blockquoteButtonProps = ({
  icon,
  t,
  getEditorState,
  setEditorState,
  externalOnClick,
  alignment,
}) =>
  generateTextButtonProps({
    styles: ['blockquote'],
    type: BUTTON_STYLES.BLOCK,
    icons: [icon || BlockQuoteIcon],
    tooltipTextKey: 'QuoteButton_Tooltip',
    t,
    getEditorState,
    setEditorState,
    externalOnClick,
    alignment,
  });

export const alignTextLeftButtonProps = ({
  icon,
  t,
  getEditorState,
  setEditorState,
  externalOnClick,
  alignment,
}) =>
  generateTextButtonProps({
    type: BUTTON_STYLES.ALIGNMENT,
    styles: ['left'],
    icons: [icon || AlignLeftIcon],
    tooltipTextKey: 'AlignTextLeftButton_Tooltip',
    t,
    getEditorState,
    setEditorState,
    externalOnClick,
    alignment,
  });

export const alignTextCenterButtonProps = ({
  icon,
  t,
  getEditorState,
  setEditorState,
  externalOnClick,
  alignment,
}) =>
  generateTextButtonProps({
    type: BUTTON_STYLES.ALIGNMENT,
    styles: ['center'],
    icons: [icon || AlignTextCenterIcon],
    tooltipTextKey: 'AlignTextCenterButton_Tooltip',
    t,
    getEditorState,
    setEditorState,
    externalOnClick,
    alignment,
  });

export const alignTextRightButtonProps = ({
  icon,
  t,
  getEditorState,
  setEditorState,
  externalOnClick,
  alignment,
}) =>
  generateTextButtonProps({
    type: BUTTON_STYLES.ALIGNMENT,
    styles: ['right'],
    icons: [icon || AlignRightIcon],
    tooltipTextKey: 'AlignTextRightButton_Tooltip',
    t,
    getEditorState,
    setEditorState,
    externalOnClick,
    alignment,
  });

export const alignTextJustifyButtonProps = ({
  icon,
  t,
  getEditorState,
  setEditorState,
  externalOnClick,
  alignment,
}) =>
  generateTextButtonProps({
    styles: ['justify'],
    type: BUTTON_STYLES.ALIGNMENT,
    icons: [icon || AlignJustifyIcon],
    tooltipTextKey: 'AlignTextJustifyButton_Tooltip',
    t,
    getEditorState,
    setEditorState,
    externalOnClick,
    alignment,
  });

export const orderedListButtonProps = ({
  icon,
  t,
  getEditorState,
  setEditorState,
  externalOnClick,
  alignment,
}) =>
  generateTextButtonProps({
    styles: ['ordered-list-item'],
    type: BUTTON_STYLES.BLOCK,
    icons: [icon || OrderedListIcon],
    tooltipTextKey: 'OrderedListButton_Tooltip',
    t,
    getEditorState,
    setEditorState,
    externalOnClick,
    alignment,
  });

export const unorderedListButtonProps = ({
  icon,
  t,
  getEditorState,
  setEditorState,
  externalOnClick,
  alignment,
}) =>
  generateTextButtonProps({
    styles: ['unordered-list-item'],
    type: BUTTON_STYLES.BLOCK,
    icons: [icon || UnorderedListIcon],
    tooltipTextKey: 'UnorderedListButton_Tooltip',
    t,
    getEditorState,
    setEditorState,
    externalOnClick,
    alignment,
  });
