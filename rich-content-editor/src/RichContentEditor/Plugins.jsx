import { composeDecorators } from 'draft-js-plugins-editor';
import createFocusPlugin from 'draft-js-focus-plugin';
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import { createDividerPlugin, DIVIDER_TYPE } from '~/Plugins/wix-draft-plugin-divider';
import { createGalleryPlugin, GALLERY_TYPE } from '~/Plugins/wix-draft-plugin-gallery';
import { createHtmlPlugin, HTML_TYPE } from '~/Plugins/wix-draft-plugin-html';
import { createImagePlugin, IMAGE_TYPE } from '~/Plugins/wix-draft-plugin-image';
import { createVideoPlugin, VIDEO_TYPE } from '~/Plugins/wix-draft-plugin-video';
import Styles from '~/Styles/text-linkify.scss';

const PluginList = [DIVIDER_TYPE, GALLERY_TYPE, HTML_TYPE, IMAGE_TYPE, VIDEO_TYPE];

const activePlugins = (requestedPlugins = PluginList, config) => {
  const { theme } = config || {};
  if (theme.toolbars && theme.toolbars.plugin) {
    config.theme = {
      ...theme.toolbars.plugin,
    };
  }
  const activePlugins = [];
  requestedPlugins.forEach(pluginType => {
    switch (pluginType) {
      case DIVIDER_TYPE:
        activePlugins.push(createDividerPlugin(config));
        break;
      case GALLERY_TYPE:
        activePlugins.push(createGalleryPlugin(config));
        break;
      case HTML_TYPE:
        activePlugins.push(createHtmlPlugin(config));
        break;
      case IMAGE_TYPE:
        activePlugins.push(createImagePlugin(config));
        break;
      case VIDEO_TYPE:
        activePlugins.push(createVideoPlugin(config));
        break;
      default:
        console.warn(`Failed to load uknown plugin "${pluginType}"`); //eslint-disable-line no-console
        break;
    }
  });
  return activePlugins;
};

const createPlugins = ({ plugins, helpers, theme }) => {
  const linkifyPlugin = createLinkifyPlugin({ theme: theme || Styles });
  const focusPlugin = createFocusPlugin();
  const dndPlugin = createBlockDndPlugin();

  const wixPluginsDecorators = composeDecorators(focusPlugin.decorator, dndPlugin.decorator);
  const wixPlugins = activePlugins(plugins, { decorator: wixPluginsDecorators, helpers, theme });

  const pluginButtons = [];
  wixPlugins.forEach(wixPlugin => {
    wixPlugin.InsertPluginButtons.forEach(insertPluginButton => {
      pluginButtons.push(insertPluginButton);
    });
  });

  const pluginInstances = [
    linkifyPlugin,
    focusPlugin,
    dndPlugin,
    ...wixPlugins,
  ];

  return {
    plugins: pluginInstances,
    pluginButtons
  };
};

export default createPlugins;
export { PluginList };
