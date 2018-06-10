import { EXTERNAL_LINK_TYPE, LINK_TYPE } from './types';
import LinkViewer from './LinkViewer';

export const typeMapper = () => ({
  [EXTERNAL_LINK_TYPE]: { component: LinkViewer },
  [LINK_TYPE]: { component: LinkViewer },
});

