import {
  BUTTONS,
  TOOLBARS,
  getModalStyles,
  DECORATION_MODE,
  decorateComponentWithProps,
  getBottomToolbarModalStyles,
} from 'wix-rich-content-editor-common';

import { TABS } from '../components/settings';
import { DEFAULT_COMPONENT_DATA } from '../constants';
import { InsertPluginIcon } from '../assets/icons';
import { Modals } from '../modals';
import { PollPresetSelector, Arrow } from '../components/settings/preset-selector';

export const DesktopFlyOutModalStyles = {
  overlay: {
    backgroundColor: 'transparent',
  },
  content: {
    width: '410px',
    boxSizing: 'border-box',
    height: '180px',
    overflow: 'visible',
    border: '1px solid #ccc',
    padding: '10px',
    display: 'block',
    borderRadius: '2px',
    position: 'absolute',
    zIndex: 6,
    paddingTop: '9px',
  },
};

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
        mobile: true,
      },

      { keyName: 'separator', type: BUTTONS.SEPARATOR, mobile: true },

      {
        keyName: 'design',
        type: BUTTONS.EXTERNAL_MODAL,
        modalName: Modals.POLL_SETTINGS,
        children: t('Poll_PollSettings_Tab_Design_TabName'),
        modalStyles: getModalStyles(modalStyles),
        t,
        tooltipTextKey: 'Poll_PollSettings_Common_Header',
        activeTab: TABS.DESIGN,
        mobile: true,
      },

      { keyName: 'separator', type: BUTTONS.SEPARATOR, mobile: true },

      {
        keyName: 'settings',
        type: BUTTONS.EXTERNAL_MODAL,
        modalName: Modals.POLL_SETTINGS,
        children: t('Poll_PollSettings_Tab_Settings_TabName'),
        modalStyles: getModalStyles(modalStyles),
        t,
        tooltipTextKey: 'Poll_FormatToolbar_Settings_Tooltip',
        activeTab: TABS.SETTINGS,
        mobile: true,
      },

      { keyName: 'separator', mobile: true, type: BUTTONS.SEPARATOR },

      { keyName: 'delete', mobile: true, type: BUTTONS.DELETE },
    ],
    InsertButtons: [
      {
        type: 'modal',
        name: 'Poll',
        tooltipText: t('Poll_InsertPoll_Tooltip'),
        Icon: InsertPluginIcon,
        componentData: DEFAULT_COMPONENT_DATA,
        toolbars: [TOOLBARS.FOOTER, TOOLBARS.SIDE, TOOLBARS.MOBILE],
        modalElement: decorateComponentWithProps(PollPresetSelector),
        modalStylesFn: ({ buttonRef }) => {
          return getBottomToolbarModalStyles(buttonRef, {
            customStyles: DesktopFlyOutModalStyles,
          });
        },
        modalDecorations: [
          {
            decorationMode: DECORATION_MODE.APPEND,
            decorator: Arrow,
          },
        ],
        helpers,
        t,
      },
    ],
    name: 'poll',
  };
}
