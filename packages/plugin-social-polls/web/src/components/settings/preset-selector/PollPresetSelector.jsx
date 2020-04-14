/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import cls from 'classnames';
import { merge } from 'lodash';

import { SelectionList } from 'wix-rich-content-editor-common';
import { mergeStyles } from 'wix-rich-content-common';

import { getRandomValue } from '../../../helpers';
import { LAYOUT, BACKGROUND_PRESETS, BACKGROUND_TYPE } from '../../../constants';
import { ListPollIcon, GridPollIcon, WithImagePollIcon } from '../../../assets/icons';

import styles from './poll-preset-selector.scss';

export class PollPresetSelector extends PureComponent {
  styles = mergeStyles({ styles, theme: this.props.theme });

  handleTypeSelection = preset => {
    const { helpers, componentData, onConfirm } = this.props;

    onConfirm(
      merge({}, componentData, {
        layout: preset,
        design: {
          poll: {
            backgroundType: BACKGROUND_TYPE.IMAGE,
            background: getRandomValue(BACKGROUND_PRESETS[BACKGROUND_TYPE.IMAGE]),
          },
        },
      })
    );
    helpers.closeModal();
  };

  renderOption = ({ item }) => (
    <>
      <item.icon />
      <p className={styles.selectionListOptionLabel}>{item.label}</p>
    </>
  );

  render() {
    const { t } = this.props;

    return (
      <div>
        <p className={styles.title}>{t('Poll_Presets_Popup_Title')}</p>
        <p className={styles.subtitle}>{t('Poll_Presets_Popup_Subtitle')}</p>

        <SelectionList
          theme={this.styles}
          dataSource={[
            {
              value: {
                poll: {
                  type: LAYOUT.LIST,
                  enableImage: false,
                },
                option: {
                  enableImage: false,
                },
              },
              label: t('Poll_Presets_Popup_Option_TextList'),
              icon: ListPollIcon,
            },
            {
              value: {
                poll: {
                  type: LAYOUT.LIST,
                  enableImage: true,
                },
                option: {
                  enableImage: false,
                },
              },
              label: t('Poll_Presets_Popup_Option_TextListAndMainImage'),
              icon: WithImagePollIcon,
            },
            {
              value: {
                poll: {
                  type: LAYOUT.GRID,
                  enableImage: false,
                },
                option: {
                  enableImage: true,
                },
              },
              label: t('Poll_Presets_Popup_Option_ImagesGrid'),
              icon: GridPollIcon,
            },
          ]}
          renderItem={this.renderOption}
          onChange={this.handleTypeSelection}
          className={cls(styles.preset_selector)}
        />
      </div>
    );
  }
}
