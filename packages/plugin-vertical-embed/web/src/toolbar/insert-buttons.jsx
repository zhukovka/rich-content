import {
  TOOLBARS,
  decorateComponentWithProps,
  getModalStyles,
} from 'wix-rich-content-editor-common';
import { InsertPluginIcon } from '../icons';
import PostSelectionInputModal from './postSelectionInputModal';
import { DEFAULTS, VERTICAL_EMBED_TYPES } from '../constants';
import customStyles from './ModalCustomStyles';

export default ({ helpers, t, settings, isMobile }) => {
  // TODO: Change icon
  const icon = InsertPluginIcon;

  const buttonCreator = (type, tooltipText) => {
    return {
      type: 'modal',
      name: `VerticalEmbed-${type}`,
      tooltipText,
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
      Icon: icon,
      componentData: { ...DEFAULTS, type },
      helpers,
      t,
      modalElement: decorateComponentWithProps(PostSelectionInputModal, settings),
      modalStyles: getModalStyles({
        customStyles,
        fullScreen: false,
        isMobile,
      }),
    };
  };

  return [
    buttonCreator(VERTICAL_EMBED_TYPES.PRODUCT, 'Add a product'),
    buttonCreator(VERTICAL_EMBED_TYPES.EVENT, 'Add an event'),
    buttonCreator(VERTICAL_EMBED_TYPES.BOOKING, 'Add a booking'),
  ];
};
