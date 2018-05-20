import { ImageViewer } from './image-viewer';
import { IMAGE_TYPE_LEGACY, IMAGE_TYPE } from './types';

export const typeMapper = () => ({
  [IMAGE_TYPE_LEGACY]: ImageViewer,
  [IMAGE_TYPE]: ImageViewer
});
