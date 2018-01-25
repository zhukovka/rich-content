
import {
  TextButtonList,
  BoldButton,
  ItalicButton,
  TitleButton,
  BlockquoteButton,
  TextAlignmentButton,
  UnorderedListButton,
  OrderedListButton,
  TextLinkButton,
  AddPluginButton,
} from '../index';
import createThemedSeparator from './createThemedSeparator';

export default ({ buttons = TextButtonList, theme }) => {
  const ThemedSeparator = createThemedSeparator({ theme });
  const structure = [];
  buttons.forEach(buttonName => {
    switch (buttonName) {
      case 'Bold':
        structure.push(BoldButton);
        break;
      case 'Italic':
        structure.push(ItalicButton);
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
      case 'AddPlugin':
        structure.push(AddPluginButton);
        break;
      case 'Separator':
        structure.push(ThemedSeparator);
        break;
      default:
        console.warn(`Failed to load uknown text button "${buttonName}"`); //eslint-disable-line no-console
        break;
    }
  });
  return structure;
};
