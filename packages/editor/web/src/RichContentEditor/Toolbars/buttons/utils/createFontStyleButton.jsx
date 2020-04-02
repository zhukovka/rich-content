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

const createButtonsFromOptions = (dropdownOptions, t) => {
  return dropdownOptions?.map(option => fontStyleButton(option, getContentForButton(option, t)));
};

const getContentForButton = (option, t) => {
  return option.length === 1
    ? t('FormattingToolbar_TextStyle_Paragraph')
    : t('FormattingToolbar_TextStyle_Heading', { number: option.slice(-1) });
};
const findActiveBlockType = (dropdownOptions, value, t) => {
  const activeBlockType =
    dropdownOptions.find(obj => TITLE_FONT_STYLE[obj] === value) || dropdownOptions[0];
  return {
    buttonContent: getContentForButton(activeBlockType, t),
    value: TITLE_FONT_STYLE[activeBlockType],
  };
};

const createTextTitleButtonDropDown = (dropdownOptions, t) => {
  return createTextDropdownButton({
    buttons: createButtonsFromOptions(dropdownOptions, t),
    activeItem: ({ value }) => {
      return findActiveBlockType(dropdownOptions, value, t);
    },
    onChange: setBlockStyleByName,
    tooltipTextKey: 'TitleButton_Tooltip',
    showArrowIcon: true,
    dataHookTextWrapper: 'textBlockStyleButton_Title',
  });
};

export const createFontStyleStructure = (customSettings, isMobile, icons, t) => {
  const { headersDropdown } = customSettings;
  if (isMobile || !headersDropdown) {
    return titleButton(icons.inactiveIconTitle, icons.TitleOne, icons.TitleTwo);
  } else {
    const customFontStyles = Array.isArray(headersDropdown)
      ? headersDropdown
      : DEFAULT_FONTS_DROPDOWN_OPTIONS;
    return createTextTitleButtonDropDown(customFontStyles, t);
  }
};
