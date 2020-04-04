import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { SelectionList, Checkbox, Separator } from 'wix-rich-content-editor-common';
import { mergeStyles } from 'wix-rich-content-common';

import { LAYOUT } from '../../../constants';
import { ListPollIcon, GridPollIcon } from '../../../assets/icons';

import styles from './layout-settings-section.scss';

export class LayoutSettingsSection extends Component {
  styles = mergeStyles({ styles, theme: this.props.theme });

  updateSettings(layout) {
    this.props.store.update('componentData', {
      layout,
    });
  }

  handlePollTypeChange = type => {
    this.updateSettings({
      poll: { type },
      option: { enableImage: type === LAYOUT.GRID },
    });

    window.dispatchEvent(new Event('resize'));
  };

  handlePollEnableImageChange = event =>
    this.updateSettings({ poll: { enableImage: event.target.checked } });

  handleOptionEnableImageChange = event =>
    this.updateSettings({ option: { enableImage: event.target.checked } });

  dataMapper = ({ name }) => ({ value: name });

  renderOption = ({ item }) => (
    <>
      <item.icon />
      <p>{item.label}</p>
    </>
  );

  render() {
    const { componentData, t } = this.props;

    return (
      <section className={styles.section}>
        <p className={styles.title}>{t('Poll_PollSettings_Tab_Layout_Section_Question_Header')}</p>

        <Checkbox
          label={t('Poll_PollSettings_Tab_Layout_Section_Question_Image')}
          checked={componentData.layout.poll?.enableImage}
          onChange={this.handlePollEnableImageChange}
          theme={this.styles}
        />

        <Separator horizontal className={styles.separator} />

        <p className={styles.title}>{t('Poll_PollSettings_Tab_Layout_Section_Answers_Header')}</p>
        <p className={styles.subtitle}>
          {t('Poll_PollSettings_Tab_Layout_Section_Answers_Layout')}
        </p>

        <SelectionList
          theme={this.styles}
          dataSource={[
            {
              name: LAYOUT.LIST,
              label: t('Poll_PollSettings_Tab_Layout_Section_Answers_Layout_List'),
              icon: ListPollIcon,
            },
            {
              name: LAYOUT.GRID,
              label: t('Poll_PollSettings_Tab_Layout_Section_Answers_Layout_Grid'),
              icon: GridPollIcon,
            },
          ]}
          dataMapper={this.dataMapper}
          renderItem={this.renderOption}
          value={componentData.layout.poll?.type}
          onChange={this.handlePollTypeChange}
          className={styles.layout_selector}
        />

        <Checkbox
          label={t('Poll_PollSettings_Tab_Layout_Section_Answers_Image')}
          checked={componentData.layout.option?.enableImage}
          onChange={this.handleOptionEnableImageChange}
          theme={this.styles}
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
