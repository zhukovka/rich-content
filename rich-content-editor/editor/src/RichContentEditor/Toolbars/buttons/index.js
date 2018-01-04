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

export { TextAlignmentButton };

export { TextLinkButton };

export const BoldButton = createTextInlineStyleButton({
  style: 'BOLD',
  content: <BoldIcon />
});

export const ItalicButton = createTextInlineStyleButton({
  style: 'ITALIC',
  content: <ItalicIcon />
});

export const TitleButton = createTextBlockStyleButton({
  blockType: 'header-two',
  content: <TitleIcon />
});

export const BlockquoteButton = createTextBlockStyleButton({
  blockType: 'blockquote',
  content: <BlockquoteIcon />
});

export const OrderedListButton = createTextBlockStyleButton({
  blockType: 'ordered-list-item',
  content: <OrderedListIcon />
});

export const UnorderedListButton = createTextBlockStyleButton({
  blockType: 'unordered-list-item',
  content: <UnorderedListIcon />
});
