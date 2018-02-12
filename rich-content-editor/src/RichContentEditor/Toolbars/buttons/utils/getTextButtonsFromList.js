import {
  TextButtonList,
  BoldButton,
  ItalicButton,
  UnderlineButton,
  TitleButton,
  BlockquoteButton,
  TextAlignmentButton,
  UnorderedListButton,
  OrderedListButton,
  TextLinkButton,
} from '../index';
import createThemedSeparator from './createThemedSeparator';

export default ({ buttons = TextButtonList, theme }) => {
  const themedSeparator = horizontal => createThemedSeparator({ theme, horizontal });
  const structure = [];
  buttons.forEach(buttonName => {
    switch (buttonName) {
      case 'Bold':
        structure.push(BoldButton);
        break;
      case 'Italic':
        structure.push(ItalicButton);
        break;
      case 'Underline':
        structure.push(UnderlineButton);
        break;
      case 'Title':
        structure.push(TitleButton);
        break;
      case 'Blockquote':
        structure.push(BlockquoteButton);
        break;
      case 'Alignment':
        structure.push(TextAlignmentButton);
        break;
      case 'OrderedList':
        structure.push(OrderedListButton);
        break;
      case 'UnorderedList':
        structure.push(UnorderedListButton);
        break;
      case 'Link':
        structure.push(TextLinkButton);
        break;
      case 'Separator':
        structure.push(themedSeparator(false));
        break;
      case 'HorizontalSeparator':
        structure.push(themedSeparator(true));
        break;
      default:
        console.warn(`Failed to load uknown text button "${buttonName}"`); //eslint-disable-line no-console
        break;
    }
  });
  return structure;
};
