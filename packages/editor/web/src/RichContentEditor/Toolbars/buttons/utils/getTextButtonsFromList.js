/* eslint-disable fp/no-delete */
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

export default ({ buttons, theme, t, isMobile, textPluginButtons = {}, uiSettings, config }) => {
  const themedSeparator = horizontal => createThemedSeparator({ theme, horizontal });
  const customSettings =
    config?.getToolbarSettings?.({}).find(setting => setting.name === TOOLBARS.TEXT) || {};
  const icons = customSettings?.getIcons?.() || {};
  const headingKeyName = Object.keys(textPluginButtons).find(buttonName =>
    buttonName.includes('Heading')
  );
  const { [headingKeyName]: headingButton, ...otherPluginButtons } = textPluginButtons;
  const buttonsMap = {
    Bold: boldButton(icons.Bold),
    Italic: italicButton(icons.Italic),
    Underline: underlineButton(icons.Underline),
    Indent: indentButton(icons.Indent),
    Title: headingButton,
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
    ...otherPluginButtons,
  };
  const buttonCompArray = [];
  const customHeadings = config?.Headings?.headersDropdown;

  if (customHeadings) {
    buttonCompArray.push(...[headingButton, buttonsMap.Separator]);
    buttons = buttons.filter(buttonName => buttonName !== 'Title');
  }
  buttonCompArray.push(...buttons.map(buttonName => buttonsMap[buttonName]).filter(x => x));

  return buttonCompArray.map(b =>
    decorateComponentWithProps(b, { t, isMobile, uiSettings, config })
  );
};
