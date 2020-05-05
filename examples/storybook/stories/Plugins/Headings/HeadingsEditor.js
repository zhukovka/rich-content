import React from 'react';
import { RichContentWrapper } from 'wix-rich-content-wrapper';
import { RichContentEditor } from 'wix-rich-content-editor';
import { pluginHeadings } from 'wix-rich-content-plugin-headings';
import PropTypes from 'prop-types';

const config = { Headings: { headersDropdown: ['P', 'H2', 'H3', 'H4', 'H5', 'H6'] } };

const HeadingsEditor = ({ editorState }) => (
  <RichContentWrapper plugins={[pluginHeadings({ config })]} isEditor>
    <RichContentEditor editorState={editorState} />
  </RichContentWrapper>
);

HeadingsEditor.propTypes = {
  editorState: PropTypes.object,
};

export default HeadingsEditor;
