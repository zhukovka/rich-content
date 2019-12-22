import React from 'react';
import PropTypes from 'prop-types';
import LinkPreviewViewer from './LinkPreviewViewer';

const LinkPreviewComponent = props => {
  const { url, blockProps, settings } = props;
  const componentData = url ? { url } : blockProps.getData();
  return <LinkPreviewViewer componentData={componentData} fetchMetadata={settings.fetchMetadata} />;
};

LinkPreviewComponent.propTypes = {
  blockProps: PropTypes.object,
  settings: PropTypes.object,
  url: PropTypes.string,
};

export default LinkPreviewComponent;
