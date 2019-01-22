import { DEFAULTS, MobileFullScreenCustomStyle, DesktopFlyOutModalStyles } from '../constants';
import { getModalStyles, TOOLBARS, WixUtils, DECORATION_MODE, decorateComponentWithProps } from 'wix-rich-content-common';
import UnsplashApiInputModal from './unsplashApiInputModal';
import { InsertPluginIcon } from '../icons';
import Arrow from './arrow';

export default ({ helpers, t, settings }) => {
  return [
    {
      type: 'modal',
      name: 'GIF',
      tooltipText: t('UnsplashPlugin_InsertButton_Tooltip'),
      Icon: InsertPluginIcon,
      componentData: DEFAULTS,
      toolbars: [TOOLBARS.FOOTER],
      modalElement: decorateComponentWithProps(UnsplashApiInputModal, settings),
      modalStyles: WixUtils.isMobile() ?
        getModalStyles({ customStyles: MobileFullScreenCustomStyle, fullScreen: true }) : null,
      modalStylesFn: ({ buttonRef }) => {
        const modalStyles = getModalStyles({ customStyles: DesktopFlyOutModalStyles, fullScreen: true });
        const { top, left } = buttonRef.getBoundingClientRect();
        const modalLeft = left - 15;
        const modalTop = top - 386;
        return { ...modalStyles, content: { ...modalStyles.content, top: modalTop, left: modalLeft, margin: 0, position: 'absolute' } };
      },
      modalDecorations: [{
        decorationMode: DECORATION_MODE.APPEND,
        decorator: Arrow
      }],
      helpers
    }
  ];
};
