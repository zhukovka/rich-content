
import get from 'lodash/get';
import createInlineToolbar from './createInlineToolbar';
import { DesktopTextButtonList } from '../buttons/';
import { getTextButtonsFromList } from '../buttons/utils';


export default ({ buttons, pubsub, theme, isMobile }) => {
  const textButtons = get(buttons, 'desktop', DesktopTextButtonList);
  const structure = getTextButtonsFromList({ buttons: textButtons, pubsub, theme });

  return createInlineToolbar({
    name: 'TextToolbar',
    structure,
    pubsub,
    theme,
    isMobile
  });
};
