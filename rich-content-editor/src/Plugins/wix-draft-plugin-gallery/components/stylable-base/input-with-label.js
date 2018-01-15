import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { input } from 'stylable-components/dist/src/components/input';

import style from './input-with-label.scss';

class InputWithLabel extends Component {
  render() {
    const { label, placeholder, value, onChange } = this.props;
    return (
      <div className={style['input-with-label']}>
        {label ? <label htmlFor={`${label}_input`}>{label}</label> : null}
        <input placeholder={placeholder} name={label ? `${label}_input` : ''} value={value} onChange={onChange} />
      </div>
    );
  }
}
InputWithLabel.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default InputWithLabel;
