import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RadioGroup } from 'stylable-components/dist/src/components/radio-group';

import style from './radio-group-horizontal.scss';

class RadioGroupHorizontal extends Component {
  render() {
    const { label, readOnly, ...props } = this.props;
    return (
      <div
        className={style['radio-group-horizontal']}
        style={{
          opacity: readOnly ? 0.5 : 1
        }}
      >
        {label ? <label>{label}</label> : null}
        <RadioGroup {...props} readOnly={readOnly} className={style['radio-group']} />
      </div>
    );
  }
}

RadioGroupHorizontal.propTypes = {
  label: PropTypes.string,
  dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default RadioGroupHorizontal;
