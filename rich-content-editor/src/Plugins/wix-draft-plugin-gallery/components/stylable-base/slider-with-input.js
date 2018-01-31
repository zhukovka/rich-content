import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Slider } from 'stylable-components/dist/src/components/slider';
import { input } from 'stylable-components/dist/src/components/input';

import style from './slider-with-input.scss';

class SliderWithInput extends Component {
  render() {
    const { label, value, min, max, onChange } = this.props;
    return (
      <div className={style['slider-with-input']}>
        {label ? <label>{label}</label> : null}
        <div>
          <Slider value={value} onChange={onChange} min={min} max={max} className={style.slider} />
          <input value={value} onChange={onChange} className={style.input}/>
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
  onChange: PropTypes.func.isRequired,
};

SliderWithInput.defaultProps = {
  min: 0,
  max: 100,
};

export default SliderWithInput;
