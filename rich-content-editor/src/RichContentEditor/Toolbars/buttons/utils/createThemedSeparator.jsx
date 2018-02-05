import decorateComponentWithProps from 'decorate-component-with-props';
import Separator from '~/Components/Separator';

export default ({ theme = {} }) => {
  const separatorProps = { name: 'Separator' };
  const { separatorStyles } = theme;
  if (separatorStyles && separatorStyles.separator) {
    separatorProps.className = separatorStyles.separator;
  }
  return decorateComponentWithProps(Separator, separatorProps);
};
