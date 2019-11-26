import { LINK_PREVIEW_TYPE } from './types';

// export const replaceLinkWithPreview = (getEditorState, setEditorState) => {};

// export const replacePreviewWithLink = (getEditorState, setEditorState) => {};

// export const isLinkBlock = contentBlock => {};

export const toPreviewEntity = (linkData, thumbnailUrl, description, title) => ({
  type: LINK_PREVIEW_TYPE,
  mutability: 'IMMUTABLE',
  data: {
    thumbnailUrl,
    description,
    title,
    ...linkData,
  },
});

export const toLinkEntity = previewData => ({
  type: 'LINK',
  mutability: 'MUTABLE',
  data: {
    url: previewData.url,
    target: previewData.target,
    rel: previewData.rel,
  },
});
