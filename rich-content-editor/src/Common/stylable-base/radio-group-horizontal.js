import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RadioGroup } from 'stylable-components/dist/src/components/radio-group';

import style from './radio-group-horizontal.scss';

class RadioGroupHorizontal extends Component {
  render() {
    const { label, ...props } = this.props;
    return (
      <div className={style['radio-group-horizontal']}>
        {label ? <label>{label}</label> : null}
        <RadioGroup {...props} className={style['radio-group']} />
      </div>
    );
  }
}

RadioGroupHorizontal.propTypes = {
  label: PropTypes.string,
  dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string.isRequired,
};

export default RadioGroupHorizontal;
