import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState, Modifier } from '@wix/draft-js';
import Separator from '~/Components/Separator';
import TextButton from './TextButton';
import { getTextAlignment } from '~/Utils';
import {
  AlignTextLeftButton,
  AlignTextCenterButton,
  AlignTextRightButton,
  AlignTextJustifyButton
} from './index';
import BackArrowIcon from '../icons/back-arrow.svg';
import styles from '~/Styles/global.scss';

export default class AlignmentPanel extends Component {
  constructor(props) {
    super(props);
    this.alignmentButtons = [
      AlignTextLeftButton,
      AlignTextCenterButton,
      AlignTextRightButton,
      AlignTextJustifyButton
    ];
  }

  componentDidMount() {
    setTimeout(() => {
      window.addEventListener('click', this.onWindowClick);
    });
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onWindowClick);
  }

  onWindowClick = () => this.closePanel();

  handleBackClick = () => this.closePanel();

  closePanel() {
    this.props.onOverrideContent(undefined);
  }

  onAlignmentChange = textAlignment => {
    const editorState = this.props.getEditorState();
    const contentState = Modifier.mergeBlockData(editorState.getCurrentContent(), editorState.getSelection(), { textAlignment });
    const newEditorState = EditorState.push(editorState, contentState, 'change-block-data');
    this.props.setEditorState(newEditorState);
  };

  render() {
    const alignment = getTextAlignment(this.props.getEditorState());
    const buttonProps = {
      alignment,
      onClick: this.onAlignmentChange,
      ...this.props
    };
    return (
      <div className={styles.flex}>
        <TextButton icon={BackArrowIcon} onClick={this.handleBackClick} theme={this.props.theme}/>
        <Separator />
        {this.alignmentButtons.map((Button, i) => <Button key={i} {...buttonProps} />)}
      </div>
    );
  }
}

AlignmentPanel.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  onOverrideContent: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};
