import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState, Modifier } from '@wix/draft-js';
import createTextAlignmentButton from './utils/createTextAlignmentButton';
import AlignTextLeft from '../icons/align-text-left.svg';
import AlignTextCenter from '../icons/align-text-center.svg';
import AlignTextRight from '../icons/align-text-right.svg';
import AlignTextJustify from '../icons/align-text-justify.svg';

export default class AlignmentPanel extends Component {
  constructor(props) {
    super(props);
    this.alignmentButtons = [
      createTextAlignmentButton({ alignment: 'left', content: <AlignTextLeft /> }),
      createTextAlignmentButton({ alignment: 'center', content: <AlignTextCenter /> }),
      createTextAlignmentButton({ alignment: 'right', content: <AlignTextRight /> }),
      createTextAlignmentButton({ alignment: 'justify', content: <AlignTextJustify /> }),
    ];
  }

  onAlignmentChange = textAlignment => {
    const editorState = this.props.getEditorState();
    const contentState = Modifier.mergeBlockData(editorState.getCurrentContent(), editorState.getSelection(), { textAlignment });
    const newEditorState = EditorState.push(editorState, contentState, 'change-block-data');
    this.props.setEditorState(newEditorState);
  };

  componentDidMount() {
    setTimeout(() => {
      window.addEventListener('click', this.onWindowClick);
    });
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onWindowClick);
  }

  onWindowClick = () => this.props.onOverrideContent(undefined);

  render() {
    return <div>{this.alignmentButtons.map((Button, i) => <Button key={i} onClick={this.onAlignmentChange} {...this.props} />)}</div>;
  }
}

AlignmentPanel.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  onOverrideContent: PropTypes.func.isRequired,
  theme: PropTypes.object,
};
