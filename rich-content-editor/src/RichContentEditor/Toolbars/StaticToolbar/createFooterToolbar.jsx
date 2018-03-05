import classNames from 'classnames';
import createStaticToolbar from './createStaticToolbar';
import toolbarStyles from '~/Styles/footer-toolbar.scss';

const getFooterTheme = theme => {
  const {
    toolbarStyles: toolbarTheme,
    buttonStyles,
    separatorStyles: separatorTheme,
    ...rest
  } = theme || {};

  return {
    toolbarStyles: {
      toolbar: classNames(
        toolbarStyles.footerToolbar,
        toolbarTheme && toolbarTheme.footerToolbar,
      ),
      buttons: classNames(
        toolbarStyles.footerToolbar_buttons,
        toolbarTheme && toolbarTheme.footerToolbar_buttons
      ),
      extend: classNames(
        toolbarStyles.footerToolbar_extend,
        toolbarTheme && toolbarTheme.footerToolbar_extend
      ),
      responsiveArrow: classNames(
        toolbarStyles.footerToolbar_responsiveArrow,
        toolbarTheme && toolbarTheme.footerToolbar_responsiveArrow
      ),
      responsiveArrowLeft: classNames(
        toolbarStyles.footerToolbar_responsiveArrowLeft,
        toolbarTheme && toolbarTheme.footerToolbar_responsiveArrowLeft
      ),
      responsiveArrowRight: classNames(
        toolbarStyles.footerToolbar_responsiveArrowRight,
        toolbarTheme && toolbarTheme.footerToolbar_responsiveArrowRight
      ),
    },
    buttonStyles: {
      buttonWrapper: buttonStyles && buttonStyles.footerToolbarButton_wrapper,
      button: buttonStyles && buttonStyles.footerToolbarButton,
      icon: buttonStyles && buttonStyles.footerToolbarButton_icon,
    },
    separatorStyles: {
      separator: separatorTheme && separatorTheme.footerToolbarSeparator
    },
    ...rest
  };
};

export default ({ buttons, theme, toolbarStyle }) => {
  const footerTheme = getFooterTheme(theme);
  return createStaticToolbar({
    name: 'FooterToolbar',
    theme: footerTheme,
    toolbarStyle,
    structure: buttons
  });
};
