import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from '../Utils/mergeStyles';
import styles from '../Styles/slider.scss';

class Slider extends Component {

  static propTypes = {
    value: PropTypes.number.isRequired,
    min: PropTypes.number,
    max: PropTypes.number,
    theme: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    dataHook: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = { value: props.value };
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  onChange(value) {
    this.setState({ value });
  }

  render() {
    const { min, max, onChange, dataHook } = this.props;
    return (
      <input
        type={'range'}
        className={this.styles.slider}
        data-hook={dataHook} onChange={e => this.onChange(e.target.valueAsNumber)}
        value={this.state.value} min={min} max={max}
        onMouseUp={e => onChange(e.target.valueAsNumber)}
      />);
  }
}

export default Slider;
