
import createInlineToolbar from './createInlineToolbar';
import { getTextButtonsFromList } from '../buttons/utils';


export default ({ buttons, theme }) => {
  const structure = getTextButtonsFromList({ buttons, theme });

  return createInlineToolbar({
    name: 'TextToolbar',
    structure,
    theme,
  });
};
