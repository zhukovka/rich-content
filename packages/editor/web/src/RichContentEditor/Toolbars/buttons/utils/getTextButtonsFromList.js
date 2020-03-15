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
import { createFontStyleStructure } from './createFontStyleButton';

export default ({ buttons, theme, t, isMobile, textPluginButtons = {}, uiSettings, config }) => {
  const themedSeparator = horizontal => createThemedSeparator({ theme, horizontal });
  const customSettings = config
    ?.getToolbarSettings?.({})
    .find(setting => setting.name === TOOLBARS.TEXT);
  const icons = customSettings?.getIcons?.() || {};
  const fontStylesButton = createFontStyleStructure(customSettings, isMobile, icons);

  const buttonsMap = {
    Title: fontStylesButton,
    Bold: boldButton(icons.Bold),
    Italic: italicButton(icons.Italic),
    Underline: underlineButton(icons.Underline),
    Indent: indentButton(icons.Indent),
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
    ...textPluginButtons,
  };

  const buttonCompArray = buttons
    .map(buttonName => buttonsMap[buttonName])
    .filter(x => x)
    .flat();

  return buttonCompArray.map(b =>
    decorateComponentWithProps(b, { t, isMobile, uiSettings, config })
  );
};
