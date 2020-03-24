import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Checkbox, SelectionList } from 'wix-rich-content-editor-common';

import { LAYOUT } from '../../constants';

export class LayoutSettingsSection extends Component {
  updateSettings(layout) {
    this.props.store.update('componentData', {
      layout,
    });
  }

  handleEnableImageChange = event => this.updateSettings({ enableImage: event.target.checked });

  handleTypeChange = type => this.updateSettings({ type });

  dataMapper = ({ name }) => ({ value: name });

  renderOption = ({ item }) => (
    <div>
      <span>{item.label}</span>
    </div>
  );

  render() {
    const { componentData, theme } = this.props;

    return (
      <div>
        <p>Choose a layout</p>

        <SelectionList
          theme={theme}
          dataSource={[
            {
              name: LAYOUT.LIST,
              label: 'List',
            },
            {
              name: LAYOUT.GRID,
              label: 'Grid',
            },
          ]}
          dataMapper={this.dataMapper}
          renderItem={this.renderOption}
          value={componentData.layout.type}
          onChange={this.handleTypeChange}
        />

        <Checkbox
          label="Show a feature image"
          checked={componentData.layout.enableImage}
          onChange={this.handleEnableImageChange}
        />
      </div>
    );
  }
}

LayoutSettingsSection.propTypes = {
  t: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};
