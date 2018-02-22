import gallerySettingsModalTheme from './gallery/gallery-settings-modal.theme.scss';
import galleryImageSettingsTheme from './gallery/gallery-image-settings.theme.scss';
import galleryItemsSortableTheme from './gallery/gallery-items-sortable.theme.scss';
import gallerySettingsMobileHeaderTheme from './gallery/gallery-settings-mobile-header.theme.scss';
import imageRatioSelectorTheme from './gallery/image-ratio-selector.theme.scss';
import layoutSelectorTheme from './gallery/layout-selector.theme.scss';
import sliderWithInputTheme from './gallery/slider-with-input.theme.scss';
import thumbnailPlacementSelectorTheme from './gallery/thumbnail-placement-selector.theme.scss';
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
import { GALLERY_TYPE } from './types';

const GallerySettingsModalTheme = {
  ...gallerySettingsModalTheme,
  ...galleryImageSettingsTheme,
  ...galleryItemsSortableTheme,
  ...gallerySettingsMobileHeaderTheme,
  ...imageRatioSelectorTheme,
  ...layoutSelectorTheme,
  ...sliderWithInputTheme,
  ...thumbnailPlacementSelectorTheme,
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

export default { [GALLERY_TYPE]: GallerySettingsModalTheme };
