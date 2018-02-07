import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { mergeStyles } from '../Utils/mergeStyles';
import styles from '~/Styles/selection-list.scss';

class SelectionList extends Component {

  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  static propTypes = {
    dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
    dataMapper: PropTypes.func.isRequired,
    renderItem: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
    className: PropTypes.string,
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  mapItemToOptionData(item) {
    const option = this.props.dataMapper(item);
    return {
      item,
      option,
      selected: option.value === this.props.value
    };
  }

  render() {
    const { dataSource, className, onChange, renderItem, theme } = this.props;
    return (
      <div className={classnames(styles.selectionList, className)}>
        {dataSource.map(item => this.mapItemToOptionData(item))
          .map(({ item, option, selected }, i) => (
            <SelectionListOption selected={selected} onChange={onChange} key={i} theme={theme} value={option.value}>
              {renderItem({ item, option, selected })}
            </SelectionListOption>)
          )}
      </div>);
  }
}

class SelectionListOption extends Component {
  static propTypes = {
    theme: PropTypes.object.isRequired,
    selected: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    value: PropTypes.any.isRequired,
  };

  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  render() {
    const { selected, onChange, children, value } = this.props;
    return (
      <div
        className={classnames(this.styles.selectionListOption, selected ? this.styles.selectionListOption_selected : '')}
        onClick={() => onChange(value)}
      >
        {children}
      </div>);
  }
}

export default SelectionList;
