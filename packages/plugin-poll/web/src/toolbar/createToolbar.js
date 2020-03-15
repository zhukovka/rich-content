import {
  BUTTONS,
  TOOLBARS,
  PluginSettingsIcon,
  getModalStyles,
} from 'wix-rich-content-editor-common';

import { DEFAULT_COMPONENT_DATA } from '../constants';
import { InsertPluginIcon } from '../assets/icons';
import { Modals } from '../modals';

function togglePreviewMode(pubsub) {
  const { activeButton } = pubsub.get('componentState');

  pubsub.update('componentState', { isPreview: activeButton.isActive });
}

export function createToolbar({ helpers, t, isMobile }) {
  return {
    InlineButtons: [
      {
        keyName: 'toggle-preview',
        type: BUTTONS.TOGGLE,
        onClick: togglePreviewMode,
        icon: InsertPluginIcon,
        t,
        mobile: true,
        tooltipTextKey: 'toggle-preview',
      },
      { keyName: 'separator', type: BUTTONS.SEPARATOR, mobile: false },
      { keyName: 'sizeSmallCenter', type: BUTTONS.SIZE_SMALL_CENTER, mobile: false },
      { keyName: 'sizeContent', type: BUTTONS.SIZE_CONTENT, mobile: false },
      { keyName: 'sizeFullWidth', type: BUTTONS.SIZE_FULL_WIDTH, mobile: false },
      { keyName: 'separator', type: BUTTONS.SEPARATOR, mobile: false },
      { keyName: 'alignLeft', type: BUTTONS.SIZE_SMALL_LEFT, mobile: false },
      { keyName: 'alignCenter', type: BUTTONS.SIZE_CONTENT_CENTER, mobile: false },
      { keyName: 'alignRight', type: BUTTONS.SIZE_SMALL_RIGHT, mobile: false },
      { keyName: 'separator', type: BUTTONS.SEPARATOR, mobile: false },

      {
        keyName: 'settings',
        type: BUTTONS.EXTERNAL_MODAL,
        modalName: Modals.POLL_SETTINGS,
        icon: PluginSettingsIcon,
        modalStyles: getModalStyles(),
        t,
        mobile: false,
        tooltipTextKey: 'SettingsButton_Tooltip',
      },

      { keyName: 'delete', type: BUTTONS.DELETE, mobile: isMobile },
    ],
    InsertButtons: [
      {
        name: 'Poll',
        tooltipText: t('PollPlugin_InsertButton_Tooltip'),
        toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE],
        Icon: InsertPluginIcon,
        helpers,
        componentData: DEFAULT_COMPONENT_DATA,
        t,
      },
    ],
    name: 'poll',
  };
}
