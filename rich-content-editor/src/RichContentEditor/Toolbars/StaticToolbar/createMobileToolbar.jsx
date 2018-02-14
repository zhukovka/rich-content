import decorateComponentWithProps from 'decorate-component-with-props';
import classNames from 'classnames';
import createStaticToolbar from './createStaticToolbar';
import { AddPluginButton, TextButtonList } from '../buttons';
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
      toolbar: classNames(toolbarStyles.toolbar, toolbarTheme && toolbarTheme.toolbar),
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
  const textButtons = buttons && buttons.textButtons ? buttons.textButtons : TextButtonList.filter(buttonName => buttonName.indexOf('Separator') === -1);
  const structure = getTextButtonsFromList({
    buttons: textButtons,
    theme: mobileTheme
  });
  structure.push(decorateComponentWithProps(AddPluginButton, {
    openExternalModal: helpers.openExternalModal,
    closeExternalModal: helpers.closeExternalModal,
    pluginButtons: buttons.pluginButtons,
    getEditorState,
    setEditorState,
    pubsub,
  }));

  return structure;
};

export default ({ buttons, helpers, pubsub, getEditorState, setEditorState, theme }) => {
  const mobileTheme = getMobileTheme(theme);
  return createStaticToolbar({
    name: 'MobileToolbar',
    theme: mobileTheme,
    structure: getMobileButtons({ buttons, helpers, pubsub, getEditorState, setEditorState, mobileTheme }),
    isMobile: true
  });
};
