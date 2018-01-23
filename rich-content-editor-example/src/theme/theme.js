import RichContentEditorTheme from './rich-content-editor.theme.scss';
import LinkifyTheme from './text-linkify.theme.scss';
import CommonStyles from './global.theme.scss';

const {
  quote,
  headerOne,
  headerTwo,
  headerThree,
  orderedList,
  unorderedList,
  atomic,
  codeBlock,
  text,
  textAlignment,
  wrapper,
  editor,
  desktop
} = RichContentEditorTheme;

const { link } = LinkifyTheme;

const { hasFocus } = CommonStyles;

const theme = {
  quote,
  headerOne,
  headerTwo,
  headerThree,
  orderedList,
  unorderedList,
  atomic,
  codeBlock,
  text,
  textAlignment,
  wrapper,
  editor,
  desktop,
  link,
  hasFocus
};

export default theme;
