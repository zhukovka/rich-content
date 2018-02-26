
import GridIcon from '../icons/toolbar/dropdown/Grid.svg';
import MasonryIcon from '../icons/toolbar/dropdown/Masonry.svg';
import CollageIcon from '../icons/toolbar/dropdown/Collage.svg';
import ThumbnailsIcon from '../icons/toolbar/dropdown/Thumbnails.svg';
import SlideshowIcon from '../icons/toolbar/dropdown/Slideshow.svg';
import PanoramaIcon from '../icons/toolbar/dropdown/Panorama.svg';
import ColumnsIcon from '../icons/toolbar/dropdown/Columns.svg';
import SlidesIcon from '../icons/toolbar/dropdown/Slides.svg';

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

