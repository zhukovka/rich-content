import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SelectionList, SelectionListOption } from 'stylable-components/dist/src/components/selection-list';

import style from './layout-selector.scss';
class LayoutSelector extends Component {
  dataSource = [
    { name: 'Grid' },
    { name: 'Masonry' },
    { name: 'Collage' },
    { name: 'Thumbnails' },
    { name: 'Slideshow' },
    { name: 'Panorama' },
    { name: 'Columns' },
    { name: 'Slides' },
  ];

  dataMapper = ({ name }) => ({ value: name.toLowerCase(), label: name });

  renderOption = ({ name }, { value, label }, { id, selected, focused }) => (
    <SelectionListOption id={id} value={value} selected={selected} focused={focused}>
      <div className={style['layout-tile']}>
        <div className={style[selected ? `${value}_selected` : value]} />
        <div>{label}</div>
      </div>
    </SelectionListOption>
  );

  render() {
    const { value, onChange } = this.props;
    return (
      <SelectionList
        className={style['layouts-grid']}
        dataSource={this.dataSource}
        dataMapper={this.dataMapper}
        renderItem={this.renderOption}
        value={value}
        onChange={onChange}
      />
    );
  }
}

LayoutSelector.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default LayoutSelector;
