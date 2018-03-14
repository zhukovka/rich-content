import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectionList from '~/Components/SelectionList';
import classNames from 'classnames';

import { mergeStyles } from '~/Utils';
import styles from './image-ratio-selector.scss';
class ImageRatioSelector extends Component {

  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  dataMapper = ({ ratio }) => ({ value: ratio });

  renderOption = ({ item, selected }) => (
    <div className={this.styles.imageRatioSelector_tile}>
      <div className={classNames(this.styles.imageRatioSelector_ratioButton, selected ? this.styles.imageRatioSelector_ratioButton_selected : '')}>
        <div
          className={classNames(this.styles.imageRatioSelector_ratioIcon,
            item.ratioClass, { [this.styles.imageRatioSelector_ratioIcon_selected]: selected })}
        />
      </div>
      <label className={this.styles.imageRatioSelector_ratioLabel}>{item.name}</label>
    </div>
  );

  render() {
    const dataSource = [
      { ratio: 16 / 9, name: '16:9', ratioClass: this.styles.imageRatioSelector_16_9 },
      { ratio: 4 / 3, name: '4:3', ratioClass: this.styles.imageRatioSelector_4_3 },
      { ratio: 1, name: '1:1', ratioClass: this.styles.imageRatioSelector_1_1 },
      { ratio: 3 / 4, name: '3:4', ratioClass: this.styles.imageRatioSelector_3_4 },
      { ratio: 9 / 16, name: '9:16', ratioClass: this.styles.imageRatioSelector_9_16 },
    ];
    const { styles } = this;
    const { value, onChange, theme, options, t } = this.props;
    const imageRatioLabel = t('GallerySettings_Image_Ratio');


    return (
      <div className={options.readOnly ? styles.imageRatioSelector_readOnly : null}>
        <label className={styles.imageRatioSelector_label}>{imageRatioLabel}</label>
        <SelectionList
          theme={theme}
          className={styles.imageRatioSelector_grid}
          dataSource={dataSource}
          dataMapper={this.dataMapper}
          renderItem={this.renderOption}
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }
}

ImageRatioSelector.propTypes = {
  value: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.object,
  t: PropTypes.func,
};

export default ImageRatioSelector;
