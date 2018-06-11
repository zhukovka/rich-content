
import get from 'lodash/get';
import createInlineToolbar from './createInlineToolbar';
import { DesktopTextButtonList } from '../buttons/';
import { getTextButtonsFromList } from '../buttons/utils';


export default config => {
  const {
    buttons,
    defaultTextAlignment,
    pubsub,
    theme,
    isMobile,
    helpers,
    anchorTarget,
    relValue,
    t,
  } = config;
  const textButtons = get(buttons, 'desktop', DesktopTextButtonList);
  const structure = getTextButtonsFromList({ buttons: textButtons, pubsub, theme, t });

  return createInlineToolbar({
    name: 'InlineTextToolbar',
    structure,
    defaultTextAlignment,
    pubsub,
    theme,
    isMobile,
    helpers,
    anchorTarget,
    relValue,
    t
  });
};
