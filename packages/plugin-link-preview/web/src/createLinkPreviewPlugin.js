import { createBasePlugin, getSelectedBlocks } from 'wix-rich-content-common';
import { isLinkBlock, replaceLinkWithPreview } from './utils';
import { LINK_PREVIEW_TYPE } from './types';
// import { LinkPreviewComponent } from './LinkPreviewComponent';
import createLinkPreviewToolbar from './toolbar/createLinkPreviewToolbar';

const createLinkPreviewPlugin = (config = {}) => {
  const type = LINK_PREVIEW_TYPE;
  const { [type]: settings = {}, setEditorState, ...rest } = config;
  const toolbar = createLinkPreviewToolbar();

  const handleReturn = (e, editorState) => {
    const currentBlock = getSelectedBlocks(editorState)[0];
    if (isLinkBlock(currentBlock, editorState)) {
      const siteMetadata = {
        title: 'Wix Ltd',
        description: 'Website Building Platform',
        thumbnail: 'https://financesonline.com/uploads/2018/01/wix-logo.png',
      };
      const newEditorState = replaceLinkWithPreview(currentBlock, editorState, siteMetadata);
      setEditorState(newEditorState);
      return 'handled';
    }
    return 'not-handled';
  };

  // const onChange = editorState => {};

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
