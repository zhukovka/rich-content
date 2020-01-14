import { ANCHOR_TYPE } from './types';
import AnchorViewer from './AnchorViewer';

export const typeMapper = () => ({
  [ANCHOR_TYPE]: { component: AnchorViewer, elementType: 'inline' },
});
