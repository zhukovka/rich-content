import { composeDecorators } from 'draft-js-plugins-editor';
import createFocusPlugin from 'draft-js-focus-plugin'; //eslint-disable-line no-unused-vars
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin'; //eslint-disable-line no-unused-vars
import createSideToolbar from './Toolbars/SideToolbar';
import createStaticToolbar from './Toolbars/StaticToolbar';
import createTextToolbar from './Toolbars/TextToolbar';
import { createDividerPlugin, DIVIDER_TYPE } from '~/Plugins/wix-draft-plugin-divider';
import { createGalleryPlugin, GALLERY_TYPE } from '~/Plugins/wix-draft-plugin-gallery';
import { createHtmlPlugin, HTML_TYPE } from '~/Plugins/wix-draft-plugin-html';
import { createImagePlugin, IMAGE_TYPE } from '~/Plugins/wix-draft-plugin-image';
import { createVideoPlugin, VIDEO_TYPE } from '~/Plugins/wix-draft-plugin-video';

const PluginList = [DIVIDER_TYPE, GALLERY_TYPE, HTML_TYPE, IMAGE_TYPE, VIDEO_TYPE];

const toolbars = (wixPlugins, sideToolbarOffset) => {
  const insertPluginButtons = [];

  wixPlugins.forEach(wixPlugin => {
    wixPlugin.InsertPluginButtons.forEach(insertPluginButton => {
      insertPluginButtons.push(insertPluginButton);
    });
  });
  return {
    staticToolbarPlugin: createStaticToolbar({ insertPluginButtons }),
    sideToolbarPlugin: createSideToolbar({ insertPluginButtons, offset: sideToolbarOffset }),
  };
};

const activePlugins = (requestedPlugins = PluginList, config) => {
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

const createPlugins = ({ editorProps, theme }) => {
  const { helpers, isMobile, plugins, sideToolbarOffset, textButtons } = editorProps;
  const textToolbar = createTextToolbar({ buttons: textButtons });
  const linkifyPlugin = createLinkifyPlugin(theme);
  const focusPlugin = createFocusPlugin();
  const dndPlugin = createBlockDndPlugin();

  const wixPluginsDecorators = composeDecorators(focusPlugin.decorator, dndPlugin.decorator);

  const wixPlugins = activePlugins(plugins, { decorator: wixPluginsDecorators, helpers, theme });
  const { staticToolbarPlugin, sideToolbarPlugin } = toolbars(wixPlugins, sideToolbarOffset);
  const draftPlugins = [sideToolbarPlugin, textToolbar, linkifyPlugin, focusPlugin, dndPlugin];

  if (!isMobile) {
    draftPlugins.unshift(staticToolbarPlugin);
  }

  return [...draftPlugins, ...wixPlugins];
};

export default createPlugins;
export { PluginList };
