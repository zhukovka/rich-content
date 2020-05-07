import React from 'react';
// import EditorWrapper from '../../Components/EditorWrapper';
import { RichContentWrapper } from 'wix-rich-content-wrapper';
import { RichContentEditor } from 'wix-rich-content-editor';
import { pluginHeadings } from 'wix-rich-content-plugin-headings';
import PropTypes from 'prop-types';

const HeadingsEditor = ({ editorState }) => (
  <RichContentWrapper
    plugins={[
      pluginHeadings({
        headersDropdown: true,
      }),
    ]}
    isEditor
  >
    <RichContentEditor editorState={editorState} />
  </RichContentWrapper>
);

HeadingsEditor.propTypes = {
  editorState: PropTypes.object,
};

export default HeadingsEditor;
