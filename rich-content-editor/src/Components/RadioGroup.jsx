import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from '~/Styles/radio-group.scss';
import { mergeStyles } from '~/Utils/mergeStyles';

class RadioGroup extends Component {

  static id = 0;

  static propTypes = {
    dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    className: PropTypes.string,
    theme: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    ++RadioGroup.id;
  }


  render() {
    const { dataSource, value, className, onChange } = this.props;

    return (
      <div className={classnames(this.styles.radioGroup, className)}>
        {dataSource
          .map(option => {
            const checked = option.value === value ? { checked: 'checked' } : {};
            return (
              <label name={`group_${RadioGroup.id}`} key={option.value} className={this.styles.radioGroup} onClick={() => onChange(option.value)}>
                <input className={this.styles.radioGroup_input} type={'radio'} {...checked} onChange={() => {}}/>
                <span className={this.styles.radioGroup_button}/>
                <span className={this.styles.radioGroup_label}>{option.labelText}</span>
              </label>);
          })}
      </div>);
  }
}

export default RadioGroup;
