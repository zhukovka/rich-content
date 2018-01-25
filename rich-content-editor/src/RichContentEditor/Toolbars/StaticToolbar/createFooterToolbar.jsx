import decorateComponentWithProps from 'decorate-component-with-props';
import createStaticToolbar from './createStaticToolbar';

export default ({ buttons }) => {
  const structure = buttons.map(button => decorateComponentWithProps(button, { hideName: true }));

  return createStaticToolbar({
    name: 'FooterToolbar',
    structure,
  });
};
