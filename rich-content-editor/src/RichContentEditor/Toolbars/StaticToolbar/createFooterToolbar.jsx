import classNames from 'classnames';
import createStaticToolbar from './createStaticToolbar';
import Styles from '~/Styles/footer-toolbar.scss';

export default ({ buttons, theme }) => {
  const { toolbarStyles, buttonStyles, separatorStyles } = theme || {};
  const footerTheme = {
    toolbarStyles: {
      toolbar: classNames(Styles.toolbar, toolbarStyles && toolbarStyles.toolbar),
      buttons: classNames(Styles.buttons, toolbarStyles && toolbarStyles.buttons),
      extend: classNames(Styles.extend, toolbarStyles && toolbarStyles.extend)
    },
    buttonStyles,
    separatorStyles
  };

  return createStaticToolbar({
    name: 'FooterToolbar',
    theme: footerTheme,
    structure: buttons
  });
};
