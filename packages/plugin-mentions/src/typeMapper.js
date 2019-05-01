import { MENTION_TYPE } from './types';
import MentionViewer from './dynamic-mention-viewer';

export default () => ({
  [MENTION_TYPE]: {
    component: MentionViewer,
    elementType: 'inline',
  },
});
