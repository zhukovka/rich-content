import React from 'react';
import TextAlignmentButton from './TextAlignmentButton';
import TextLinkButton from './TextLinkButton';
import BoldIcon from '../icons/bold.svg';
import ItalicIcon from '../icons/italic.svg';
import TitleIcon from '../icons/title.svg';
import BlockquoteIcon from '../icons/block-quote.svg';
import OrderedListIcon from '../icons/ordered-list.svg';
import UnorderedListIcon from '../icons/unordered-list.svg';
import createTextInlineStyleButton from './utils/createTextInlineStyleButton';
import createTextBlockStyleButton from './utils/createTextBlockStyleButton';

export const TextButtonList = [
  'Bold',
  'Italic',
  'Title',
  'Blockquote',
  'Separator',
  'Alignment',
  'OrderedList',
  'UnorderedList',
  'Separator',
  'Link',
];

export { TextAlignmentButton };

export { TextLinkButton };

export const BoldButton = createTextInlineStyleButton({
  style: 'BOLD',
  Icon: BoldIcon,
});

export const ItalicButton = createTextInlineStyleButton({
  style: 'ITALIC',
  Icon: ItalicIcon,
});

export const TitleButton = createTextBlockStyleButton({
  blockType: 'header-two',
  Icon: TitleIcon,
});

export const BlockquoteButton = createTextBlockStyleButton({
  blockType: 'blockquote',
  Icon: BlockquoteIcon,
});

export const OrderedListButton = createTextBlockStyleButton({
  blockType: 'ordered-list-item',
  Icon: OrderedListIcon,
});

export const UnorderedListButton = createTextBlockStyleButton({
  blockType: 'unordered-list-item',
  Icon: UnorderedListIcon,
});
