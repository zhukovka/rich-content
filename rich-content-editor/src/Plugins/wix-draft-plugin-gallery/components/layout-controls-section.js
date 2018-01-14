import React, { Component } from 'react';
import PropTypes from 'prop-types';
import decorateComponentWithProps from 'decorate-component-with-props';

import { Spacing, ItemsPerRow } from './gallery-controls/sliders';
import { ThumbnailResize, TitleButtonPlacement, ImageOrientation, ScrollDirection } from './gallery-controls/radio-groups';
import ImageRatioSelector from './gallery-controls/image-ratio-selector';
import { LoadMoreToggle } from './gallery-controls/toggles';
import ThumbnailPlacementSelector from './gallery-controls/thumbnail-placement-selector';
import { SettingsSection } from './gallery-controls/settings-section';

const Separator = () => <hr />;

class LayoutControlsSection extends Component {
  // NB: index sensitive!
  controlsByLayout = [
    ['itemsPerRow', 'spacing', 'separator', 'thumbnailResize', 'separator', 'scrollDirection'],
    ['itemsPerRow', 'spacing', 'separator', 'imageOrientation'],
    [
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
    ['thumbnailPlacement', 'separator', 'spacing'],
    ['spacing', 'separator', 'titleButtonPlacement', 'separator', 'imageRatio'],
    [],
    ['spacing'],
    ['spacing'],
  ];

  getValueFromComponentStyles = name => this.props.data.styles[name];

  applyGallerySetting = setting => {
    const { data, store } = this.props;
    const componentData = { ...data, styles: Object.assign({}, data.styles, setting) };
    store.set('componentData', componentData);
  };

  controlData = {
    itemsPerRow: {
      component: ItemsPerRow,
      props: {
        onChange: event => this.applyGallerySetting({ numberOfImagesPerRow: event.value }),
        value: this.getValueFromComponentStyles('numberOfImagesPerRow'),
      },
    },
    spacing: {
      component: Spacing,
      props: {
        onChange: event => this.applyGallerySetting({ imageMargin: event.value }),
        value: this.getValueFromComponentStyles('imageMargin'),
      },
    },
    separator: { component: Separator, props: {} },
    thumbnailResize: {
      component: ThumbnailResize,
      props: {
        onChange: event => this.applyGallerySetting({ imageResize: event.value }),
        value: this.getValueFromComponentStyles('imageResize'),
      },
    },
    titleButtonPlacement: {
      component: TitleButtonPlacement,
      props: {
        onChange: event => this.applyGallerySetting({ titleButtonPlacement: event.value }),
        value: this.getValueFromComponentStyles('titleButtonPlacement'),
      },
    },
    imageRatio: {
      component: ImageRatioSelector,
      props: {
        onChange: event => this.applyGallerySetting({ galleryImageRatio: event.value }),
        value: this.getValueFromComponentStyles('galleryImageRatio'),
      },
    },
    loadMoreButton: {
      component: LoadMoreToggle,
      props: {
        onChange: event => this.applyGallerySetting({ loadMore: event.value }),
        value: this.getValueFromComponentStyles('loadMore'),
      },
    },
    imageOrientation: {
      component: ImageOrientation,
      props: {
        onChange: event => this.applyGallerySetting({ isVertical: event.value }),
        value: this.getValueFromComponentStyles('isVertical'),
      },
    },
    scrollDirection: {
      component: ScrollDirection,
      props: {
        onChange: event => this.applyGallerySetting({ scrollDirection: event.value }),
        value: this.getValueFromComponentStyles('scrollDirection'),
      },
    },
    thumbnailPlacement: {
      component: ThumbnailPlacementSelector,
      props: {
        onChange: event => this.applyGallerySetting({ galleryThumbnailsAlignment: event.value }),
        value: this.getValueFromComponentStyles('galleryThumbnailsAlignment'),
      },
    },
  };

  render() {
    return (
      <div>
        {this.controlsByLayout[this.props.layout].map((name, i) => (
          <SettingsSection key={i}>
            {React.createElement(decorateComponentWithProps(this.controlData[name].component, this.controlData[name].props))}
          </SettingsSection>
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
