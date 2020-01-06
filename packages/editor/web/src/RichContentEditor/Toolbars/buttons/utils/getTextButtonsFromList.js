import { decorateComponentWithProps, TOOLBARS } from 'wix-rich-content-editor-common';
import {
  boldButton,
  italicButton,
  underlineButton,
  indentButton,
  blockquoteButton,
  alignTextLeftButton,
  alignTextCenterButton,
  alignTextRightButton,
  alignTextJustifyButton,
  orderedListButton,
  unorderedListButton,
  textAlignmentButton,
} from '../index';
import createThemedSeparator from './createThemedSeparator';
import createTextTitleButton from './createTextTitleButton';
import { DEFAULT_FONTS_OPTIONS } from 'wix-rich-content-common';

export default ({ buttons, theme, t, isMobile, textPluginButtons, uiSettings, config }) => {
  const themedSeparator = horizontal => createThemedSeparator({ theme, horizontal });
  const customSettings = config
    ?.getToolbarSettings?.({})
    .find(setting => setting.name === TOOLBARS.TEXT);
  const icons = customSettings?.getIcons?.() || {};
  const customFontStyles = customSettings?.fontStyles || DEFAULT_FONTS_OPTIONS;
  const buttonByName = {
    Bold: boldButton(icons.Bold),
    Italic: italicButton(icons.Italic),
    Underline: underlineButton(icons.Underline),
    Indent: indentButton(icons.Indent),
    Title: createTextTitleButton(customFontStyles),
    Blockquote: blockquoteButton(icons.Blockquote),
    Alignment: textAlignmentButton(icons),
    AlignLeft: alignTextLeftButton(icons.AlignLeft),
    AlignCenter: alignTextCenterButton(icons.AlignCenter),
    AlignRight: alignTextRightButton(icons.AlignRight),
    AlignJustify: alignTextJustifyButton(icons.AlignJustify),
    OrderedList: orderedListButton(icons.OrderedList),
    UnorderedList: unorderedListButton(icons.UnorderedList),
    Separator: themedSeparator(false),
    HorizontalSeparator: themedSeparator(true),
  };

  let buttonMap = buttonByName;
  if (textPluginButtons) {
    buttonMap = Object.assign(buttonMap, textPluginButtons);
  }

  const structure = buttons.map(buttonName => buttonMap[buttonName]).filter(b => b !== undefined);

  return structure.map(b => decorateComponentWithProps(b, { t, isMobile, uiSettings, config }));
};
