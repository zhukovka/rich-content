import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from './file-input.scss';

class FileInput extends Component {

  static id = 1;

  componentWillMount() {
    this.id = `file_input_${++FileInput.id}`;
  }

  render() {
    return (
      <label className={this.props.className} htmlFor={this.id}>
        <input
          className={style.hiddenInput}
          id={this.id}
          type={'file'}
          onChange={this.props.onChange}
          accept={this.props.accept}
          tabIndex={'-1'}
        />
        {this.props.children}
      </label>);
  }
}

FileInput.propTypes = {
  accept: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node,
};

FileInput.defaultProps = {
  accept: 'image/*'
};

export default FileInput;
