import classNames from 'classnames';
import createStaticToolbar from './createStaticToolbar';
import Styles from '~/Styles/footer-toolbar.scss';

export default ({ buttons, theme, toolbarStyle }) => {
  const { toolbarStyles, buttonStyles, separatorStyles } = theme || {};
  const footerTheme = {
    toolbarStyles: {
      toolbar: classNames(Styles.footerToolbar, toolbarStyles && toolbarStyles.footerToolbar),
      buttons: classNames(Styles.footerToolbar_buttons, toolbarStyles && toolbarStyles.footerToolbar_buttons),
      extend: classNames(Styles.footerToolbar_extend, toolbarStyles && toolbarStyles.footerToolbar_extend)
    },
    buttonStyles,
    separatorStyles
  };

  return createStaticToolbar({
    name: 'FooterToolbar',
    theme: footerTheme,
    toolbarStyle,
    structure: buttons
  });
};
