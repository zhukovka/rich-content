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

  getValueFromDataConfig = name => this.props.data.config[name];

  applyGallerySetting = setting => {
    const { data, store } = this.props;
    const componentData = { ...data, config: Object.assign({}, data.config, setting) };
    store.set('componentData', componentData);
  };

  controlData = {
    itemsPerRow: {
      component: ItemsPerRow,
      props: {
        onChange: event => this.applyGallerySetting({ itemsPerRow: event.value }),
        value: this.getValueFromDataConfig('itemsPerRow'),
      },
    },
    spacing: {
      component: Spacing,
      props: {
        onChange: event => this.applyGallerySetting({ spacing: event.value }),
        value: this.getValueFromDataConfig('spacing'),
      },
    },
    separator: { component: Separator, props: {} },
    thumbnailResize: {
      component: ThumbnailResize,
      props: {
        onChange: event => this.applyGallerySetting({ thumbnailResize: event.value }),
        value: this.getValueFromDataConfig('thumbnailResize'),
      },
    },
    titleButtonPlacement: {
      component: TitleButtonPlacement,
      props: {
        onChange: event => this.applyGallerySetting({ titleButtonPlacement: event.value }),
        value: this.getValueFromDataConfig('titleButtonPlacement'),
      },
    },
    imageRatio: {
      component: ImageRatioSelector,
      props: {
        onChange: event => this.applyGallerySetting({ imageRatio: event.value }),
        value: this.getValueFromDataConfig('imageRatio'),
      },
    },
    loadMoreButton: {
      component: LoadMoreToggle,
      props: {
        onChange: event => this.applyGallerySetting({ loadMore: event.value }),
        value: this.getValueFromDataConfig('loadMore'),
      },
    },
    imageOrientation: {
      component: ImageOrientation,
      props: {
        onChange: event => this.applyGallerySetting({ imageOrientation: event.value }),
        value: this.getValueFromDataConfig('imageOrientation'),
      },
    },
    scrollDirection: {
      component: ScrollDirection,
      props: {
        onChange: event => this.applyGallerySetting({ scrollDirection: event.value }),
        value: this.getValueFromDataConfig('scrollDirection'),
      },
    },
    thumbnailPlacement: {
      component: ThumbnailPlacementSelector,
      props: {
        onChange: event => this.applyGallerySetting({ thumbnailPlacement: event.value }),
        value: this.getValueFromDataConfig('thumbnailPlacement'),
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
