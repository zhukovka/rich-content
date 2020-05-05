import React from 'react';
import EditorWrapper from '../../Components/EditorWrapper';
import PropTypes from 'prop-types';

const HeadingsEditor = ({ editorState, contentState }) => (
  <EditorWrapper editorState={editorState} contentState={contentState} />
);

HeadingsEditor.propTypes = {
  editorState: PropTypes.object,
  contentState: PropTypes.object,
};

export default HeadingsEditor;
