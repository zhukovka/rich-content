import { composeDecorators } from 'draft-js-plugins-editor';
import createFocusPlugin from 'draft-js-focus-plugin';
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';
import { createLinkPlugin, EXTERNAL_LINK_TYPE } from '../Plugins/wix-draft-plugin-link';
import { createHashtagPlugin, HASHTAG_TYPE } from '../Plugins/wix-draft-plugin-hashtag';
import { createExternalEmojiPlugin, EXTERNAL_EMOJI_TYPE } from '../Plugins/wix-draft-plugin-emoji';
import { createDividerPlugin, DIVIDER_TYPE } from '~/Plugins/wix-draft-plugin-divider';
import { createGalleryPlugin, GALLERY_TYPE } from '~/Plugins/wix-draft-plugin-gallery';
import { createHTMLPlugin, HTML_TYPE } from '~/Plugins/wix-draft-plugin-html';
import { createImagePlugin, IMAGE_TYPE } from '~/Plugins/wix-draft-plugin-image';
import { createVideoPlugin, VIDEO_TYPE } from '~/Plugins/wix-draft-plugin-video';

const PluginList = [EXTERNAL_LINK_TYPE, HASHTAG_TYPE, IMAGE_TYPE, GALLERY_TYPE, VIDEO_TYPE, HTML_TYPE, DIVIDER_TYPE, EXTERNAL_EMOJI_TYPE];

const activePlugins = (requestedPlugins = PluginList, config) => {

  const activePlugins = [];
  requestedPlugins.forEach(pluginType => {
    switch (pluginType) {
      case EXTERNAL_LINK_TYPE:
        activePlugins.push(createLinkPlugin(config));
        break;
      case HASHTAG_TYPE:
        activePlugins.push(createHashtagPlugin(config));
        break;
      case DIVIDER_TYPE:
        activePlugins.push(createDividerPlugin(config));
        break;
      case GALLERY_TYPE:
        activePlugins.push(createGalleryPlugin(config));
        break;
      case HTML_TYPE:
        activePlugins.push(createHTMLPlugin(config));
        break;
      case IMAGE_TYPE:
        activePlugins.push(createImagePlugin(config));
        break;
      case VIDEO_TYPE:
        activePlugins.push(createVideoPlugin(config));
        break;
      case EXTERNAL_EMOJI_TYPE:
        activePlugins.push(createExternalEmojiPlugin(config));
        break;
      default:
        console.warn(`Failed to load unknown plugin "${pluginType}"`); //eslint-disable-line no-console
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
