import { baseUtils } from 'photography-client-lib/dist/src/utils/baseUtils';
import { createSideToolbar } from './SideToolbar';
import { createMobileToolbar, createFooterToolbar } from './StaticToolbar';
import { createTextToolbar } from './InlineToolbar';
import { simplePubsub, getToolbarTheme } from '~/Utils';

const createToolbars = ({ buttons, sideToolbarOffset, helpers, isMobile, theme, toolbarStyle, getEditorState, setEditorState }) => {
  const { pluginButtons, textButtons } = buttons;
  const pubsub = simplePubsub();
  const shouldCreateTextToolbar = !isMobile || baseUtils.isiOS();

  const toolbars = {
    side: createSideToolbar({
      buttons: pluginButtons,
      offset: sideToolbarOffset,
      theme: { ...getToolbarTheme(theme, 'side'), ...theme },
      toolbarStyle,
      pubsub,
      isMobile
    }),
  };

  if (shouldCreateTextToolbar) {
    toolbars.text = createTextToolbar({
      buttons: textButtons,
      theme: { ...getToolbarTheme(theme, 'inline'), ...theme },
      toolbarStyle,
      pubsub,
      isMobile,
    });
  }

  if (!isMobile) {
    toolbars.footer = createFooterToolbar({
      buttons: pluginButtons,
      theme: { ...getToolbarTheme(theme, 'footer'), ...theme },
      toolbarStyle,
    });
  } else {
    toolbars.mobile = createMobileToolbar({
      buttons,
      helpers,
      pubsub,
      getEditorState,
      setEditorState,
      theme: { ...getToolbarTheme(theme, 'mobile'), ...theme },
      toolbarStyle,
    });
  }

  return toolbars;
};

export default createToolbars;
