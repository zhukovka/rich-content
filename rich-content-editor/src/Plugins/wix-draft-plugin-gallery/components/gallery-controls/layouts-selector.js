import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SelectionList, SelectionListOption } from 'stylable-components/dist/src/components/selection-list';

import style from './layout-selector.scss';
class LayoutSelector extends Component {
  dataSource = [
    { icon: '🐍', name: 'Grid' },
    { icon: '🐋', name: 'Masonry' },
    { icon: '🐊', name: 'Collage' },
    { icon: '🐘', name: 'Thumbnails' },
    { icon: '🐇', name: 'Slideshow' },
    { icon: '🐝', name: 'Panorama' },
    { icon: '🐵', name: 'Columns' },
    { icon: '🐕', name: 'Slides' },
  ];

  dataMapper = ({ icon, name }) => ({ value: name, label: name });

  renderOption = ({ icon, name }, { value, label }, { id, selected, focused }) => (
    <SelectionListOption id={id} value={value} selected={selected} focused={focused}>
      <div className={style['layout-tile']}>
        <div>{icon}</div>
        <div>{label}</div>
      </div>
    </SelectionListOption>
  );

  handleChange = value => this.setState({ value });

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
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

LayoutSelector.defaultProps = {
  initLayout: 'Grid',
};

export default LayoutSelector;
