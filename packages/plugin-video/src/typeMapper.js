import VideoViewer from './video-viewer';
import { VIDEO_TYPE_LEGACY, VIDEO_TYPE } from './types';

export const typeMapper = () => ({
  [VIDEO_TYPE_LEGACY]: VideoViewer,
  [VIDEO_TYPE]: VideoViewer
});
