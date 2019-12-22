import { createBasePlugin } from 'wix-rich-content-editor-common';
import { LINK_PREVIEW_TYPE } from './types';
import LinkPreviewComponent from './LinkPreviewComponent';
import createLinkPreviewToolbar from './toolbar/createLinkPreviewToolbar';

const createLinkPreviewPlugin = (config = {}) => {
  const type = LINK_PREVIEW_TYPE;
  const { [type]: settings = {}, ...rest } = config;
  const toolbar = createLinkPreviewToolbar();

  return createBasePlugin({
    component: LinkPreviewComponent,
    toolbar,
    type,
    settings,
    ...rest,
  });
};

export { createLinkPreviewPlugin };
