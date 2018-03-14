import { baseUtils } from 'photography-client-lib/dist/src/utils/baseUtils';
import { createSideToolbar } from './SideToolbar';
import { createMobileToolbar, createFooterToolbar } from './StaticToolbar';
import { createTextToolbar } from './InlineToolbar';
import { simplePubsub, getToolbarTheme } from '~/Utils';

const createToolbars = ({ buttons, hideFooterToolbar, sideToolbarOffset, helpers, isMobile, theme, getEditorState, setEditorState, t }) => {
  const { pluginButtons, textButtons } = buttons;
  const pubsub = simplePubsub();
  const shouldCreateTextToolbar = !isMobile || baseUtils.isiOS();

  const toolbars = {
    side: createSideToolbar({
      buttons: pluginButtons,
      offset: sideToolbarOffset,
      theme: { ...getToolbarTheme(theme, 'side'), ...theme },
      pubsub,
      isMobile
    }),
  };

  if (shouldCreateTextToolbar) {
    toolbars.text = createTextToolbar({
      buttons: textButtons,
      theme: { ...getToolbarTheme(theme, 'inline'), ...theme },
      pubsub,
      isMobile,
      helpers,
      t,
    });
  }

  if (!isMobile && !hideFooterToolbar) {
    toolbars.footer = createFooterToolbar({
      buttons: pluginButtons,
      theme: { ...getToolbarTheme(theme, 'footer'), ...theme },
    });
  } else {
    toolbars.mobile = createMobileToolbar({
      buttons,
      helpers,
      pubsub,
      getEditorState,
      setEditorState,
      t,
      theme: { ...getToolbarTheme(theme, 'mobile'), ...theme },
    });
  }

  return toolbars;
};

export default createToolbars;
