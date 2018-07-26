import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DefaultInlineToolbarButton } from 'wix-rich-content-common';
import { CODE_BLOCK_TYPE } from '../types';
import { hasBlockType, toggleBlockTypeAndEnsureSpaces } from './blockTypeModifiers';
import CodeBlockIcon from '../../statics/icons/CodeBlockIcon';

export default class TextCodeBlockButton extends Component {
  get isActive() {
    return hasBlockType(CODE_BLOCK_TYPE, this.props.getEditorState());
  }

  render() {
    const { theme, isMobile, t, tabIndex, setEditorState, getEditorState } = this.props;
    const tooltipText = t('TextCodeBlockButton_Tooltip');
    const buttonStyles = {
      button: theme.inlineToolbarButton,
      buttonWrapper: theme.inlineToolbarButton_wrapper,
      icon: theme.inlineToolbarButton_icon,
      active: theme.inlineToolbarButton_active,
    };
    return (<DefaultInlineToolbarButton
      onClick={() => setEditorState(toggleBlockTypeAndEnsureSpaces(CODE_BLOCK_TYPE, getEditorState()))}
      isActive={this.isActive}
      theme={{ ...theme, ...buttonStyles }}
      isMobile={isMobile}
      tooltipText={tooltipText}
      tabIndex={tabIndex}
      icon={CodeBlockIcon}
    />);
  }
}

TextCodeBlockButton.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  onExtendContent: PropTypes.func.isRequired,
  onOverrideContent: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  isMobile: PropTypes.bool,
  linkModal: PropTypes.bool,
  helpers: PropTypes.object,
  keyName: PropTypes.string,
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
  t: PropTypes.func,
  tabIndex: PropTypes.number,
};
