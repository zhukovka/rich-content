import { BUTTONS, TOOLBARS, getModalStyles } from 'wix-rich-content-editor-common';

import { TABS } from '../components/settings';
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
        keyName: 'layout',
        type: BUTTONS.EXTERNAL_MODAL,
        modalName: Modals.POLL_SETTINGS,
        children: t('Poll_PollSettings_Tab_Layout_TabName'),
        modalStyles: getModalStyles(modalStyles),
        t,
        tooltipTextKey: 'Poll_PollSettings_Common_Header',
        activeTab: TABS.LAYOUT,
      },

      { keyName: 'separator', type: BUTTONS.SEPARATOR },

      {
        keyName: 'design',
        type: BUTTONS.EXTERNAL_MODAL,
        modalName: Modals.POLL_SETTINGS,
        children: t('Poll_PollSettings_Tab_Design_TabName'),
        modalStyles: getModalStyles(modalStyles),
        t,
        tooltipTextKey: 'Poll_PollSettings_Common_Header',
        activeTab: TABS.DESIGN,
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
        activeTab: TABS.SETTINGS,
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
