import DynamicImageViewer from './dynamic-image-viewer';
import { IMAGE_TYPE_LEGACY, IMAGE_TYPE } from './types';
import { sizeClassName, alignmentClassName } from './classNameStrategies';

const imageRenderDescriptor = {
  component: DynamicImageViewer,
  classNameStrategies: {
    size: sizeClassName,
    alignment: alignmentClassName,
  },
};

export const typeMapper = () => ({
  [IMAGE_TYPE_LEGACY]: imageRenderDescriptor,
  [IMAGE_TYPE]: imageRenderDescriptor,
});
