import { createSideToolbar } from './SideToolbar';
import { createAddPluginPanel, createMobileToolbar, createFooterToolbar } from './StaticToolbar';
import { createTextToolbar } from './InlineToolbar';
import { simplePubsub } from '~/Utils';

const createToolbars = ({ pluginButtons, textButtons, sideToolbarOffset, isMobile }) => {
  const pubsub = simplePubsub();

  const toolbars = {
    side: createSideToolbar({ buttons: pluginButtons, offset: sideToolbarOffset, pubsub, isMobile })
  };

  if (!isMobile) {
    toolbars.text = createTextToolbar({ buttons: textButtons });
    toolbars.static = createFooterToolbar({ buttons: pluginButtons });
  } else {
    toolbars.mobile = createMobileToolbar({ buttons: textButtons, pubsub });
    toolbars.mobileAddPanel = createAddPluginPanel({ buttons: pluginButtons, pubsub });
  }

  return toolbars;
};

export default createToolbars;
