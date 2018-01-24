import { createSideToolbar } from './SideToolbar';
import { createFooterToolbar } from './StaticToolbar';
import { createTextToolbar } from './InlineToolbar';

const createToolbars = ({ pluginButtons, textButtons, sideToolbarOffset, isMobile }) => {
  const toolbars = {
    text: createTextToolbar({ buttons: textButtons }),
    side: createSideToolbar({ pluginButtons, isMobile, offset: sideToolbarOffset })
  };

  if (!isMobile) {
    toolbars.static = createFooterToolbar({ pluginButtons });
  }

  return toolbars;
};

export default createToolbars;
