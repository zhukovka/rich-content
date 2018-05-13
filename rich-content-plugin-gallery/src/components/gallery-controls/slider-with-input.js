import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { mergeStyles, Slider } from 'wix-rich-content-common';
import styles from './slider-with-input.scss';

class SliderWithInput extends Component {

  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.id = `sld_${Math.floor(Math.random() * 9999)}`;
  }
  render() {
    const { readOnly, label, value, min, max, onChange, theme, sliderDataHook, inputDataHook } = this.props;
    const labelledBy = label ? { 'aria-labelledby': `${this.id}_lbl` } : {};

    return (
      <div className={readOnly ? this.styles.sliderWithInput_readOnly : null} >
        {label ? <span id={`${this.id}_lbl`} className={this.styles.sliderWithInput_label}>{label}</span> : null}
        <div className={this.styles.sliderWithInput_content}>
          <Slider
            theme={theme} value={value} dataHook={sliderDataHook} onChange={onChange} readOnly={readOnly}
            min={min} max={max} className={this.styles.sliderWithInput_slider} ariaProps={labelledBy}
          />
          <input
            tabIndex={readOnly ? -1 : 0} type="number" value={value} data-hook={inputDataHook}
            onChange={e => onChange(e.target.valueAsNumber)} className={this.styles.sliderWithInput_input}
            min={min} max={max} step="1"
          />
        </div>
      </div>
    );
  }
}

SliderWithInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.number.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  readOnly: PropTypes.bool,
  theme: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  sliderDataHook: PropTypes.string,
  inputDataHook: PropTypes.string,
};

SliderWithInput.defaultProps = {
  min: 0,
  max: 100,
};

export default SliderWithInput;
