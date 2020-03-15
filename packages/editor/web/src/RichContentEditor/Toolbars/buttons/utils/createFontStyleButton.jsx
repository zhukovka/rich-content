import { RichUtils } from 'draft-js';
import createFontStyleButton from '../FontStyleButton';
import createTextDropdownButton from './createTextDropdownButton';
import { TITLE_FONT_STYLE, DEFAULT_FONTS_DROPDOWN_OPTIONS } from 'wix-rich-content-editor-common';
import { titleButton } from '../index';

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
    buttonContent: getContentForButton(activeBlockType),
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
    showArrowIcon: true,
  });
};

export const createFontStyleStructure = (customSettings, isMobile, icons) => {
  const { headersDropdown } = customSettings;
  if (isMobile || !headersDropdown) {
    return titleButton(icons.inactiveIconTitle, icons.TitleOne, icons.TitleTwo);
  } else {
    const customFontStyles = Array.isArray(headersDropdown)
      ? headersDropdown
      : DEFAULT_FONTS_DROPDOWN_OPTIONS;
    return createTextTitleButtonDropDown(customFontStyles);
  }
};
