import createStaticToolbar from 'draft-js-static-toolbar-plugin';
import decorateComponentWithProps from 'decorate-component-with-props';
import 'draft-js-static-toolbar-plugin/lib/plugin.css';
import toolbarStyles from '~/Styles/static-toolbar.scss';
import buttonStyles from '~/Styles/toolbar-button.scss';

export default ({ pluginButtons }) => {
  const buttons = pluginButtons.map(button => decorateComponentWithProps(button, { hideName: true }));
  return createStaticToolbar({
    theme: { buttonStyles, toolbarStyles },
    structure: buttons,
  });
};
