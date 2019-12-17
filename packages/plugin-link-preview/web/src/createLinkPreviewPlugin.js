import { createBasePlugin, getCurrentBlock } from 'wix-rich-content-editor-common';
import { getBlockLinkUrl, replaceLinkWithPreview } from './utils';
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

  const handleReturn = async function(event, editorState, { setEditorState }) {
    // console.log('handleReturn');
    const currentBlock = getCurrentBlock(editorState);
    if (!settings.fetchMetadata) {
      return 'not-handled';
    }
    const url = getBlockLinkUrl(currentBlock, editorState);
    if (!url) {
      return 'not-handled';
    }
    const siteMetadata = await settings.fetchMetadata(url);
    const newEditorState = replaceLinkWithPreview(currentBlock, editorState, siteMetadata);
    setEditorState(newEditorState);
    return 'handled';
  };

  return createBasePlugin(
    {
      // component: LinkPreviewComponent,
      toolbar,
      type,
      settings,
      ...rest,
    },
    {
      handleReturn,
      // onChange,
    }
  );
};

export { createLinkPreviewPlugin };
