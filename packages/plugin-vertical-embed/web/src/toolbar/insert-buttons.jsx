import {
  TOOLBARS,
  decorateComponentWithProps,
  getModalStyles,
} from 'wix-rich-content-editor-common';
import { InsertPluginIcon } from '../icons';
import PostSelectionInputModal from './postSelectionInputModal';
import { DEFAULTS } from '../constants';
import customStyles from './ModalCustomStyles';

export default ({ helpers, t, settings, isMobile }) => {
  // TODO: Change icon
  const icon = InsertPluginIcon;

  return [
    {
      type: 'modal',
      name: 'VerticalEmbed',
      tooltipText: t('Vertical_Embed_Toolbar_Tooltip'),
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
      Icon: icon,
      componentData: DEFAULTS,
      helpers,
      t,
      modalElement: decorateComponentWithProps(PostSelectionInputModal, settings),
      modalStyles: getModalStyles({
        customStyles,
        fullScreen: false,
        isMobile,
      }),
    },
  ];
};
