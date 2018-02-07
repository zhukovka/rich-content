import BoldIcon from '../icons/bold.svg';
import ItalicIcon from '../icons/italic.svg';
import UnderlineIcon from '../icons/underline.svg';
import TitleIcon from '../icons/title.svg';
import BlockquoteIcon from '../icons/block-quote.svg';
import OrderedListIcon from '../icons/ordered-list.svg';
import UnorderedListIcon from '../icons/unordered-list.svg';
import createTextInlineStyleButton from './utils/createTextInlineStyleButton';
import createTextBlockStyleButton from './utils/createTextBlockStyleButton';

export const TextButtonList = [
  'Bold',
  'Italic',
  'Underline',
  'Title',
  'Blockquote',
  'Separator',
  'Alignment',
  'OrderedList',
  'UnorderedList',
  'Separator',
  'Link',
];

export { default as TextAlignmentButton } from './TextAlignmentButton';
export { default as TextLinkButton } from './TextLinkButton';
export { default as AddPluginButton } from './AddPluginButton';

export const BoldButton = createTextInlineStyleButton({
  style: 'BOLD',
  Icon: BoldIcon,
});

export const ItalicButton = createTextInlineStyleButton({
  style: 'ITALIC',
  Icon: ItalicIcon,
});

export const UnderlineButton = createTextInlineStyleButton({
  style: 'UNDERLINE',
  Icon: UnderlineIcon,
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
