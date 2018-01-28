import decorateComponentWithProps from 'decorate-component-with-props';
import createInlineToolbar from './createInlineToolbar';
import {
  BoldButton,
  ItalicButton,
  TitleButton,
  BlockquoteButton,
  TextAlignmentButton,
  UnorderedListButton,
  OrderedListButton,
  TextLinkButton,
} from '../buttons';
import Separator from '~/Common/Separator';

const TextButtonList = ['Bold', 'Italic', 'Title', 'Blockquote', 'Separator', 'Alignment', 'OrderedList', 'UnorderedList', 'Separator', 'Link'];

const createThemedSeparator = theme => {
  const separatorProps = { name: 'Separator' };
  if (theme && theme.separator) {
    separatorProps.className = theme.separator;
  }
  return decorateComponentWithProps(Separator, separatorProps);
};

const createTextToolbar = ({ buttons = TextButtonList, theme }) => {
  const structure = [];
  const separatorProps = { name: 'Separator' };
  if (theme && theme.separator) {
    separatorProps.className = theme.separator;
  }
  const ThemedSeparator = createThemedSeparator(theme);
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
      case 'Separator':
        structure.push(ThemedSeparator);
        break;
      default:
        console.warn(`Failed to load uknown text button "${buttonName}"`); //eslint-disable-line no-console
        break;
    }
  });
  return createInlineToolbar({
    structure,
    theme,
  });
};

export default createTextToolbar;
export { TextButtonList };
