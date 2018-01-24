import { createSideToolbar } from './SideToolbar';
import { createStaticToolbar } from './StaticToolbar';
import { createTextToolbar } from './TextToolbar';

const createToolbars = ({ pluginButtons, textButtons, sideToolbarOffset, isMobile }) => {
  const toolbars = {
    text: createTextToolbar({ buttons: textButtons }),
    side: createSideToolbar({ pluginButtons, isMobile, offset: sideToolbarOffset })
  };

  if (!isMobile) {
    toolbars.static = createStaticToolbar({ pluginButtons });
  }

  return toolbars;
};

export default createToolbars;
