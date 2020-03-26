import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ColorPicker } from 'wix-rich-content-editor-common';
import { mergeStyles } from 'wix-rich-content-common';

import styles from './design-settings-section.scss';

export class DesignSettingsSection extends Component {
  styles = mergeStyles({ styles, theme: this.props.theme });

  updateDesign(design) {
    this.props.store.update('componentData', { design });
  }

  handleBackgroundColorChange = backgroundColor => this.updateDesign({ backgroundColor });

  render() {
    const { t, componentData } = this.props;

    return (
      <div>
        <p>Pick a color</p>
        <ColorPicker
          color={componentData.design.backgroundColor}
          palette={['#cba27d', '#D5D4D4', '#ebba4d', '#0091ff', '#134497', '#82cb7d']}
          onChange={this.handleBackgroundColorChange}
          theme={this.styles}
          t={t}
        >
          {({ renderPalette }) => <div>{renderPalette()}</div>}
        </ColorPicker>
      </div>
    );
  }
}

DesignSettingsSection.propTypes = {
  t: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};
