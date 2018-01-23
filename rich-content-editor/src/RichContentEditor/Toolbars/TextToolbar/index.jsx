import decorateComponentWithProps from 'decorate-component-with-props';
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
import TextToolbar from './TextToolbar';
import { simplePubsub } from '~/Utils';
import toolbarStyles from '~/Styles/text-toolbar.scss';
import buttonStyles from '~/Styles/text-toolbar-button.scss';

const TextButtonList = ['Bold', 'Italic', 'Title', 'Blockquote', 'Separator', 'Alignment', 'OrderedList', 'UnorderedList', 'Separator', 'Link'];

const createInlineToolbar = (config = {}) => {
  const defaultTheme = { buttonStyles, toolbarStyles };

  const {
    pubsub = simplePubsub(),
    theme = defaultTheme,
    structure = []
  } = config;

  const toolbarProps = {
    pubsub,
    structure,
    theme,
  };

  return {
    initialize: ({ getEditorState, setEditorState }) => {
      pubsub.set('getEditorState', getEditorState);
      pubsub.set('setEditorState', setEditorState);
    },
    // Re-Render the text-toolbar on selection change
    onChange: editorState => {
      pubsub.set('selection', editorState.getSelection());
      return editorState;
    },
    InlineToolbar: decorateComponentWithProps(TextToolbar, toolbarProps),
  };
};

export default ({ buttons = TextButtonList, theme }) => {
  const structure = [];
  const separatorProps = { name: 'Separator' };
  if (theme && theme.separator) {
    separatorProps.className = theme.separator;
  }
  const StyledSeparator = decorateComponentWithProps(Separator, separatorProps);
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
        structure.push(StyledSeparator);
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

export { TextButtonList };
