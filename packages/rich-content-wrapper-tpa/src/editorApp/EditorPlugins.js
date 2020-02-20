import {
  RichContentEditor,
  RichContentEditorModal
} from "wix-rich-content-editor";
import { TOOLBARS } from "wix-rich-content-common";
import { createLinkPlugin, LINK_TYPE } from "wix-rich-content-plugin-link";
import {
  createHashtagPlugin,
  HASHTAG_TYPE
} from "wix-rich-content-plugin-hashtag";
import {
  createImagePlugin,
  IMAGE_TYPE,
  ModalsMap as imageModals
} from "wix-rich-content-plugin-image";
import {
  createVideoPlugin,
  VIDEO_TYPE,
  ModalsMap as videoModals
} from "wix-rich-content-plugin-video";
import {
  createDividerPlugin,
  DIVIDER_TYPE
} from "wix-rich-content-plugin-divider";
import { createHtmlPlugin, HTML_TYPE } from "wix-rich-content-plugin-html";
import {
  createExternalMentionsPlugin,
  EXTERNAL_MENTIONS_TYPE,
  getMentionsFromEditorState,
  addMentionToEditorState
} from "wix-rich-content-plugin-mentions";
import {
  createCodeBlockPlugin,
  CODE_BLOCK_TYPE
} from "wix-rich-content-plugin-code-block";
import {
  createVerticalEmbedPlugin,
  VERTICAL_EMBED_TYPE,
} from 'wix-rich-content-plugin-vertical-embed';

import "wix-rich-content-editor-common/dist/styles.min.css";
import "wix-rich-content-common/dist/styles.min.css";
import "wix-rich-content-editor/dist/styles.min.css";
import "wix-rich-content-plugin-link/dist/styles.min.css";
import "wix-rich-content-plugin-hashtag/dist/styles.min.css";
import "wix-rich-content-plugin-image/dist/styles.min.css";
import "wix-rich-content-plugin-video/dist/styles.min.css";
import "wix-rich-content-plugin-divider/dist/styles.min.css";
import "wix-rich-content-plugin-html/dist/styles.min.css";
import "wix-rich-content-plugin-mentions/dist/styles.min.css";
import "wix-rich-content-plugin-code-block/dist/styles.min.css";
import 'wix-rich-content-plugin-vertical-embed/dist/styles.min.css';

const editorPlugins = [
  createImagePlugin,
  createVideoPlugin,
  createLinkPlugin,
  createHashtagPlugin,
  createDividerPlugin,
  createHtmlPlugin,
  createExternalMentionsPlugin,
  createCodeBlockPlugin,
  createVerticalEmbedPlugin
];

export default editorPlugins;
