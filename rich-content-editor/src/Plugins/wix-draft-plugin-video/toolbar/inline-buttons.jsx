import { BUTTONS } from '~/Plugins/base/buttons';
import MediaReplaceIcon from '../icons/media-replace.svg';

const InlineButtons = [
  { type: BUTTONS.SIZE_SMALL_CENTER },
  { type: BUTTONS.SIZE_CONTENT },
  { type: BUTTONS.SIZE_FULL_WIDTH },
  { type: BUTTONS.SEPARATOR },
  { type: BUTTONS.SIZE_SMALL_LEFT },
  { type: BUTTONS.SIZE_SMALL_RIGHT },
  { type: BUTTONS.SEPARATOR },
  {
    keyName: 'replace',
    type: BUTTONS.VIDEO_REPLACE,
    icon: MediaReplaceIcon,
  },
  { type: BUTTONS.DELETE },
];


export default InlineButtons;
