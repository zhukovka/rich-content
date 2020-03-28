import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ColorPicker, SelectionList, SliderWithInput } from 'wix-rich-content-editor-common';
import { mergeStyles } from 'wix-rich-content-common';

import { ColorIcon, ImageIcon, GradientIcon } from '../../../assets/icons';
import { BACKGROUND_PRESETS, BACKGROUND_TYPE } from '../../../constants';

import styles from './design-settings-section.scss';

export class DesignSettingsSection extends Component {
  styles = mergeStyles({ styles, theme: this.props.theme });

  updateDesign(design) {
    this.props.store.update('componentData', { design });
  }

  handleBackgroundChange = background => this.updateDesign({ poll: { background } });

  handlePollBorderRadiusChange = borderRadius =>
    this.updateDesign({ poll: { borderRadius: `${borderRadius}px` } });

  handleOptionBorderRadiusChange = borderRadius =>
    this.updateDesign({ option: { borderRadius: `${borderRadius}px` } });

  handleTypeChange = backgroundType => this.updateDesign({ poll: { backgroundType } });

  dataMapper = ({ name }) => ({ value: name });

  renderOption = ({ item }) => (
    <>
      <item.icon />
      <p>{item.label}</p>
    </>
  );

  render() {
    const { t, componentData, theme } = this.props;
    const { design } = componentData;

    return (
      <section className={styles.section}>
        <p>{t('Poll_PollSettings_Tab_Design_ChooseBackground_Title')}</p>
        <SelectionList
          theme={this.styles}
          dataSource={[
            {
              name: BACKGROUND_TYPE.COLOR,
              label: t('Poll_PollSettings_Tab_Design_ChooseBackground_Color'),
              icon: ColorIcon,
            },
            {
              name: BACKGROUND_TYPE.GRADIENT,
              label: t('Poll_PollSettings_Tab_Design_ChooseBackground_Gradient'),
              icon: GradientIcon,
            },
            {
              name: BACKGROUND_TYPE.IMAGE,
              label: t('Poll_PollSettings_Tab_Design_ChooseBackground_Pattern'),
              icon: ImageIcon,
            },
          ]}
          dataMapper={this.dataMapper}
          renderItem={this.renderOption}
          onChange={this.handleTypeChange}
          value={design.poll?.backgroundType}
          className={styles.layout_selector}
        />
        <p>{t('Poll_PollSettings_Tab_Design_ChooseBackground_Color_Pick')}</p>
        <ColorPicker
          color={design.poll?.background}
          palette={BACKGROUND_PRESETS[design.poll?.backgroundType]}
          onChange={this.handleBackgroundChange}
          theme={this.styles}
          t={t}
        >
          {({ renderPalette }) => <div>{renderPalette()}</div>}
        </ColorPicker>
        <p>{t('Poll_PollSettings_Tab_Design_CornerRadius_Title')}</p>
        <SliderWithInput
          min={0}
          max={20}
          label={t('Poll_PollSettings_Tab_Design_CornerRadius_Poll')}
          onChange={this.handlePollBorderRadiusChange}
          value={parseInt(design.poll?.borderRadius)}
          theme={theme}
        />
        <SliderWithInput
          min={0}
          max={10}
          label={t('Poll_PollSettings_Tab_Design_CornerRadius_Options')}
          onChange={this.handleOptionBorderRadiusChange}
          value={parseInt(design.option?.borderRadius)}
          theme={theme}
        />
      </section>
    );
  }
}

DesignSettingsSection.propTypes = {
  t: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};
