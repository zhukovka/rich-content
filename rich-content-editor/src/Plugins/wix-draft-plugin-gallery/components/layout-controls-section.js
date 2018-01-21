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

  getControlData = () => ({
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
        onChange: event => this.applyGallerySetting({ cubeType: event.value }),
        value: this.getValueFromComponentStyles('cubeType'),
      },
    },
    titleButtonPlacement: {
      component: TitleButtonPlacement,
      props: {
        onChange: event => this.applyGallerySetting({ titlePlacement: event.value }),
        value: this.getValueFromComponentStyles('titlePlacement'),
      },
    },
    imageRatio: {
      component: ImageRatioSelector,
      props: {
        onChange: event => this.applyGallerySetting({ cubeRatio: event.value }),
        value: this.getValueFromComponentStyles('cubeRatio'),
      },
    },
    loadMoreButton: {
      component: LoadMoreToggle,
      props: {
        onChange: event => this.applyGallerySetting({ enableInfiniteScroll: event.value }),
        value: this.getValueFromComponentStyles('enableInfiniteScroll'),
      },
    },
    imageOrientation: {
      component: ImageOrientation,
      props: {
        onChange: event => this.applyGallerySetting({ isVertical: event.value === '1' }),
        value: this.getValueFromComponentStyles('isVertical') ? '1' : '0',
      },
    },
    scrollDirection: {
      component: ScrollDirection,
      props: {
        onChange: event => this.applyGallerySetting({ oneRow: event.value === 'horizontal' }),
        value: this.getValueFromComponentStyles('oneRow') ? 'horizontal' : 'vertical',
      },
    },
    thumbnailPlacement: {
      component: ThumbnailPlacementSelector,
      props: {
        onChange: event => this.applyGallerySetting({ galleryThumbnailsAlignment: event.value }),
        value: this.getValueFromComponentStyles('galleryThumbnailsAlignment'),
      },
    },
  });

  render() {
    const controls = this.getControlData();
    return (
      <div>
        {this.controlsByLayout[this.props.layout].map((name, i) => (
          <SettingsSection key={i}>
            {React.createElement(decorateComponentWithProps(controls[name].component, controls[name].props))}
          </SettingsSection>
        ))}
      </div>
    );
  }
}

LayoutControlsSection.propTypes = {
  layout: PropTypes.number.isRequired,
  store: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default LayoutControlsSection;
