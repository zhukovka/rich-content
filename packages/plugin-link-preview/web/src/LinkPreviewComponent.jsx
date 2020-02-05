import React from 'react';
import PropTypes from 'prop-types';
import LinkPreviewViewer from './LinkPreviewViewer';

const LinkPreviewComponent = props => {
  const { blockProps, settings, theme } = props;
  return (
    <LinkPreviewViewer componentData={blockProps.getData()} settings={settings} theme={theme} />
  );
};

LinkPreviewComponent.propTypes = {
  blockProps: PropTypes.object,
  settings: PropTypes.object,
  theme: PropTypes.object,
};

export default LinkPreviewComponent;
