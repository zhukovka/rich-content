import createStaticToolbar from './createStaticToolbar';
import { getTextButtonsFromList } from '../buttons/utils';
import buttonStyles from '~/Styles/mobile-toolbar-button.scss';

export default ({ buttons }) => {
  const theme = { buttonStyles };
  const structure = getTextButtonsFromList({ buttons, theme, isMobile: true });
  return createStaticToolbar({
    name: 'MobileToolbar',
    theme,
    structure,
  });
};
