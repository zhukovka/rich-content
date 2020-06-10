import { PollViewer } from './components';
import { POLL_TYPE } from './types';

export const typeMapper = () => ({
  [POLL_TYPE]: {
    component: PollViewer,
  },
});
