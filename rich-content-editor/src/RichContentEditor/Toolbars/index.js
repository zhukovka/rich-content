import { createSideToolbar } from './SideToolbar';
import { createMobileToolbar, createFooterToolbar } from './StaticToolbar';
import { createTextToolbar } from './InlineToolbar';

const createToolbars = ({ pluginButtons, textButtons, sideToolbarOffset, isMobile }) => {
  const toolbars = {
    side: createSideToolbar({ buttons: pluginButtons, offset: sideToolbarOffset, isMobile })
  };

  if (!isMobile) {
    toolbars.text = createTextToolbar({ buttons: textButtons });
    toolbars.static = createFooterToolbar({ buttons: pluginButtons });
  } else {
    toolbars.mobile = createMobileToolbar({ buttons: textButtons });
  }

  return toolbars;
};

export default createToolbars;
