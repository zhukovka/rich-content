import classNames from 'classnames';
import createStaticToolbar from './createStaticToolbar';
import { TextButtonList } from '../buttons';
import { getTextButtonsFromList } from '../buttons/utils';
import toolbarStyles from '~/Styles/mobile-toolbar.scss';
import buttonStyles from '~/Styles/mobile-toolbar-button.scss';
import separatorStyles from '~/Styles/mobile-toolbar-separator.scss';

export default ({ buttons, pubsub, theme }) => {
  const {
    toolbarStyles: toolbarTheme,
    buttonStyles: buttonTheme,
    separatorStyles: separatorTheme,
  } = theme || {};
  const mobileTheme = {
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

  let structure;
  if (buttons) {
    structure = getTextButtonsFromList({ buttons, pubsub, theme: mobileTheme });
  } else {
    structure = getTextButtonsFromList({
      buttons: [
        ...TextButtonList.filter(buttonName => buttonName !== 'Separator'),
        'Separator',
        'AddPlugin'
      ],
      pubsub,
      theme: mobileTheme
    });
  }
  return createStaticToolbar({
    name: 'MobileToolbar',
    theme: mobileTheme,
    structure,
    isMobile: true
  });
};
