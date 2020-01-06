import { RichUtils } from 'draft-js';
import titleButton from '../TitleButton';
import createTextDropdownButton from './createTextDropdownButton';
import { TITLE_FONT_STYLE } from 'wix-rich-content-common';

const setBlockStyleByName = (getEditorState, setEditorState, value) =>
  setEditorState(RichUtils.toggleBlockType(getEditorState(), value));

const createButtonsFromOptions = dropdownOptions => {
  const buttonsfromOptions = dropdownOptions.map(option => {
    const font = TITLE_FONT_STYLE[option];
    return titleButton({
      value: TITLE_FONT_STYLE[option],
      keyName: option,
      tooltipTextKey: `${font}`,
    });
  });
  return buttonsfromOptions;
};

const findActiveBlockType = (dropdownOptions, value) => {
  const activeBlockType =
    dropdownOptions.find(obj => TITLE_FONT_STYLE[obj] === value) || dropdownOptions[0];
  return { textButtonKeyName: activeBlockType, value: TITLE_FONT_STYLE[activeBlockType] };
};

export default dropdownOptions => {
  return createTextDropdownButton({
    buttons: createButtonsFromOptions(dropdownOptions),
    activeItem: ({ value }) => {
      return findActiveBlockType(dropdownOptions, value);
    },
    onChange: setBlockStyleByName,
    tooltipTextKey: 'TitleButton_Tooltip',
  });
};
