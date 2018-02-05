import { createSideToolbar } from './SideToolbar';
import { createMobileToolbar, createFooterToolbar } from './StaticToolbar';
import { createTextToolbar } from './InlineToolbar';
import { simplePubsub } from '~/Utils';

const createToolbars = ({ buttons, sideToolbarOffset, helpers, isMobile, theme, getEditorState, setEditorState }) => {
  const { pluginButtons, textButtons } = buttons;
  const pubsub = simplePubsub();

  const toolbars = {
    side: createSideToolbar({
      buttons: pluginButtons,
      offset: sideToolbarOffset,
      theme: theme.side,
      pubsub,
      isMobile
    })
  };

  if (!isMobile) {
    toolbars.text = createTextToolbar({
      buttons: textButtons,
      theme: theme.text,
    });
    toolbars.footer = createFooterToolbar({
      buttons: pluginButtons,
      theme: theme.footer,
    });
  } else {
    toolbars.mobile = createMobileToolbar({
      buttons,
      helpers,
      pubsub,
      getEditorState,
      setEditorState,
      theme: theme.mobile,
    });
  }

  return toolbars;
};

export default createToolbars;
