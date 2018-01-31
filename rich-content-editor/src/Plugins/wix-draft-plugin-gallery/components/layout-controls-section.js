import React, { Component } from 'react';
import PropTypes from 'prop-types';
import decorateComponentWithProps from 'decorate-component-with-props';

import { Spacing, ItemsPerRow, ThumbnailSize } from './gallery-controls/sliders';
import { ThumbnailResize, TitleButtonPlacement, ImageOrientation, ScrollDirection } from './gallery-controls/radio-groups';
import ImageRatioSelector from './gallery-controls/image-ratio-selector';
import { LoadMoreToggle } from './gallery-controls/toggles';
import ThumbnailPlacementSelector from './gallery-controls/thumbnail-placement-selector';
import SettingsSection from '~/Common/settings-section';

const Separator = () => <hr />;

class LayoutControlsSection extends Component {
  // NB: index sensitive!
  controlsByLayout = {
    grid: ['itemsPerRow', 'spacing', '|', 'thumbnailResize', '|', 'scrollDirection', '|', 'titleButtonPlacement', '|', 'imageRatio'],
    masonry: ['imageOrientation', '|', 'thumbnailSize', '|', 'spacing'],
    collage: ['imageOrientation', '|', 'thumbnailSize', '|', 'spacing', '|', 'scrollDirection'],
    thumbnails: ['thumbnailPlacement', '|', 'thumbnailSpacing'],
    panorama: ['spacing'],
    slideshow: [],
    columns: ['spacing'],
    slides: ['spacing', '|', 'thumbnailResize', '|', 'imageRatio'],
  };

  getValueFromComponentStyles = name => this.props.data.styles[name];

  applyGallerySetting = setting => {
    const { data, store } = this.props;
    const componentData = { ...data, styles: Object.assign({}, data.styles, setting) };
    store.set('componentData', componentData);
  };

  getControlData = () => ({
    '|': { component: Separator, props: {} }, //separator
    itemsPerRow: {
      component: ItemsPerRow,
      props: {
        onChange: event => this.applyGallerySetting({ numberOfImagesPerRow: event.value }),
        value: this.getValueFromComponentStyles('numberOfImagesPerRow'),
      },
    },
    thumbnailSize: {
      component: ThumbnailSize,
      props: {
        onChange: event => this.applyGallerySetting({ gallerySize: event.value }),
        value: this.getValueFromComponentStyles('gallerySize'),
        options: {
          isVertical: this.getValueFromComponentStyles('isVertical')
        }
      },
    },
    spacing: {
      component: Spacing,
      props: {
        onChange: event => this.applyGallerySetting({ imageMargin: event.value }),
        value: this.getValueFromComponentStyles('imageMargin'),
      },
    },
    thumbnailSpacing: {
      component: Spacing,
      props: {
        onChange: event => this.applyGallerySetting({ thumbnailSpacings: event.value }),
        value: this.getValueFromComponentStyles('thumbnailSpacings'),
      },
    },
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
        options: {
          oneRow: this.getValueFromComponentStyles('oneRow')
        }
      },
    },
    scrollDirection: {
      component: ScrollDirection,
      props: {
        onChange: event => {
          return this.applyGallerySetting({ oneRow: event.value === 'horizontal', isVertical: false });
        },
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
    const layoutControls = this.controlsByLayout[this.props.layoutsOrder.original[this.props.layout]];
    return (
      <div>
        {layoutControls.map((name, i) => (
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
  layoutsOrder: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default LayoutControlsSection;
