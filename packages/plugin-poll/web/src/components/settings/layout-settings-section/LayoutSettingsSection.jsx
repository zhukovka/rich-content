import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

import { SelectionList } from 'wix-rich-content-editor-common';

import { LAYOUT } from '../../../constants';
import { ListPollIcon, WithImagePollIcon, GridPollIcon } from '../../../assets/icons';

import styles from './layout-settings-section.scss';

export class LayoutSettingsSection extends Component {
  updateSettings(layout) {
    this.props.store.update('componentData', {
      layout,
    });
  }

  handleTypeChange = type => this.updateSettings({ type });

  dataMapper = ({ name }) => ({ value: name });

  renderOption = ({ item, selected }) => (
    <div
      className={cls(styles.option, {
        [styles.selected]: selected,
      })}
    >
      <item.icon />
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
              label: 'Textual',
              icon: ListPollIcon,
            },
            {
              name: LAYOUT.GRID,
              label: 'Visual',
              icon: GridPollIcon,
            },
            {
              name: LAYOUT.WITH_IMAGE,
              label: 'Question',
              icon: WithImagePollIcon,
            },
          ]}
          dataMapper={this.dataMapper}
          renderItem={this.renderOption}
          value={componentData.layout.type}
          onChange={this.handleTypeChange}
          className={styles.layout_selector}
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
