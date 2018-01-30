import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SelectionList, SelectionListOption } from 'stylable-components/dist/src/components/selection-list';
import { stylable } from 'wix-react-tools';

import Styles from './thumbnail-placement-selector.scss';
import stylableStyles from './thumbnail-placement-selector.st.css';

const ThumbnailPlacementSelector = stylable(stylableStyles)(class ThumbnailPlacementSelector extends Component {

  static propTypes = {
    value: PropTypes.oneOf(['bottom', 'left', 'top', 'right']),
    onChange: PropTypes.func.isRequired,
  };

  dataSource = [{ alignment: 'bottom' }, { alignment: 'left' }, { alignment: 'top' }, { alignment: 'right' }];

  dataMapper = ({ alignment }) => ({ value: alignment });

  renderOption = ({ alignment }, { value }, { id, selected }) => (
    <SelectionListOption id={id} value={value} selected={selected}>
      <div className={Styles[selected ? `${alignment}_selected` : alignment]}/>
    </SelectionListOption>
  );

  render() {
    const { value, onChange } = this.props;
    return (
      <div>
        <label>Thumbnail Placement</label>
        <SelectionList
          dataSource={this.dataSource}
          dataMapper={this.dataMapper}
          renderItem={this.renderOption}
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }
});

export default ThumbnailPlacementSelector;
