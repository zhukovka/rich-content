import createToolbar from './toolbar/createToolbar';
import { HEADINGS_TYPE } from './types';
import { createBasePlugin } from 'wix-rich-content-editor-common';

const createHeadingsPlugin = (config = {}) => {
  const { helpers, t, [HEADINGS_TYPE]: settings = {}, isMobile, Headings } = config;
  const icons = Headings?.toolbar?.icons || {};
  const customHeadings = Headings?.headersDropdown;
  return createBasePlugin({
    toolbar: createToolbar({
      helpers,
      t,
      settings,
      isMobile,
      customHeadings,
      icons,
    }),
    helpers,
    settings,
    t,
    isMobile,
  });
};

export { createHeadingsPlugin };
