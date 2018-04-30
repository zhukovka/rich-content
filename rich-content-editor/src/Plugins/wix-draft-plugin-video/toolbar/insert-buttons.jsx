import { DEFAULTS } from '../video-component';
import { getModalStyles, MODALS } from 'wix-rich-content-common';
import InsertPluginIcon from './icons/insert-plugin.svg';

export default ({ helpers, t }) => {
  return [
    {
      type: 'modal',
      name: 'Video',
      tooltipText: t('VideoPlugin_InsertButton_Tooltip'),
      Icon: InsertPluginIcon,
      data: DEFAULTS,
      modalName: MODALS.VIDEO_URL_INPUT,
      modalStyles: getModalStyles({ fullScreen: false }),
      helpers,
    },
  ];
};
