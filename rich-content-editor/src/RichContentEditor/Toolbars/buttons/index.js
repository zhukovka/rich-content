import BoldIcon from '../icons/bold.svg';
import ItalicIcon from '../icons/italic.svg';
import UnderlineIcon from '../icons/underline.svg';
import IndentIcon from '../icons/indent.svg';
import TitleIcon from '../icons/title.svg';
import TitleOneIcon from '../icons/title-one.svg';
import TitleTwoIcon from '../icons/title-two.svg';
import BlockquoteIcon from '../icons/block-quote.svg';
import AlignTextLeftIcon from '../icons/align-text-left.svg';
import AlignTextCenterIcon from '../icons/align-text-center.svg';
import AlignTextRightIcon from '../icons/align-text-right.svg';
import AlignTextJustifyIcon from '../icons/align-text-justify.svg';
import OrderedListIcon from '../icons/ordered-list.svg';
import UnorderedListIcon from '../icons/unordered-list.svg';
import createTextInlineStyleButton from './utils/createTextInlineStyleButton';
import createTextBlockStyleButton from './utils/createTextBlockStyleButton';
import createTextAlignmentButton from './utils/createTextAlignmentButton';

export const DesktopTextButtonList = [
  'Bold',
  'Italic',
  'Underline',
  'Title',
  'Blockquote',
  'Separator',
  'Alignment',
  'OrderedList',
  'UnorderedList',
  // 'Indent',
  'Separator',
  'Link',
];

export const MobileTextButtonList = [
  'Bold',
  'Italic',
  'Underline',
  'Title',
  'Blockquote',
  'Link',
  'AddPlugin',
  'AlignLeft',
  'AlignCenter',
  'AlignRight',
  'AlignJustify',
  'OrderedList',
  'UnorderedList',
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

export const IndentButton = createTextBlockStyleButton({
  blockTypes: ['indent'],
  Icons: [IndentIcon],
});

export const TitleButton = createTextBlockStyleButton({
  blockTypes: ['header-one', 'header-two'],
  Icons: [TitleOneIcon, TitleTwoIcon],
  InactiveIcon: TitleIcon,
});

export const BlockquoteButton = createTextBlockStyleButton({
  blockTypes: ['blockquote'],
  Icons: [BlockquoteIcon],
});

export const AlignTextLeftButton = createTextAlignmentButton({
  alignment: 'left',
  Icon: AlignTextLeftIcon
});

export const AlignTextCenterButton = createTextAlignmentButton({
  alignment: 'center',
  Icon: AlignTextCenterIcon
});

export const AlignTextRightButton = createTextAlignmentButton({
  alignment: 'right',
  Icon: AlignTextRightIcon
});

export const AlignTextJustifyButton = createTextAlignmentButton({
  alignment: 'justify',
  Icon: AlignTextJustifyIcon
});

export const OrderedListButton = createTextBlockStyleButton({
  blockTypes: ['ordered-list-item'],
  Icons: [OrderedListIcon],
});

export const UnorderedListButton = createTextBlockStyleButton({
  blockTypes: ['unordered-list-item'],
  Icons: [UnorderedListIcon],
});
