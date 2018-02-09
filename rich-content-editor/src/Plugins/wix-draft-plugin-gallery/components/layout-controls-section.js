import React, { Component } from 'react';
import PropTypes from 'prop-types';
import decorateComponentWithProps from 'decorate-component-with-props';

import { mergeStyles } from '~/Utils';
import styles from './gallery-settings-modal.scss';
import { Spacing, ItemsPerRow, ThumbnailSize } from './gallery-controls/sliders';
import { ThumbnailResize, TitleButtonPlacement, ImageOrientation, ScrollDirection } from './gallery-controls/radio-groups';
import ImageRatioSelector from './gallery-controls/image-ratio-selector';
import { LoadMoreToggle } from './gallery-controls/toggles';
import ThumbnailPlacementSelector from './gallery-controls/thumbnail-placement-selector';
import SettingsSection from '~/Components/SettingsSection';

class Separator extends Component {
  static propTypes = {
    theme: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  render = () => <hr className={this.styles.gallerySettings_divider}/>
}

class LayoutControlsSection extends Component {
  controlsByLayout = [
    ['|', 'imageOrientation', '|', 'thumbnailSize', '|', 'spacing', '|', 'scrollDirection'], // collage
    ['|', 'imageOrientation', '|', 'thumbnailSize', '|', 'spacing'], // masonry
    ['|', 'itemsPerRow', 'spacing', '|', 'thumbnailResize', '|', 'scrollDirection', '|', 'titleButtonPlacement', '|', 'imageRatio'], // grid
    ['|', 'thumbnailPlacement', '|', 'thumbnailSpacing'], // thumbnails
    ['|', 'spacing', '|', 'thumbnailResize', '|', 'imageRatio'], // slides
    [], // slideshow
    ['|', 'spacing'], // panorama
    ['|', 'spacing'], // columns
  ];

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
        onChange: value => this.applyGallerySetting({ numberOfImagesPerRow: value }),
        value: this.getValueFromComponentStyles('numberOfImagesPerRow'),
      },
    },
    thumbnailSize: {
      component: ThumbnailSize,
      props: {
        onChange: value => this.applyGallerySetting({ gallerySize: value }),
        value: this.getValueFromComponentStyles('gallerySize'),
        options: {
          isVertical: this.getValueFromComponentStyles('isVertical')
        }
      },
    },
    spacing: {
      component: Spacing,
      props: {
        onChange: value => this.applyGallerySetting({ imageMargin: value }),
        value: this.getValueFromComponentStyles('imageMargin'),
      },
    },
    thumbnailSpacing: {
      component: Spacing,
      props: {
        onChange: value => this.applyGallerySetting({ thumbnailSpacings: value }),
        value: this.getValueFromComponentStyles('thumbnailSpacings'),
      },
    },
    thumbnailResize: {
      component: ThumbnailResize,
      props: {
        onChange: value => this.applyGallerySetting({ cubeType: value }),
        value: this.getValueFromComponentStyles('cubeType'),
      },
    },
    titleButtonPlacement: {
      component: TitleButtonPlacement,
      props: {
        onChange: value => this.applyGallerySetting({ titlePlacement: value }),
        value: this.getValueFromComponentStyles('titlePlacement'),
      },
    },
    imageRatio: {
      component: ImageRatioSelector,
      props: {
        onChange: value => this.applyGallerySetting({ cubeRatio: value }),
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
        onChange: value => this.applyGallerySetting({ isVertical: value === '1' }),
        value: this.getValueFromComponentStyles('isVertical') ? '1' : '0',
        options: {
          oneRow: this.getValueFromComponentStyles('oneRow')
        }
      },
    },
    scrollDirection: {
      component: ScrollDirection,
      props: {
        onChange: value => {
          return this.applyGallerySetting({ oneRow: value === 'horizontal', isVertical: false });
        },
        value: this.getValueFromComponentStyles('oneRow') ? 'horizontal' : 'vertical',
      },
    },
    thumbnailPlacement: {
      component: ThumbnailPlacementSelector,
      props: {
        onChange: value => this.applyGallerySetting({ galleryThumbnailsAlignment: value }),
        value: this.getValueFromComponentStyles('galleryThumbnailsAlignment'),
      },
    },
  });

  render() {
    const controls = this.getControlData();
    const layoutControls = this.controlsByLayout[this.props.layout];
    return (
      <div>
        {layoutControls.map((name, i) => (
          <SettingsSection theme={this.props.theme} key={i}>
            {React.createElement(decorateComponentWithProps(controls[name].component, { ...controls[name].props, theme: this.props.theme }))}
          </SettingsSection>
        ))}
      </div>
    );
  }
}

LayoutControlsSection.propTypes = {
  layout: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default LayoutControlsSection;
