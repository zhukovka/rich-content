import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from '~/Components/Slider';

import { mergeStyles } from '~/Utils';
import styles from './slider-with-input.scss';

class SliderWithInput extends Component {

  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }
  render() {
    const { readOnly, label, value, min, max, onChange, theme } = this.props;
    return (
      <div className={readOnly ? this.styles.sliderWithInput_readOnly : null}>
        {label ? <label className={this.styles.sliderWithInput_label}>{label}</label> : null}
        <div className={this.styles.sliderWithInput_content}>
          <Slider theme={theme} value={value} onChange={onChange} min={min} max={max} className={this.styles.sliderWithInput_slider} />
          <input value={Math.floor(value)} onChange={onChange} className={this.styles.sliderWithInput_input}/>
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
};

SliderWithInput.defaultProps = {
  min: 0,
  max: 100,
};

export default SliderWithInput;
