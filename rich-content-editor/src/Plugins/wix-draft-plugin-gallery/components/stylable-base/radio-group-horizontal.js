import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RadioGroup } from 'stylable-components/dist/src/components/radio-group';
import classnames from 'classnames';

import style from './radio-group-horizontal.scss';

class RadioGroupHorizontal extends Component {
  render() {
    const { label, readOnly, ...props } = this.props;
    return (
      <div className={classnames(style['radio-group-horizontal'], readOnly ? style.readOnly : '')}>
        {label ? <label className={style.titleLabel}>{label}</label> : null}
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
