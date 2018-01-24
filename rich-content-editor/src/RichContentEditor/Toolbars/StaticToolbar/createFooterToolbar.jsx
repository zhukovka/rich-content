import decorateComponentWithProps from 'decorate-component-with-props';
import createStaticToolbar from './createStaticToolbar';

export default ({ pluginButtons }) => {
  const buttons = pluginButtons.map(button => decorateComponentWithProps(button, { hideName: true }));

  return createStaticToolbar({
    structure: buttons,
  });
};
