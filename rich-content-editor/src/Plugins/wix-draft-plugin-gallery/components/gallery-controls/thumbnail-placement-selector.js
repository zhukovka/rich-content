import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SelectionList, SelectionListOption } from 'stylable-components/dist/src/components/selection-list';

import style from './thumbnail-placement-selector.scss';
class ThumbnailPlacementSelector extends Component {
  dataSource = [{ thumbnailClass: '_0' }, { thumbnailClass: '_90' }, { thumbnailClass: '_180' }, { thumbnailClass: '_270' }];

  dataMapper = ({ thumbnailClass }) => ({ value: thumbnailClass });

  renderOption = ({ thumbnailClass }, { value }, { id, selected, focused }) => (
    <SelectionListOption id={id} value={value} selected={selected} focused={focused}>
      <div className={classNames(style['thumbnail-tile'], style[selected ? `${thumbnailClass}_selected` : thumbnailClass])} />
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
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ThumbnailPlacementSelector;
