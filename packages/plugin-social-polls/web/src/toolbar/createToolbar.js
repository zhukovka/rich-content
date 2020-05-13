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
    width: '450px',
    maxWidth: '450px',
    boxSizing: 'border-box',
    height: '220px',
    overflow: 'visible',
    border: '1px solid #ccc',
    padding: '20px 25px 25px 25px',
    display: 'block',
    borderRadius: '2px',
    position: 'absolute',
    margin: '0 0 0 20px',
    zIndex: 6,
  },
};

const modalStyles = {
  customStyles: {
    overlay: {
      backgroundColor: 'transparent',
      zIndex: 10,
    },
    content: {
      border: '1px solid rgba(255, 255, 255, 0.25)',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1)',
    },
  },
};

export function createToolbar({ isMobile, helpers, t }) {
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
        mobile: false,
      },

      {
        keyName: 'design',
        type: BUTTONS.EXTERNAL_MODAL,
        modalName: Modals.POLL_SETTINGS,
        children: t('Poll_PollSettings_Tab_Design_TabName'),
        modalStyles: getModalStyles(modalStyles),
        t,
        activeTab: TABS.DESIGN,
        mobile: false,
      },

      {
        keyName: 'settings',
        type: BUTTONS.EXTERNAL_MODAL,
        modalName: Modals.POLL_SETTINGS,
        children: t('Poll_PollSettings_Tab_Settings_TabName'),
        modalStyles: getModalStyles(modalStyles),
        t,
        tooltipTextKey: 'Poll_FormatToolbar_Settings_Tooltip',
        activeTab: TABS.SETTINGS,
        mobile: false,
      },

      { keyName: 'separator', mobile: false, type: BUTTONS.SEPARATOR },

      { keyName: 'delete', mobile: true, type: BUTTONS.DELETE },
    ],
    InsertButtons: isMobile
      ? []
      : [
          {
            type: 'modal',
            name: 'Poll',
            tooltipText: t('Poll_InsertPoll_Tooltip'),
            Icon: InsertPluginIcon,
            componentData: DEFAULT_COMPONENT_DATA,
            toolbars: [TOOLBARS.FOOTER],
            modalElement: decorateComponentWithProps(PollPresetSelector),
            modalStylesFn: ({ buttonRef }) => {
              return getBottomToolbarModalStyles(buttonRef, {
                customStyles: DesktopFlyOutModalStyles,
                centered: true,
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
