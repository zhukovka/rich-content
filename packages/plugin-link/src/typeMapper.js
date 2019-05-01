import { EXTERNAL_LINK_TYPE, LINK_TYPE } from './types';
import LinkViewer from './dynamic-link-viewer';

export const typeMapper = () => ({
  [EXTERNAL_LINK_TYPE]: { component: LinkViewer, elementType: 'inline' },
  [LINK_TYPE]: { component: LinkViewer, elementType: 'inline' },
});
