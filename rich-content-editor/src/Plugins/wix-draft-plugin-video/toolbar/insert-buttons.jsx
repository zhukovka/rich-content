import { DEFAULTS } from '../video-component';
import InsertPluginIcon from './icons/insert-plugin.svg';

export default ({ helpers }) => {
  return [
    {
      type: 'video',
      name: 'Video',
      tooltipText: 'Add a Video',
      Icon: InsertPluginIcon,
      data: DEFAULTS,
      helpers,
    },
  ];
};
