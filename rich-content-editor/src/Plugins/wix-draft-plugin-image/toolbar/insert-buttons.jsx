import { getDefault } from './../image-component';
import InsertPluginIcon from './../icons/insert-plugin.svg';

export default ({ helpers }) => {
  return [
    {
      type: 'file',
      name: 'Image',
      tooltipText: 'Add an Image',
      Icon: InsertPluginIcon,
      data: getDefault(),
      helpers,
    },
  ];
};
