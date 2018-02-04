import RichContentEditorTheme from './rich-content-editor.theme.scss';
import LinkifyTheme from './text-linkify.theme.scss';
import CommonStyles from './global.theme.scss';
import DividerTheme from './divider.theme.scss';
import HtmlTheme from './html.theme.scss';
import ImageTheme from './image.theme.scss';
import VideoTheme from './video.theme.scss';
import toolbars from './toolbars';
import modals from './toolbars/modals';

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

const { hasFocus, overlay, pluginContainerReadOnly, pluginContainer, panelContainer } = CommonStyles;

const { divider1, divider2, divider3, divider4 } = DividerTheme;

const { inChange, itemsContainer, invalidGalleryItems } = HtmlTheme;

const { loader, loaderOverlay, imageContainer, imageTitle, imageDescription } = ImageTheme;

const { videoOverlay, player, videoContainer } = VideoTheme;

const theme = {
  quote,
  headerOne, headerTwo, headerThree,
  orderedList, unorderedList,
  atomic, codeBlock,
  text, textAlignment,
  wrapper, editor, desktop,
  link,
  hasFocus, overlay, pluginContainerReadOnly, pluginContainer, panelContainer,
  divider1, divider2, divider3, divider4,
  inChange, itemsContainer, invalidGalleryItems,
  loader, loaderOverlay, imageContainer, imageTitle, imageDescription,
  videoOverlay, player, videoContainer,
  toolbars,
  modals
};

export default theme;
