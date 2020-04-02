import React from 'react';
import {
  ImageIcon,
  VideoIcon,
  GalleryIcon,
  BlockQuoteIcon,
  CodeBlockIcon,
  TitleIcon,
} from '../../Icons';

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
