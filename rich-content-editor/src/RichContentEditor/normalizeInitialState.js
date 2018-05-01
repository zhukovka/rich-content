import { IMAGE_TYPE, IMAGE_TYPE_LEGACY } from 'wix-rich-content-plugin-image';
import { VIDEO_TYPE, VIDEO_TYPE_LEGACY } from 'wix-rich-content-plugin-video';
import { normalizeInitialState } from 'wix-rich-content-common';

export default initialState => normalizeInitialState(initialState, {
  [IMAGE_TYPE_LEGACY]: IMAGE_TYPE,
  [VIDEO_TYPE_LEGACY]: VIDEO_TYPE,
});
