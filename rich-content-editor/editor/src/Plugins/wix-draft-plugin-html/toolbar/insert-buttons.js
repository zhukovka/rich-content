import { DEFAULTS } from './../html-component';
import InsertPluginIcon from './../icons/insert-plugin.svg';

export default ({ helpers }) => {
  return [
    {
      name: 'HTML',
      tooltipText: 'Insert HTML Code',
      Icon: InsertPluginIcon,
      data: DEFAULTS,
      helpers,
    },
  ];
};
