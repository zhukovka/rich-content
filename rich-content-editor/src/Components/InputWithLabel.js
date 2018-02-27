import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from '~/Styles/input-with-label.scss';
import { mergeStyles } from '~/Utils/mergeStyles';

class InputWithLabel extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }
  render() {
    const { label, placeholder, value, onChange, isTextArea } = this.props;
    const inputClassName = classNames(styles.inputWithLabel_input,
      {
        [styles.inputWithLabel_textArea]: isTextArea
      }
    );
    return (
      <div>
        {label ? <label className={this.styles.inputWithLabel_label} htmlFor={`${label}_input`}>{label}</label> : null}
        {isTextArea ? <textarea
          className={inputClassName}
          placeholder={placeholder}
          id={label ? `${label}_input` : ''}
          value={value}
          onChange={onChange}
        /> : <input
          className={styles.inputWithLabel_input}
          placeholder={placeholder}
          id={label ? `${label}_input` : ''}
          value={value}
          onChange={onChange}
        />}
      </div>
    );
  }
}
InputWithLabel.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  theme: PropTypes.object.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  isTextArea: PropTypes.bool,
};

export default InputWithLabel;
