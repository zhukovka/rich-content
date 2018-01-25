import decorateComponentWithProps from 'decorate-component-with-props';
import Separator from '~/Common/Separator';

export default ({ theme }) => {
  const separatorProps = { name: 'Separator' };
  if (theme && theme.separator) {
    separatorProps.className = theme.separator;
  }
  return decorateComponentWithProps(Separator, separatorProps);
};
