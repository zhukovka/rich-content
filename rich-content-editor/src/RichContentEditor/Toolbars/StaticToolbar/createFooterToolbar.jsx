import decorateComponentWithProps from 'decorate-component-with-props';
import createStaticToolbar from './createStaticToolbar';
import toolbarStyles from '~/Styles/footer-toolbar.scss';

export default ({ buttons }) => {
  const theme = { toolbarStyles };
  const structure = buttons.map(button => decorateComponentWithProps(button, { hideName: true }));
  return createStaticToolbar({
    name: 'FooterToolbar',
    theme,
    structure,
  });
};
