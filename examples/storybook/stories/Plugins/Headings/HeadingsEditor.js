import React from 'react';
import { RichContentWrapper } from 'wix-rich-content-wrapper';
import { RichContentEditor } from 'wix-rich-content-editor';
import { pluginHeadings } from 'wix-rich-content-plugin-headings';
import PropTypes from 'prop-types';

const HeadingsEditor = ({ editorState, config }) => (
  <RichContentWrapper plugins={[pluginHeadings(config)]} isEditor>
    <RichContentEditor editorState={editorState} />
  </RichContentWrapper>
);

HeadingsEditor.propTypes = {
  editorState: PropTypes.object,
  config: PropTypes.object,
};

export default HeadingsEditor;
