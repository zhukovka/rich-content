import { mergeStyles } from 'wix-rich-content-common';
import { createBasePlugin } from 'wix-rich-content-editor-common';

import { VERTICAL_EMBED_TYPE, DEFAULTS } from './constants';
import VerticalEmbedComponent from './components/vertical-embed-component';
import createToolbar from './toolbar';
import Styles from '../statics/styles/default-styles.scss';

const createVerticalEmbedPlugin = (config = {}) => {
  const type = VERTICAL_EMBED_TYPE;
  const { helpers, theme, t, [type]: settings = {}, ...rest } = config;
  const styles = mergeStyles({ styles: Styles, theme });

  return createBasePlugin({
    component: VerticalEmbedComponent,
    settings,
    theme,
    type,
    toolbar: createToolbar({
      settings,
      helpers,
      styles,
      theme,
      t,
    }),
    helpers,
    t,
    defaultPluginData: DEFAULTS,
    ...rest,
  });
};

export { createVerticalEmbedPlugin, VERTICAL_EMBED_TYPE };
