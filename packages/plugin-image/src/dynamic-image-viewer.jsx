import React from 'react';
import loadable from '@loadable/component';
import { Context } from 'wix-rich-content-common';

const failing = loadable(
  async () => {
    const ImageViewer = await import('./image-viewer.jsx');
    // ImageViewer.contextType = Context.type;
    return props => <ImageViewer {...props} />;
  },
  {
    fallback: <div>Loading...</div>,
    ssr: false, //TODO: add SSR support
  }
);

const working = loadable(() => import('./image-viewer.jsx'), {
  fallback: <div>Loading...</div>,
  ssr: false, //TODO: add SSR support
});

console.log({ working, failing });

working.contextType = Context.type;

export default working;
