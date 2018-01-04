import React, { Component } from 'react';
import decorateComponentWithProps from 'decorate-component-with-props';
import classNames from 'classnames';
import createInlineToolbarPlugin, {Separator} from 'draft-js-inline-toolbar-plugin';
import {
  BoldButton,
  ItalicButton,
  TitleButton,
  BlockquoteButton,
  TextAlignmentButton,
  UnorderedListButton,
  OrderedListButton,
  TextLinkButton,
} from './buttons';
import toolbarStyles from '~/Styles/text-toolbar.scss';
import buttonStyles from '~/Styles/text-toolbar-button.scss';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';


//TODO: expose to consumer
const StyledSeparator = decorateComponentWithProps(Separator, { name: 'Separator', className: toolbarStyles.separator });

const TextButtonList = [
  'Bold',
  'Italic',
  'Title',
  'Blockquote',
  'Separator',
  'Alignment',
  'OrderedList',
  'UnorderedList',
  'Separator',
  'Link',
];

const activeButtons = reqeustedButtons => {
  const buttons = [];
  reqeustedButtons.forEach(button_name => {
    switch(button_name) {
      case 'Bold': buttons.push(BoldButton);
        break;
      case 'Italic': buttons.push(ItalicButton);
        break;
      case 'Title': buttons.push(TitleButton);
        break;
      case 'Blockquote': buttons.push(BlockquoteButton);
        break;
      case 'Alignment': buttons.push(TextAlignmentButton);
        break;
      case 'OrderedList': buttons.push(OrderedListButton);
          break;
      case 'UnorderedList': buttons.push(UnorderedListButton);
        break;
      case 'Link': buttons.push(TextLinkButton);
        break;
      case 'Separator': buttons.push(StyledSeparator);
          break;
      default: console.warn(`Failed to load uknown text button "${button_name}"`);
        break;

    }
  });
  return buttons;
};

const createTextToolbar = ({buttons = TextButtonList, theme = { buttonStyles, toolbarStyles }}) => {
  const structure = activeButtons(buttons);
  return createInlineToolbarPlugin({
    structure,
    theme
  });
}

export default createTextToolbar;
export { TextButtonList };
