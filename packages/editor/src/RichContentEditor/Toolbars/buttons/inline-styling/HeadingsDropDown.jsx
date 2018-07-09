import { RichUtils } from '@wix/draft-js';

import { getSelectionStyles } from 'wix-rich-content-common';
import createInlineStyleButton from './createInlineStyleButton';
import createInlineStyleDropDown from './createInlineStyleDropDown';
import styles from '../../../../../statics/styles/heading-buttons.scss';

const headings = [{
  style: 'inline-normal-text', // TODO: common style consts
  labelKey: 'NormalTextButton_label',
  tooltipTextKey: 'NorNormalTextButton_tooltip',
  className: styles.normalTextButton
}, {
  style: 'inline-header-one',
  labelKey: 'HeadingOneButton_label',
  tooltipTextKey: 'HeadingOneButton_tooltip',
  className: styles.headingOneButton
}, {
  style: 'inline-header-two',
  labelKey: 'HeadingTwoButton_label',
  tooltipTextKey: 'HeadingTwoButton_tooltip',
  className: styles.headingTwoButton
}, {
  style: 'inline-header-three',
  labelKey: 'HeadingThreeButton_label',
  tooltipTextKey: 'HeadingThreeButton_tooltip',
  className: styles.headingThreeButton
}];

const getActiveStyle = (editorState, value, defaultValue) => {
  const selectionStyles = getSelectionStyles(headings.map(heading => heading.style), editorState);
  if (selectionStyles.length === 0) {
    return defaultValue;
  } else if (selectionStyles.length > 1) {
    return { style: '', labelKey: '' };
  }
  return headings.filter(h => h.style === selectionStyles[0])[0];
};

const HeadingsDropDown = createInlineStyleDropDown({
  buttons: headings.map(heading => createInlineStyleButton(heading)),
  activeItem: ({ getEditorState, value }) => {
    if (value) {
      return headings.filter(h => h.style === value)[0];
    }
    const style = getActiveStyle(getEditorState(), value, headings[0]);
    return style;
  },
  tooltipTextKey: 'HeadingsDropDown_tooltip',
  onChange: (getEditorState, setEditorState, style) => {
    let editorState = getEditorState();
    // toggle off all exclusive inline styles
    const selectionStyles = getSelectionStyles(headings.map(heading => heading.style), editorState);
    selectionStyles.forEach(appliedStyle => {
      editorState = RichUtils.toggleInlineStyle(editorState, appliedStyle);
    });
    // apply new style
    if (style !== 'inline-normal-text') {
      editorState = RichUtils.toggleInlineStyle(editorState, style);
    }
    setEditorState(editorState);
  },
});

export default HeadingsDropDown;
