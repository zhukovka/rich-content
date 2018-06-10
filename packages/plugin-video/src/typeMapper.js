import VideoViewer from './video-viewer';
import { VIDEO_TYPE_LEGACY, VIDEO_TYPE } from './types';

export const typeMapper = () => ({
  [VIDEO_TYPE_LEGACY]: { component: VideoViewer },
  [VIDEO_TYPE]: { component: VideoViewer },
});
