import createStaticToolbar from './createStaticToolbar';
import { TextButtonList } from '../buttons';
import { getTextButtonsFromList } from '../buttons/utils';
import toolbarStyles from '~/Styles/mobile-toolbar.scss';
import buttonStyles from '~/Styles/mobile-toolbar-button.scss';
import separatorStyles from '~/Styles/mobile-toolbar-separator.scss';

export default ({ buttons }) => {
  const theme = { buttonStyles, toolbarStyles, separatorStyles };
  let structure;

  if (buttons) {
    structure = getTextButtonsFromList({ buttons, theme });
  } else {
    structure = getTextButtonsFromList({
      buttons: [
        ...TextButtonList.filter(buttonName => buttonName !== 'Separator'),
        'Separator',
        'AddPlugin'
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
