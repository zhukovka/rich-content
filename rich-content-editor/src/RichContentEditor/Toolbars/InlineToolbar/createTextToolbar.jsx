
import createInlineToolbar from './createInlineToolbar';
import { getTextButtonsFromList } from '../buttons/utils';


export default ({ buttons, pubsub, theme, isMobile }) => {
  const structure = getTextButtonsFromList({ buttons, pubsub, theme });

  return createInlineToolbar({
    name: 'TextToolbar',
    structure,
    pubsub,
    theme,
    isMobile
  });
};
