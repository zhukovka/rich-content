import { BUTTONS } from '~/Plugins/base/buttons';
import { MODALS } from '~/RichContentEditor/RichContentModal';
import { getModalStyles } from '~/Utils';
import MediaReplaceIcon from './icons/media-replace.svg';

export default({ t }) => {
  return [
    { type: BUTTONS.SIZE_SMALL_CENTER, mobile: false },
    { type: BUTTONS.SIZE_CONTENT, mobile: false },
    { type: BUTTONS.SIZE_FULL_WIDTH, mobile: false },
    { type: BUTTONS.SEPARATOR, mobile: false },
    { type: BUTTONS.SIZE_SMALL_LEFT, mobile: false },
    { type: BUTTONS.SIZE_SMALL_RIGHT, mobile: false },
    { type: BUTTONS.SEPARATOR, mobile: false },
    {
      keyName: 'replace',
      type: BUTTONS.EXTERNAL_MODAL,
      icon: MediaReplaceIcon,
      modalName: MODALS.VIDEO_URL_INPUT,
      modalStyles: getModalStyles({ fullScreen: false }),
      mobile: true,
      tooltipTextKey: 'ReplaceVideoButton_Tooltip',
      t,
    },
    { type: BUTTONS.DELETE, mobile: true },
  ];
};
