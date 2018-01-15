import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SelectionList, SelectionListOption } from 'stylable-components/dist/src/components/selection-list';

import style from './thumbnail-placement-selector.scss';
class ThumbnailPlacementSelector extends Component {

  dataSource = [{ alignment: 'bottom' }, { alignment: 'left' }, { alignment: 'top' }, { alignment: 'right' }];

  dataMapper = ({ alignment }) => ({ value: alignment });

  renderOption = ({ alignment }, { value }, { id, selected, focused }) => (
    <SelectionListOption id={id} value={value} selected={selected} focused={focused}>
      <div className={classNames(style['thumbnail-tile'], style[selected ? `${alignment}_selected` : alignment])} />
    </SelectionListOption>
  );

  render() {
    const { value, onChange } = this.props;
    return (
      <div className={style['thumbnail-placement-selector']}>
        <label>Thumbnail Placement</label>
        <SelectionList
          className={style['thumbnails-grid']}
          dataSource={this.dataSource}
          dataMapper={this.dataMapper}
          renderItem={this.renderOption}
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }
}

ThumbnailPlacementSelector.propTypes = {
  value: PropTypes.oneOf(['bottom', 'left', 'top', 'right']),
  onChange: PropTypes.func.isRequired,
};

export default ThumbnailPlacementSelector;
