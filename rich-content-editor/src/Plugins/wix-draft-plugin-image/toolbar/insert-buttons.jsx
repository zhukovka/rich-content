import { getDefault } from './../image-component';
import InsertPluginIcon from './../icons/insert-plugin.svg';

export default ({ helpers, t }) => {
  return [
    {
      type: 'file',
      name: 'Image',
      tooltipText: t('imagePlugin_name'),
      Icon: InsertPluginIcon,
      data: getDefault(),
      helpers,
    },
  ];
};
