import decorateComponentWithProps from 'decorate-component-with-props';
import Separator from '~/Components/Separator';

export default ({ theme = {}, horizontal = false }) => {
  const separatorProps = { name: 'Separator', horizontal };
  const { separatorStyles } = theme;
  if (separatorStyles && separatorStyles.inlineToolbarSeparator) {
    separatorProps.className = separatorStyles.inlineToolbarSeparator;
  }
  return decorateComponentWithProps(Separator, separatorProps);
};
