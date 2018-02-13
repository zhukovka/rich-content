import { BUTTONS } from '~/Plugins/base/buttons';
import MediaReplaceIcon from '../icons/media-replace.svg';

const InlineButtons = [
  { type: BUTTONS.SIZE_SMALL_LEFT, mobile: true },
  { type: BUTTONS.SIZE_SMALL_CENTER, mobile: true },
  { type: BUTTONS.SIZE_SMALL_RIGHT, mobile: true },
  { type: BUTTONS.SIZE_CONTENT, mobile: true },
  { type: BUTTONS.SIZE_FULL_WIDTH, mobile: true },
  { type: BUTTONS.SEPARATOR, mobile: true },
  {
    keyName: 'replace',
    type: BUTTONS.VIDEO_REPLACE,
    icon: MediaReplaceIcon,
    mobile: true,
  },
  { type: BUTTONS.DELETE, mobile: true },
];


export default InlineButtons;
