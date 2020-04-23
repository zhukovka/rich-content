/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from '../statics/styles/in-plugin-input.scss';
import { RichContentEditor } from 'wix-rich-content-editor';

class InPluginInput extends Component {
  handleFocus = () => {
    this.props.setFocusToBlock();
    this.props.setInPluginEditingMode(true);
  };

  handleBlur = () => {
    this.props.setInPluginEditingMode(false);
  };

  handleKeyPress = e => {
    const { setFocusToBlock, value } = this.props;
    if (e.key === 'Enter' && setFocusToBlock && value !== '') {
      this.handleBlur();
      setFocusToBlock();
    }
  };

  onChange = e => this.props.onChange?.(e.target.value);

  className = classnames(styles.inPluginInput, this.props.className);

  render() {
    return (
      <div className={this.className}>
        <RichContentEditor
          ref={this.rceRef}
          onChange={this.props.onChange}
          editorState={this.props.editorState}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          placeholder="image title"
        />
      </div>
    );
  }
}

InPluginInput.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  setFocusToBlock: PropTypes.func,
  setInPluginEditingMode: PropTypes.func,
  editorState: PropTypes.object,
  contentState: PropTypes.object,
};

InPluginInput.defaultProps = {
  setInPluginEditingMode: () => false,
  setFocusToBlock: () => false,
};

export default InPluginInput;
