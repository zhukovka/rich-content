import { createBasePlugin } from 'wix-rich-content-editor-common';
import { LINK_PREVIEW_TYPE } from './types';
import LinkPreviewComponent from './LinkPreviewComponent';
import createLinkPreviewToolbar from './toolbar/createLinkPreviewToolbar';

const createLinkPreviewPlugin = (config = {}) => {
  const type = LINK_PREVIEW_TYPE;
  if (!config[LINK_PREVIEW_TYPE]) {
    config[LINK_PREVIEW_TYPE] = {};
  }
  const { [type]: settings, setEditorState, getEditorState, ...rest } = config;
  const toolbar = createLinkPreviewToolbar(settings, setEditorState, getEditorState);

  return createBasePlugin({
    component: LinkPreviewComponent,
    toolbar,
    type,
    settings,
    ...rest,
  });
};

export { createLinkPreviewPlugin };
