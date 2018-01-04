import { DEFAULTS } from './../gallery-component';
import InsertPluginIcon from './../icons/insert-plugin.svg';

export default ({ helpers }) => {
  return [
    {
      name: 'Gallery',
      tooltipText: 'Add a Gallery',
      Icon: InsertPluginIcon,
      data: DEFAULTS,
      helpers,
    },
  ];
};
