import { DEFAULTS } from '../video-component';
import { MODALS } from '~/RichContentEditor/RichContentModal';
import { getModalStyles } from '~/Utils';
import InsertPluginIcon from './icons/insert-plugin.svg';

export default ({ helpers }) => {
  return [
    {
      type: 'modal',
      name: 'Video',
      tooltipText: 'Add a Video',
      Icon: InsertPluginIcon,
      data: DEFAULTS,
      modalName: MODALS.VIDEO_URL_INPUT,
      modalStyles: getModalStyles({ fullScreen: false }),
      helpers,
    },
  ];
};
