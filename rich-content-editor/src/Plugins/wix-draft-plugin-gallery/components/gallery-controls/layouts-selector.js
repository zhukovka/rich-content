import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SelectionList, SelectionListOption } from 'stylable-components/dist/src/components/selection-list';

import style from './layout-selector.scss';
class LayoutSelector extends Component {
  dataSource = [
    { layoutId: 0, name: 'Collage' },
    { layoutId: 1, name: 'Masonry' },
    { layoutId: 2, name: 'Grid' },
    { layoutId: 3, name: 'Thumbnails' },
    { layoutId: 4, name: 'Slides' },
    { layoutId: 5, name: 'Slideshow' },
    { layoutId: 6, name: 'Panorama' },
    { layoutId: 7, name: 'Columns' },
  ];

  dataMapper = ({ layoutId, name }) => ({ value: layoutId, label: name });

  renderOption = ({ layoutId }, { label }, { id, selected, focused }) => (
    <SelectionListOption id={id} value={layoutId} selected={selected} focused={focused}>
      <div className={style['layout-tile']}>
        <div className={style[selected ? `${label.toLowerCase()}_selected` : label.toLowerCase()]} />
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
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default LayoutSelector;
