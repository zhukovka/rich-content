import React from 'react';
import { RichContentViewer } from 'wix-rich-content-viewer';
import PropTypes from 'prop-types';

const HeadingsViewer = ({ initialState }) => <RichContentViewer initialState={initialState} />;

HeadingsViewer.propTypes = {
  initialState: PropTypes.object,
};

export default HeadingsViewer;
