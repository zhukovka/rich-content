import createStaticToolbar from './createStaticToolbar';
import { TextButtonList } from '../buttons';
import { getTextButtonsFromList } from '../buttons/utils';
import toolbarStyles from '~/Styles/mobile-toolbar.scss';
import buttonStyles from '~/Styles/mobile-toolbar-button.scss';

export default ({ buttons }) => {
  const theme = { buttonStyles, toolbarStyles };
  let structure;

  if (buttons) {
    structure = getTextButtonsFromList({ buttons, theme });
  } else {
    structure = getTextButtonsFromList({
      buttons: [
        ...TextButtonList.filter(buttonName => buttonName !== 'Separator'),
        'Separator'
      ],
      theme
    });
  }
  return createStaticToolbar({
    name: 'MobileToolbar',
    theme,
    structure,
  });
};
