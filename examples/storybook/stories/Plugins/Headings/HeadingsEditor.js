import React from 'react';
import { RichContentWrapper } from 'wix-rich-content-wrapper';
import { RichContentEditor } from 'wix-rich-content-editor';
import PropTypes from 'prop-types';

const HeadingsEditor = ({ editorState, pluginHeadings }) => (
  <RichContentWrapper plugins={pluginHeadings ? [pluginHeadings()] : []} isEditor>
    <RichContentEditor editorState={editorState} />
  </RichContentWrapper>
);

HeadingsEditor.propTypes = {
  editorState: PropTypes.object,
  pluginHeadings: PropTypes.func,
};

export default HeadingsEditor;
