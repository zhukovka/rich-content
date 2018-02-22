import gallerySettingsModalTheme from './gallery/gallery-settings-modal.theme.scss';
import galleryItemsSortableTheme from './gallery/gallery-items-sortable.theme.scss';
import galleryImageSettingsTheme from './gallery/gallery-image-settings.theme.scss';
import gallerySettingsMobileHeaderTheme from './gallery/gallery-settings-mobile-header.theme.scss';
import imageRatioSelectorTheme from './gallery/image-ratio-selector.theme.scss';
import layoutSelectorTheme from './gallery/layout-selector.theme.scss';
import sliderWithInputTheme from './gallery/slider-with-input.theme.scss';
import thumbnailPlacementSelectorTheme from './gallery/thumbnail-placement-selector.theme.scss';

import videoUploadTheme from './video/video-upload-modal.theme.scss';

import imageSettingsTheme from './image/image-settings.theme.scss';
import imageSettingsMobileHeaderTheme from './image/image-settings-mobile-header.theme.scss';

import commonTheme from '../../global.theme.scss';
import loaderTheme from '../../loader.theme.scss';
import buttonTheme from '../../button.theme.scss';
import imageComponentTheme from '../../image_component.theme.scss';
import inputWithLabelTheme from '../../input-with-label.theme.scss';
import radioGroupHorizontalTheme from '../../radio-group-horizontal.theme.scss';
import radioGroupTheme from '../../radio-group.theme.scss';
import settingsPanelFooterTheme from '../../settings-panel-footer.theme.scss';
import settingsSectionTheme from '../../settings-section.theme.scss';
import selectionListTheme from '../../selection-list.theme.scss';
import sliderTheme from '../../slider.theme.scss';
import tabsTheme from '../../tabs.theme.scss';
import tooltipTheme from '../../tooltip.theme.scss';
import { GALLERY_TYPE, IMAGE_TYPE, VIDEO_TYPE } from './types';

const commonStyles = {
  ...commonTheme,
  ...loaderTheme,
  ...buttonTheme,
  ...imageComponentTheme,
  ...inputWithLabelTheme,
  ...radioGroupHorizontalTheme,
  ...radioGroupTheme,
  ...settingsPanelFooterTheme,
  ...settingsSectionTheme,
  ...selectionListTheme,
  ...sliderTheme,
  ...tabsTheme,
  ...tooltipTheme,
};

const GallerySettingsModalTheme = {
  ...gallerySettingsModalTheme,
  ...galleryImageSettingsTheme,
  ...galleryItemsSortableTheme,
  ...gallerySettingsMobileHeaderTheme,
  ...imageRatioSelectorTheme,
  ...layoutSelectorTheme,
  ...sliderWithInputTheme,
  ...thumbnailPlacementSelectorTheme,
  ...commonStyles
};

const ImageSettingsModalTheme = {
  ...imageSettingsTheme,
  ...imageSettingsMobileHeaderTheme,
  ...commonStyles
};

const VideoUploadModalTheme = {
  ...videoUploadTheme,
  ...commonStyles
};

export default {
  [GALLERY_TYPE]: GallerySettingsModalTheme,
  [IMAGE_TYPE]: ImageSettingsModalTheme,
  [VIDEO_TYPE]: VideoUploadModalTheme
};
