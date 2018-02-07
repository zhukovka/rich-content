import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '~/Styles/slider.scss';
import { mergeStyles } from '~/Utils/mergeStyles';

class Slider extends Component {

  static propTypes = {
    value: PropTypes.number.isRequired,
    min: PropTypes.number,
    max: PropTypes.number,
    theme: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
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
    const { min, max, onChange } = this.props;
    return (
      <input
        type={'range'}
        className={this.styles.slider}
        onChange={e => this.onChange(e.target.valueAsNumber)}
        value={this.state.value} min={min} max={max}
        onMouseUp={e => onChange(e.target.valueAsNumber)}
      />);
  }
}

export default Slider;
