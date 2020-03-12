import { RichUtils } from 'draft-js';
import createFontStyleButton from '../FontStyleButton';
import createTextDropdownButton from './createTextDropdownButton';
import { TITLE_FONT_STYLE, DEFAULT_FONTS_OPTIONS } from 'wix-rich-content-common';

const fontStyleButton = (option, content = false) => {
  const font = TITLE_FONT_STYLE[option];
  return createFontStyleButton({
    value: font,
    keyName: content || option,
    tooltipTextKey: font,
  });
};

const setBlockStyleByName = (getEditorState, setEditorState, value) =>
  setEditorState(RichUtils.toggleBlockType(getEditorState(), value));

const createButtonsFromOptions = dropdownOptions => {
  return dropdownOptions?.map(option => fontStyleButton(option, getContentForButton(option)));
};

const getContentForButton = option => {
  return option.length === 1 ? 'Paragraph' : `Heading ${option.slice(-1)}`;
};
const findActiveBlockType = (dropdownOptions, value) => {
  const activeBlockType =
    dropdownOptions.find(obj => TITLE_FONT_STYLE[obj] === value) || dropdownOptions[0];
  return {
    textButtonKeyName: getContentForButton(activeBlockType),
    value: TITLE_FONT_STYLE[activeBlockType],
  };
};

const createTextTitleButtonDropDown = dropdownOptions => {
  return createTextDropdownButton({
    buttons: createButtonsFromOptions(dropdownOptions),
    activeItem: ({ value }) => {
      return findActiveBlockType(dropdownOptions, value);
    },
    onChange: setBlockStyleByName,
    tooltipTextKey: 'TitleButton_Tooltip',
  });
};

export const createFontStyleStructure = (customSettings, isMobile) => {
  const customFontStyles = customSettings?.fontStyles || DEFAULT_FONTS_OPTIONS;
  return isMobile
    ? customFontStyles.map(option => fontStyleButton(option))
    : createTextTitleButtonDropDown(customFontStyles);
};
