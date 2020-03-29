import { BUTTONS, TOOLBARS, getModalStyles } from 'wix-rich-content-editor-common';

import { DEFAULT_COMPONENT_DATA } from '../constants';
import { InsertPluginIcon } from '../assets/icons';
import { Modals } from '../modals';

const modalStyles = {
  customStyles: {
    overlay: {
      backgroundColor: 'transparent',
    },
    content: {
      border: '1px solid rgba(255, 255, 255, 0.25)',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1)',
    },
  },
};

export function createToolbar({ helpers, t }) {
  return {
    InlineButtons: [
      {
        keyName: 'customize',
        type: BUTTONS.EXTERNAL_MODAL,
        modalName: Modals.POLL_CUSTOMIZE,
        children: 'Customize',
        modalStyles: getModalStyles(modalStyles),
        t,
        tooltipTextKey: 'Poll_FormatToolbar_Customize_Tooltip',
      },

      { keyName: 'separator', type: BUTTONS.SEPARATOR },

      {
        keyName: 'settings',
        type: BUTTONS.EXTERNAL_MODAL,
        modalName: Modals.POLL_SETTINGS,
        children: t('Poll_PollSettings_Tab_Settings_TabName'),
        modalStyles: getModalStyles(modalStyles),
        t,
        tooltipTextKey: 'Poll_FormatToolbar_Settings_Tooltip',
      },

      { keyName: 'separator', type: BUTTONS.SEPARATOR },

      { keyName: 'delete', type: BUTTONS.DELETE },
    ],
    InsertButtons: [
      {
        name: 'Poll',
        tooltipText: t('Poll_InsertPoll_Tooltip'),
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
