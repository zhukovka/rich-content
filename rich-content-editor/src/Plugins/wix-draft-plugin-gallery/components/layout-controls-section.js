import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spacing, ItemsPerRow } from './gallery-controls/sliders';
import { ThumbnailResize, TitleButtonPlacement, ImageOrientation, ScrollDirection } from './gallery-controls/radio-groups';
import ImageRatioSelector from './gallery-controls/image-ratio-selector';
import { LoadMoreToggle } from './gallery-controls/toggles';
import ThumbnailPlacementSelector from './gallery-controls/thumbnail-placement-selector';
import { SettingsSection } from './gallery-controls/settings-section';

const Separator = () => <hr />;

class LayoutControlsSection extends Component {
  controlsByLayout = {
    grid: [
      'itemsPerRow',
      'spacing',
      'separator',
      'thumbnailResize',
      'separator',
      'titleButtonPlacement',
      'separator',
      'imageRatio',
      'separator',
      'loadMoreButton',
    ],
    masonry: ['itemsPerRow', 'spacing', 'separator', 'imageOrientation'],
    collage: ['itemsPerRow', 'spacing', 'separator', 'thumbnailResize', 'separator', 'scrollDirection'],
    thumbnails: ['thumbnailPlacement', 'separator', 'spacing'],
    slideshow: [],
    panorama: ['spacing'],
    columns: ['spacing'],
    slides: ['spacing', 'separator', 'titleButtonPlacement', 'separator', 'imageRatio'],
  };

  controls = {
    itemsPerRow: ItemsPerRow,
    spacing: Spacing,
    separator: Separator,
    thumbnailResize: ThumbnailResize,
    titleButtonPlacement: TitleButtonPlacement,
    imageRatio: ImageRatioSelector,
    loadMoreButton: LoadMoreToggle,
    imageOrientation: ImageOrientation,
    scrollDirection: ScrollDirection,
    thumbnailPlacement: ThumbnailPlacementSelector,
  };

  render() {
    return (
      <div>
        {this.controlsByLayout[this.props.layout].map((control, i) => (
          <SettingsSection key={i}>{React.createElement(this.controls[control])}</SettingsSection>
        ))}
      </div>
    );
  }
}

LayoutControlsSection.propTypes = {
  layout: PropTypes.string.isRequired,
  store: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default LayoutControlsSection;
