import { createSideToolbar } from './SideToolbar';
import { createAddPluginPanel, createMobileToolbar, createFooterToolbar } from './StaticToolbar';
import { createTextToolbar } from './InlineToolbar';
import { simplePubsub } from '~/Utils';

const createToolbars = ({ pluginButtons, textButtons, sideToolbarOffset, isMobile, theme = {} }) => {
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
      buttons: textButtons,
      theme: theme.mobile,
      pubsub,

    });
    toolbars.mobileAddPanel = createAddPluginPanel({
      buttons: pluginButtons,
      theme: theme.mobileAddPanel,
      pubsub
    });
  }

  return toolbars;
};

export default createToolbars;
