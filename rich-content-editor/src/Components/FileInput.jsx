import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from '~/Styles/file-input.scss';

class FileInput extends Component {

  static id = 1;

  componentWillMount() {
    this.id = `file_input_${++FileInput.id}`;
  }

  render() {
    const { onChange, accept, multiple, className, children } = this.props;
    const hasMultiple = multiple ? { multiple } : {};
    return (
      <label
        className={className}
        htmlFor={this.id}
        style={this.props.style}
      >
        <input
          className={style.hiddenInput}
          id={this.id}
          type={'file'}
          onChange={onChange}
          accept={accept}
          tabIndex={'-1'}
          {...hasMultiple}
        />
        {children}
      </label>);
  }
}

FileInput.propTypes = {
  accept: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node,
  multiple: PropTypes.bool,
  style: PropTypes.object
};

FileInput.defaultProps = {
  accept: 'image/*',
  multiple: false
};

export default FileInput;
