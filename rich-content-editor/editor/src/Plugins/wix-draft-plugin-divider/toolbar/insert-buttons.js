import { DEFAULTS } from './../divider-component';
import InsertPluginIcon from './../icons/insert-plugin.svg';

export default ({ helpers }) => {
  return [
    {
      name: 'Divider',
      tooltipText: 'Add a Divider',
      Icon: InsertPluginIcon,
      data: DEFAULTS,
      helpers,
    },
  ];
};
