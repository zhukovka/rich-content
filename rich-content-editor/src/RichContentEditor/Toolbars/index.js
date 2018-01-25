import { createSideToolbar } from './SideToolbar';
import { createMobileToolbar, createFooterToolbar } from './StaticToolbar';
import { createTextToolbar } from './InlineToolbar';

const createToolbars = ({ pluginButtons, textButtons, sideToolbarOffset, isMobile }) => {
  const toolbars = {
    text: createTextToolbar({ buttons: textButtons }),
    side: createSideToolbar({ buttons: pluginButtons, isMobile, offset: sideToolbarOffset }),
    mobile: createMobileToolbar({ buttons: textButtons }),
  };

  if (!isMobile) {
    toolbars.static = createFooterToolbar({ buttons: pluginButtons });
  }

  return toolbars;
};

export default createToolbars;
