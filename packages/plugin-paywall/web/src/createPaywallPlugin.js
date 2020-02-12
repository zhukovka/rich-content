import { mergeStyles } from 'wix-rich-content-common';
import { createBasePlugin } from 'wix-rich-content-editor-common';

import { PAYWALL_TYPE, DEFAULTS } from './constants';
import PaywallComponent from './components/paywall-component';
import createToolbar from './toolbar';
import Styles from '../statics/styles/default-styles.scss';

const createPaywallPlugin = (config = {}) => {
  const type = PAYWALL_TYPE;
  const { helpers, theme, t, [type]: settings = {}, ...rest } = config;

  const styles = mergeStyles({ styles: Styles, theme });

  return createBasePlugin({
    component: PaywallComponent,
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

export { createPaywallPlugin, PAYWALL_TYPE };
