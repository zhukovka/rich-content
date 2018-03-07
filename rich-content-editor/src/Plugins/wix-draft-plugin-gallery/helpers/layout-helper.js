
import GridIcon from '../components/gallery-controls/icons/layout_grid.svg';
import MasonryIcon from '../components/gallery-controls/icons/layout_masonry.svg';
import CollageIcon from '../components/gallery-controls/icons/layout_collage.svg';
import ThumbnailsIcon from '../components/gallery-controls/icons/layout_thumbnails.svg';
import SlideshowIcon from '../components/gallery-controls/icons/layout_slideshow.svg';
import PanoramaIcon from '../components/gallery-controls/icons/layout_panorama.svg';
import ColumnsIcon from '../components/gallery-controls/icons/layout_columns.svg';
import SlidesIcon from '../components/gallery-controls/icons/layout_slides.svg';

import layoutData from './layout-data-provider';

export const switchLayout = (layout, _componentData, store) => {
  const galleryLayout = layout.value;
  const layoutStyles = Object.assign(
    { galleryLayout },
    layoutData[galleryLayout]
  );
  const componentData = {
    ..._componentData,
    styles: Object.assign({}, _componentData.styles, layoutStyles)
  };
  store.set('componentData', componentData);
};

export const getCurrentLayout = store => {
  const componentData = store.get('componentData');
  const galleryLayout = (componentData && componentData.styles && componentData.styles.galleryLayout) || 0;
  return galleryLayouts.find(layout => layout.value === galleryLayout);
};

export const galleryLayouts = [
  { value: 2, label: 'Grid', icon: GridIcon },
  { value: 1, label: 'Masonry', icon: MasonryIcon },
  { value: 0, label: 'Collage', icon: CollageIcon },
  { value: 3, label: 'Thumbnails', icon: ThumbnailsIcon },
  { value: 9, label: 'Slideshow', icon: SlideshowIcon },
  { value: 6, label: 'Panorama', icon: PanoramaIcon },
  { value: 7, label: 'Columns', icon: ColumnsIcon },
  { value: 4, label: 'Slides', icon: SlidesIcon },
];

