import React from 'react';
import loadable from '@loadable/component';

export default loadable(() => import('./button-viewer.jsx'), {
  fallback: <div>Loading...</div>,
  ssr: false, //TODO: add SSR support
});
