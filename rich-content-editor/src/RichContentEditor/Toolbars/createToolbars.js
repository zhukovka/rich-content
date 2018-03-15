import { baseUtils } from 'photography-client-lib/dist/src/utils/baseUtils';
import { createSideToolbar } from './SideToolbar';
import { createMobileToolbar, createFooterToolbar, createStaticTextToolbar } from './StaticToolbar';
import { createInlineTextToolbar } from './InlineToolbar';
import { simplePubsub, getToolbarTheme } from '~/Utils';

const createToolbars = config => {
  const {
    buttons,
    anchorTarget,
    textToolbarType,
    hideFooterToolbar,
    sideToolbarOffset,
    helpers,
    isMobile,
    theme,
    getEditorState,
    setEditorState,
    t
  } = config;
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
    if (!textToolbarType || textToolbarType === 'inline') {
      toolbars.text = createInlineTextToolbar({
        buttons: textButtons,
        theme: { ...getToolbarTheme(theme, 'inline'), ...theme },
        anchorTarget,
        pubsub,
        isMobile,
        helpers,
        t,
      });
    } else {
      toolbars.text = createStaticTextToolbar({
        buttons: textButtons,
        theme: { ...getToolbarTheme(theme, 'text'), ...theme },
        anchorTarget,
        pubsub,
        isMobile,
        helpers,
        t,
      });
    }
  }

  if (!isMobile && !hideFooterToolbar) {
    toolbars.footer = createFooterToolbar({
      buttons: pluginButtons,
      theme: { ...getToolbarTheme(theme, 'footer'), ...theme },
    });
  } else {
    toolbars.mobile = createMobileToolbar({
      anchorTarget,
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
