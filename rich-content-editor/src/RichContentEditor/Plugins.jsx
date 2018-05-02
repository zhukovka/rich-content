import { composeDecorators } from 'draft-js-plugins-editor';
import createFocusPlugin from 'draft-js-focus-plugin';
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';
import { createDividerPlugin, DIVIDER_TYPE } from '~/Plugins/wix-draft-plugin-divider';
import { createGalleryPlugin, GALLERY_TYPE } from '~/Plugins/wix-draft-plugin-gallery';
import { createHTMLPlugin, HTML_TYPE } from '~/Plugins/wix-draft-plugin-html';

const PluginList = [GALLERY_TYPE, HTML_TYPE, DIVIDER_TYPE];

const activePlugins = (requestedPlugins = PluginList, config) => {

  const activePlugins = [];
  requestedPlugins.forEach(plugin => {
    switch (plugin) {
      case DIVIDER_TYPE:
        activePlugins.push(createDividerPlugin(config));
        break;
      case GALLERY_TYPE:
        activePlugins.push(createGalleryPlugin(config));
        break;
      case HTML_TYPE:
        activePlugins.push(createHTMLPlugin(config));
        break;
      default:
        if (typeof plugin === 'function') {
          activePlugins.push(plugin(config));
        } else {
          console.warn(`Failed to load unknown plugin "${plugin}"`); //eslint-disable-line no-console
        }
        break;
    }
  });
  return activePlugins;
};

const createPlugins = ({ plugins, config, helpers, theme, t, isMobile, anchorTarget, relValue }) => {
  const focusPlugin = createFocusPlugin();
  const dndPlugin = createBlockDndPlugin();

  const wixPluginsDecorators = composeDecorators(focusPlugin.decorator, dndPlugin.decorator);
  const wixPlugins = activePlugins(plugins, { decorator: wixPluginsDecorators, helpers, theme, t, isMobile, anchorTarget, relValue, ...config });

  const pluginButtons = [];
  wixPlugins.forEach(wixPlugin => {
    wixPlugin.InsertPluginButtons && wixPlugin.InsertPluginButtons.forEach(insertPluginButton => {
      pluginButtons.push(insertPluginButton);
    });
  });

  const pluginInstances = [
    focusPlugin,
    dndPlugin,
    ...wixPlugins,
  ];

  return {
    pluginInstances,
    pluginButtons
  };
};

export default createPlugins;
export { PluginList };
