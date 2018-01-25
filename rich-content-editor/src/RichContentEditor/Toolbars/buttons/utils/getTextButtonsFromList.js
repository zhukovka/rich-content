
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
} from '../index';
import createThemedSeparator from './createThemedSeparator';

export default ({ buttons = TextButtonList, theme, isMobile = false }) => {
  const ThemedSeparator = createThemedSeparator({ theme });
  const structure = [];
  const addToStructure = (button, ButtonComponent) => {
    if (!isMobile || isMobile && button.showOnMobile) {
      structure.push(ButtonComponent);
    }
  };
  buttons.forEach(button => {
    switch (button.name) {
      case 'Bold':
        addToStructure(button, BoldButton);
        break;
      case 'Italic':
        addToStructure(button, ItalicButton);
        break;
      case 'Title':
        addToStructure(button, TitleButton);
        break;
      case 'Blockquote':
        addToStructure(button, BlockquoteButton);
        break;
      case 'Alignment':
        addToStructure(button, TextAlignmentButton);
        break;
      case 'OrderedList':
        addToStructure(button, OrderedListButton);
        break;
      case 'UnorderedList':
        addToStructure(button, UnorderedListButton);
        break;
      case 'Link':
        addToStructure(button, TextLinkButton);
        break;
      case 'Separator':
        addToStructure(button, ThemedSeparator);
        break;
      default:
        console.warn(`Failed to load uknown text button "${button.name}"`); //eslint-disable-line no-console
        break;
    }
  });
  return structure;
};
