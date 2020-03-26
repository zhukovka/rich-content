import React from 'react';
import {
  ImageIcon,
  VideoIcon,
  GalleryIcon,
  BlockQuoteIcon,
  CodeBlockIcon,
  TitleIcon,
} from './Icons';

export const COMMANDS = Object.freeze({
  TITLE: 'header-two',
  SUBTITLE: 'header-three',
  ALIGN_LEFT: 'left',
  ALIGN_RIGHT: 'right',
  ALIGN_CENTER: 'center',
  JUSTIFY: 'justify',
  NUMBERED_LIST: 'ordered-list-item',
  BULLET_LIST: 'unordered-list-item',
  CODE: 'code-block',
  BLOCKQUOTE: 'blockquote',
  BACKSPACE: 'backspace',
  DELETE: 'delete',
});

export const MODIFIERS = Object.freeze({
  COMMAND: 'command',
  CTRL: 'ctrl',
  OPTION: 'option',
  SHIFT: 'shift',
});

export const TOOLBARS = Object.freeze({
  SIDE: 'SIDE',
  MOBILE: 'MOBILE', //Text Toolbar
  FOOTER: 'FOOTER',
  STATIC: 'TEXT', //Text Toolbar
  INLINE: 'INLINE', //Text Toolbar
  PLUGIN: 'PLUGIN',
  TEXT: 'ALL-TEXT-TOOLBARS',
});

export const DISPLAY_MODE = Object.freeze({
  NORMAL: 'NORMAL',
  FLOATING: 'FLOATING',
});

export const DECORATION_MODE = Object.freeze({
  PREPEND: 'PREPEND',
  WRAP: 'WRAP',
  APPEND: 'APPEND',
});

export const PLUGIN_DECORATIONS = Object.freeze({
  RESIZEABLE: 'RESIZEABLE',
});

export const PLUGIN_DECORATION_PROPS = Object.freeze({
  [PLUGIN_DECORATIONS.RESIZEABLE]: props => ({
    onMouseDown: props.onMouseDown,
    onMouseMove: props.onMouseMove,
    onMouseLeave: props.onMouseLeave,
    style: props.style,
    width: props.width,
    containerClassName: props.containerClassName,
  }),
});

export const TOOLBAR_OFFSETS = Object.freeze({
  top: 12,
  left: 15,
});

export const ANCHORABLE_BLOCKS = Object.freeze({
  unstyled: {
    thumbnail: 'P',
    type: 'LinkTo_Modal_Section_Item_Paragraph',
    filter: 'LinkTo_Modal_Section_Filter_Paragraphs',
  },
  header: {
    thumbnail: <TitleIcon style={{ width: 'fit-content' }} />,
    type: 'LinkTo_Modal_Section_Item_Heading',
    filter: 'LinkTo_Modal_Section_Filter_Headings',
  },
  // 'header-two': {
  //   thumbnail: 'H',
  //   type: 'LinkTo_Modal_Section_Item_Heading',
  //   filter: 'LinkTo_Modal_Section_Filter_Headings',
  // },
  // 'header-three': {
  //   thumbnail: 'H',
  //   type: 'LinkTo_Modal_Section_Item_Heading',
  //   filter: 'LinkTo_Modal_Section_Filter_Headings',
  // },
  'code-block': {
    thumbnail: <CodeBlockIcon style={{ width: 'fit-content' }} />,
    type: 'LinkTo_Modal_Section_Item_Codeblock',
    filter: 'LinkTo_Modal_Section_Item_Codeblock',
  },
  blockquote: {
    thumbnail: <BlockQuoteIcon style={{ width: 'fit-content' }} />,
    type: 'LinkTo_Modal_Section_Item_Quote',
    filter: 'LinkTo_Modal_Section_Filter_Quotes',
  },
  'wix-draft-plugin-image': {
    thumbnail: <ImageIcon style={{ width: 'fit-content' }} />,
    visualThumbnail: true,
    type: 'LinkTo_Modal_Section_Item_Image',
    filter: 'LinkTo_Modal_Section_Filter_Images',
  },
  'wix-draft-plugin-gallery': {
    thumbnail: <GalleryIcon style={{ width: 'fit-content' }} />,
    visualThumbnail: true,
    type: 'LinkTo_Modal_Section_Item_Gallery',
    filter: 'LinkTo_Modal_Section_Filter_Galleries',
  },
  'wix-draft-plugin-video': {
    thumbnail: <VideoIcon style={{ width: 'fit-content' }} />,
    visualThumbnail: true,
    type: 'LinkTo_Modal_Section_Item_Video',
    filter: 'LinkTo_Modal_Section_Filter_Videos',
  },
});
