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

  // TODO: use mergeStyles again
  return {
    toolbarStyles: {
      toolbar: classNames(toolbarStyles.mobileToolbar, toolbarTheme && toolbarTheme.mobileToolbar, {
        [toolbarStyles.mobileToolbar_fixed]: !baseUtils.isiOS(),
        [toolbarTheme.mobileToolbar_fixed]: !baseUtils.isiOS(),
      }),
      buttons: classNames(toolbarStyles.mobileToolbar_buttons, toolbarTheme && toolbarTheme.mobileToolbar_buttons),
      extend: classNames(toolbarStyles.mobileToolbar_extend, toolbarTheme && toolbarTheme.mobileToolbar_extend)
    },
    buttonStyles: {
      buttonWrapper: classNames(buttonStyles.mobileToolbarButton_wrapper, buttonTheme && buttonTheme.mobileToolbarButton_wrapper),
      button: classNames(buttonStyles.mobileToolbarButton, buttonTheme && buttonTheme.mobileToolbarButton),
      icon: classNames(buttonStyles.mobileToolbarButton_icon, buttonTheme && buttonTheme.mobileToolbarButton_icon),
    },
    separatorStyles: {
      separator: classNames(separatorStyles.mobileToolbarSeparator, separatorTheme && separatorTheme.mobileToolbarSeparator),
    }
  };
};

const getMobileButtons = ({ buttons, helpers, pubsub, getEditorState, setEditorState, mobileTheme }) => {
  const textButtons = get(buttons, 'textButtons.mobile', MobileTextButtonList);
  const addPluginIndex = textButtons.findIndex(b => b === 'AddPlugin');
  if (addPluginIndex !== -1) {
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
