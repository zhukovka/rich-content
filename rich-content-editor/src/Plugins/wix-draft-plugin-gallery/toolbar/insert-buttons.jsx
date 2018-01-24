import { DEFAULTS } from './../gallery-component';
import InsertPluginIcon from './../icons/insert-plugin.svg';

export default ({ helpers }) => {
  return [
    {
      type: 'file',
      multi: true,
      name: 'Gallery',
      tooltipText: 'Add a Gallery (add files)',
      Icon: InsertPluginIcon,
      data: DEFAULTS,
      helpers,
    },
  ];
};
