import RichContentEditorTheme from './rich-content-editor.theme.scss';
import LinkifyTheme from './text-linkify.theme.scss';
import CommonStyles from './global.theme.scss';
import DividerTheme from './divider.theme.scss';

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

const { divider1, divider2, divider3, divider4 } = DividerTheme;

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
  hasFocus,
  divider1,
  divider2,
  divider3,
  divider4
};

export default theme;
