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
import createTextToolbarButton from './utils/createTextToolbarButton';
import { BUTTON_STYLES } from './consts';
export const boldButton = icon =>
  createTextToolbarButton({
    styles: ['BOLD'],
    type: BUTTON_STYLES.INLINE,
    icons: [icon || BoldIcon],
    tooltipTextKey: 'BoldButton_Tooltip',
  });

export const italicButton = icon =>
  createTextToolbarButton({
    styles: ['ITALIC'],
    type: BUTTON_STYLES.INLINE,
    icons: [icon || ItalicIcon],
    tooltipTextKey: 'ItalicButton_Tooltip',
  });

export const underlineButton = icon =>
  createTextToolbarButton({
    styles: ['UNDERLINE'],
    type: BUTTON_STYLES.INLINE,
    icons: [icon || UnderlineIcon],
    tooltipTextKey: 'UnderlineButton_Tooltip',
  });

export const titleButton = (inactiveIconTitle, iconForTitleOne, iconForTitleTwo) =>
  createTextToolbarButton({
    styles: [HEADER_BLOCK.TWO, HEADER_BLOCK.THREE],
    type: BUTTON_STYLES.BLOCK,
    icons: [iconForTitleOne || TitleOneIcon, iconForTitleTwo || TitleTwoIcon],
    inactiveIcon: inactiveIconTitle || TitleIcon,
    tooltipTextKey: 'TitleButton_Tooltip',
  });

export const blockquoteButton = icon =>
  createTextToolbarButton({
    styles: ['blockquote'],
    type: BUTTON_STYLES.BLOCK,
    icons: [icon || BlockQuoteIcon],
    tooltipTextKey: 'QuoteButton_Tooltip',
  });

export const alignTextLeftButton = icon =>
  createTextToolbarButton({
    type: BUTTON_STYLES.ALIGNMENT,
    styles: ['left'],
    icons: [icon || AlignLeftIcon],
    tooltipTextKey: 'AlignTextLeftButton_Tooltip',
  });

export const alignTextCenterButton = icon =>
  createTextToolbarButton({
    type: BUTTON_STYLES.ALIGNMENT,
    styles: ['center'],
    icons: [icon || AlignTextCenterIcon],
    tooltipTextKey: 'AlignTextCenterButton_Tooltip',
  });

export const alignTextRightButton = icon =>
  createTextToolbarButton({
    type: BUTTON_STYLES.ALIGNMENT,
    styles: ['right'],
    icons: [icon || AlignRightIcon],
    tooltipTextKey: 'AlignTextRightButton_Tooltip',
  });

export const alignTextJustifyButton = icon =>
  createTextToolbarButton({
    styles: ['justify'],
    type: BUTTON_STYLES.ALIGNMENT,
    icons: [icon || AlignJustifyIcon],
    tooltipTextKey: 'AlignTextJustifyButton_Tooltip',
  });

export const orderedListButton = icon =>
  createTextToolbarButton({
    styles: ['ordered-list-item'],
    type: BUTTON_STYLES.BLOCK,
    icons: [icon || OrderedListIcon],
    tooltipTextKey: 'OrderedListButton_Tooltip',
  });

export const unorderedListButton = icon =>
  createTextToolbarButton({
    styles: ['unordered-list-item'],
    type: BUTTON_STYLES.BLOCK,
    icons: [icon || UnorderedListIcon],
    tooltipTextKey: 'UnorderedListButton_Tooltip',
  });
