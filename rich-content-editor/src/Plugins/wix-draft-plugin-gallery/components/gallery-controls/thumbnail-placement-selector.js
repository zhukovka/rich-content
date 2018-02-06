import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SelectionList } from '~/Components/SelectionList';

import { mergeStyles } from '~/Utils';
import styles from './thumbnail-placement-selector.scss';
class ThumbnailPlacementSelector extends Component {

  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  dataSource = [{ alignment: 'bottom' }, { alignment: 'left' }, { alignment: 'top' }, { alignment: 'right' }];

  dataMapper = ({ alignment }) => ({ value: alignment });

  renderOption({ item, selected }) {
    return (
      <div
        className={classNames(this.styles.thumbnailPlacementSelector_tile,
          this.styles[selected ?
            `thumbnailPlacementSelector_${item.alignment}_selected` : `thumbnailPlacementSelector_${item.alignment}`])}
      />
    );
  }

  render() {
    const { value, onChange } = this.props;
    return (
      <div>
        <label className={this.styles.thumbnailPlacementSelector_label}>Thumbnail Placement</label>
        <SelectionList
          theme={this.props.theme}
          className={this.styles.thumbnailPlacementSelector_grid}
          dataSource={this.dataSource}
          dataMapper={this.dataMapper}
          renderItem={data => this.renderOption(data)}
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }
}

ThumbnailPlacementSelector.propTypes = {
  value: PropTypes.oneOf(['bottom', 'left', 'top', 'right']),
  theme: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ThumbnailPlacementSelector;
