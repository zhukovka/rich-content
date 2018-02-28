import decorateComponentWithProps from 'decorate-component-with-props';
import classNames from 'classnames';
import get from 'lodash/get';
import { baseUtils } from 'photography-client-lib/dist/src/utils/baseUtils';
import createStaticToolbar from './createStaticToolbar';
import { AddPluginButton, MobileTextButtonList } from '../buttons';
import { getTextButtonsFromList } from '../buttons/utils';
import toolbarStyles from '~/Styles/mobile-toolbar.scss';
import buttonStyles from '~/Styles/mobile-toolbar-button.scss';
import separatorStyles from '~/Styles/mobile-toolbar-separator.scss';

const getMobileTheme = theme => {
  const {
    toolbarStyles: toolbarTheme,
    buttonStyles: buttonTheme,
    separatorStyles: separatorTheme,
  } = theme || {};

  return {
    toolbarStyles: {
      toolbar: classNames(toolbarStyles.toolbar, toolbarTheme && toolbarTheme.toolbar, {
        [toolbarStyles.fixed]: !baseUtils.isiOS()
      }),
      buttons: classNames(toolbarStyles.buttons, toolbarTheme && toolbarTheme.buttons),
      extend: classNames(toolbarStyles.extend, toolbarTheme && toolbarTheme.extend)
    },
    buttonStyles: {
      buttonWrapper: classNames(buttonStyles.buttonWrapper, buttonTheme && buttonTheme.buttonWrapper),
      button: classNames(buttonStyles.button, buttonTheme && buttonTheme.button),
      icon: classNames(buttonStyles.icon, buttonTheme && buttonTheme.icon),
    },
    separatorStyles: {
      separator: classNames(separatorStyles.separator, separatorTheme && separatorTheme.separator),
    }
  };
};

const getMobileButtons = ({ buttons, helpers, pubsub, getEditorState, setEditorState, mobileTheme }) => {
  const textButtons = get(buttons, 'textButtons.mobile', MobileTextButtonList);
  const addPluginIndex = textButtons.findIndex(b => b === 'AddPlugin');
  if (addPluginIndex !== 1) {
    textButtons.splice(addPluginIndex, 1);
  }

  const structure = getTextButtonsFromList({
    buttons: textButtons,
    theme: mobileTheme
  });

  if (addPluginIndex !== -1) {
    structure.splice(addPluginIndex, 0, decorateComponentWithProps(AddPluginButton, {
      openModal: helpers.openModal,
      closeModal: helpers.closeModal,
      pluginButtons: buttons.pluginButtons,
      getEditorState,
      setEditorState,
      pubsub,
    }));
  }

  return structure;
};

export default ({ buttons, helpers, pubsub, getEditorState, setEditorState, theme, toolbarStyle }) => {
  const mobileTheme = getMobileTheme(theme);
  return createStaticToolbar({
    name: 'MobileToolbar',
    theme: mobileTheme,
    toolbarStyle,
    structure: getMobileButtons({ buttons, helpers, pubsub, getEditorState, setEditorState, mobileTheme }),
    isMobile: true
  });
};
