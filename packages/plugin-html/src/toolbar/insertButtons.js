import { TOOLBARS } from 'wix-rich-content-common';
import { DEFAULT_COMPONENT_DATA } from '../constants';
import { InsertPluginIcon } from '../icons';

export default ({ helpers, t }) => {
  return [
    {
      name: 'HTML',
      tooltipText: t('HtmlPlugin_InsertButton_Tooltip'),
      Icon: InsertPluginIcon,
      componentData: DEFAULT_COMPONENT_DATA,
      helpers,
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
    },
  ];
};
