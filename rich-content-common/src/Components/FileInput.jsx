import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from '../Styles/file-input.scss';

class FileInput extends Component {

  static id = 1;

  componentWillMount() {
    this.id = `file_input_${++FileInput.id}`;
  }

  preventBubblingUp = event => event.preventDefault();

  renderInput() {
    const { onChange, accept, multiple, className, title, children, dataHook } = this.props;
    const hasMultiple = multiple ? { multiple } : {};
    return (
      <label
        className={className}
        htmlFor={this.id}
        style={this.props.style}
        title={title}
      >
        <input
          className={style.hiddenInput}
          id={this.id}
          type={'file'}
          data-hook={dataHook} onChange={onChange}
          accept={accept}
          tabIndex={'-1'}
          {...hasMultiple}
        />
        {children}
      </label>
    );
  }

  renderButton() {
    const { handleFileSelection, multiple, className, title, children, dataHook } = this.props;
    const onClick = () => handleFileSelection(multiple);
    return (
      <label
        className={className}
        htmlFor={this.id}
        style={this.props.style}
        title={title}
      >
        <button
          id={this.id}
          data-hook={dataHook} onClick={onClick}
        >
          {children}
        </button>
      </label>
    );

  }

  render() {
    const { handleFileSelection } = this.props;
    return handleFileSelection ? this.renderButton() : this.renderInput();
  }

}

FileInput.propTypes = {
  accept: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  handleFileSelection: PropTypes.func,
  children: PropTypes.node,
  multiple: PropTypes.bool,
  title: PropTypes.string,
  style: PropTypes.object,
  dataHook: PropTypes.string,
};

FileInput.defaultProps = {
  accept: 'image/*',
  multiple: false
};

export default FileInput;
