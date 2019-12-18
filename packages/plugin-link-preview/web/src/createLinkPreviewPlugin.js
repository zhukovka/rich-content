import { createBasePlugin } from 'wix-rich-content-editor-common';
import { LINK_PREVIEW_TYPE } from './types';
// import { LinkPreviewComponent } from './LinkPreviewComponent';
import createLinkPreviewToolbar from './toolbar/createLinkPreviewToolbar';

const createLinkPreviewPlugin = (config = {}) => {
  const type = LINK_PREVIEW_TYPE;
  const { [type]: settings = {}, ...rest } = config;
  const toolbar = createLinkPreviewToolbar();

  // const handleReturn = (e, editorState) => {
  //   const currentBlock = getCurrentBlock(editorState);
  //   if (isLinkBlock(currentBlock)) {
  //     const siteMetadata = {
  //       title: 'Wix Ltd',
  //       description: 'Website Building Platform',
  //       thumbnail: 'https://financesonline.com/uploads/2018/01/wix-logo.png',
  //     };
  //     const newEditorState = replaceLinkWithPreview(currentBlock, editorState, siteMetadata);
  //     setEditorState(newEditorState);
  //     return 'handled';
  //   }
  //   return 'not-handled';
  // };

  return createBasePlugin({
    // component: LinkPreviewComponent,
    toolbar,
    type,
    settings,
    ...rest,
  });
};

export { createLinkPreviewPlugin };
