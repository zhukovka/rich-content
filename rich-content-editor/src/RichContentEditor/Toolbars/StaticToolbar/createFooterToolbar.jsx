import decorateComponentWithProps from 'decorate-component-with-props';
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

  const structure = buttons.map(button => decorateComponentWithProps(button, { hideName: true }));

  return createStaticToolbar({
    name: 'FooterToolbar',
    theme: footerTheme,
    structure,
  });
};
