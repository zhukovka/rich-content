import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RadioGroup from '~/Components/RadioGroup';
import { mergeStyles } from '~/Utils';
import styles from '~/Styles/radio-group-horizontal.scss';

class RadioGroupHorizontal extends Component {

  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  render() {
    const { label, readOnly, ...props } = this.props;
    return (
      <div className={readOnly ? this.styles.radioGroupHorizontal_readOnly : ''}>
        {label ? <label className={this.styles.radioGroupHorizontal_title}>{label}</label> : null}
        <RadioGroup {...props} readOnly={readOnly} className={this.styles.radioGroupHorizontal_group} />
      </div>
    );
  }
}

RadioGroupHorizontal.propTypes = {
  label: PropTypes.string,
  dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  theme: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default RadioGroupHorizontal;
