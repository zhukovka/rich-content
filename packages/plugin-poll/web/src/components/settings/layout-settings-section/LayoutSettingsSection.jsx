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

  handleTypeChange = type => {
    this.updateSettings({ type });
    window.dispatchEvent(new Event('resize'));
  };

  dataMapper = ({ name }) => ({ value: name });

  renderOption = ({ item, selected }) => (
    <div
      className={cls(styles.option, {
        [styles.selected]: selected,
      })}
    >
      <item.icon />
      <p>{item.label}</p>
    </div>
  );

  render() {
    const { componentData, theme, t } = this.props;

    return (
      <section className={styles.section}>
        <p>{t('Poll_PollSettings_Tab_Layout_ChooseLayout_Title')}</p>

        <SelectionList
          theme={theme}
          dataSource={[
            {
              name: LAYOUT.LIST,
              label: t('Poll_PollSettings_Tab_Layout_ChooseLayout_List'),
              icon: ListPollIcon,
            },
            {
              name: LAYOUT.GRID,
              label: t('Poll_PollSettings_Tab_Layout_ChooseLayout_Grid'),
              icon: GridPollIcon,
            },
            {
              name: LAYOUT.WITH_IMAGE,
              label: t('Poll_PollSettings_Tab_Layout_ChooseLayout_List'),
              icon: WithImagePollIcon,
            },
          ]}
          dataMapper={this.dataMapper}
          renderItem={this.renderOption}
          value={componentData.layout.type}
          onChange={this.handleTypeChange}
          className={styles.layout_selector}
        />
      </section>
    );
  }
}

LayoutSettingsSection.propTypes = {
  t: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};
