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

export default {
  Bold: ({ icon, t, getEditorState, setEditorState, externalOnClick, alignment }) =>
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
    }),
  Italic: ({ icon, t, getEditorState, setEditorState, externalOnClick, alignment }) =>
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
    }),

  Underline: ({ icon, t, getEditorState, setEditorState, externalOnClick, alignment }) =>
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
    }),

  Title: ({ icons, t, getEditorState, setEditorState, externalOnClick, alignment }) =>
    generateTextButtonProps({
      styles: ['unstyled', HEADER_BLOCK.TWO, HEADER_BLOCK.THREE],
      type: BUTTON_STYLES.BLOCK,
      icons: [
        icons.inactiveIconTitle || TitleIcon,
        icons.iconForTitleOne || TitleOneIcon,
        icons.iconForTitleTwo || TitleTwoIcon,
      ],
      tooltipTextKey: 'TitleButton_Tooltip',
      t,
      getEditorState,
      setEditorState,
      externalOnClick,
      alignment,
    }),

  Blockquote: ({ icon, t, getEditorState, setEditorState, externalOnClick, alignment }) =>
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
    }),

  AlignLeft: ({ icon, t, getEditorState, setEditorState, externalOnClick, alignment }) =>
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
    }),

  AlignCenter: ({ icon, t, getEditorState, setEditorState, externalOnClick, alignment }) =>
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
    }),

  AlignRight: ({ icon, t, getEditorState, setEditorState, externalOnClick, alignment }) =>
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
    }),

  AlignJustify: ({ icon, t, getEditorState, setEditorState, externalOnClick, alignment }) =>
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
    }),

  OrderedList: ({ icon, t, getEditorState, setEditorState, externalOnClick, alignment }) =>
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
    }),

  UnorderedList: ({ icon, t, getEditorState, setEditorState, externalOnClick, alignment }) =>
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
    }),
};
