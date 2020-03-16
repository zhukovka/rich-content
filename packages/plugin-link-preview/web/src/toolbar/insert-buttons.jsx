import { DEFAULTS } from '../defaults';
import { getModalStyles, TOOLBARS } from 'wix-rich-content-editor-common';
import { embedPluginIcon } from '../icons';
import embedURLInputModal from './embedURLInputModal';

const customStyles = {
  content: {
    maxWidth: '460px',
    minHeight: '262px',
  },
};

export default ({ helpers, settings, isMobile }) => {
  if (isMobile) {
    customStyles.content.minHeight = '202px';
  }
  const icon = settings?.toolbar?.icons?.InsertPluginButtonIcon || embedPluginIcon;
  const socialTypes = ['Instagram', 'Twitter', 'Facebook', 'TikTok', 'Pinterest'];
  return socialTypes.map(socialType => {
    return {
      type: 'modal',
      name: socialType,
      tooltipText: `Add a ${socialType} post`,
      Icon: icon,
      componentData: { ...DEFAULTS, socialType, fetchMetadata: settings.fetchMetadata },
      toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
      helpers,
      modalElement: embedURLInputModal,
      modalStyles: getModalStyles({ customStyles, fullScreen: false, isMobile }),
    };
  });
};
