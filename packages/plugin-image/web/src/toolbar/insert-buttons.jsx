import { TOOLBARS } from 'wix-rich-content-common';
import { getDefault } from '../consts';
import { InsertPluginIcon } from '../icons';

export default ({ helpers, t, settings }) => {
  const { size, alignment, showTitle, showDescription } = settings;
  const defaults = getDefault();
  return [
    {
      type: 'file',
      name: 'Image',
      tooltipText: t('ImagePlugin_InsertButton_Tooltip'),
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
      Icon: InsertPluginIcon,
      componentData: { ...defaults, size, alignment, showDescription, showTitle },
      helpers,
      t,
    },
  ];
};
