import React from 'react';
// import EditorWrapper from '../../Components/EditorWrapper';
import { RichContentWrapper } from 'wix-rich-content-wrapper';
import { RichContentEditor } from 'wix-rich-content-editor';
import { pluginHeadings } from 'wix-rich-content-plugin-headings';
import PropTypes from 'prop-types';

const config = {
  Headings: {
    headersDropdown: true,
  },
};

const HeadingsEditor = ({ editorState }) => (
  <RichContentWrapper plugins={[pluginHeadings()]} isEditor>
    <RichContentEditor editorState={editorState} config={config} />
  </RichContentWrapper>
);

HeadingsEditor.propTypes = {
  editorState: PropTypes.object,
};

export default HeadingsEditor;
