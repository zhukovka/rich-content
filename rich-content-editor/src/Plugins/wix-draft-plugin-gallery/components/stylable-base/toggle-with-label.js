import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Toggle } from 'stylable-components/dist/src/components/toggle';

import { mergeStyles } from '~/Utils';
import styles from './toggle-with-label.scss';

class ToggleWithLabel extends Component {

  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }
  render() {
    const { value, label, onChange } = this.props;
    return (
      <div className={this.styles.toggleWithLabel}>
        {label ? <label className={this.styles.toggleWithLabel_label}>{label}</label> : null}
        <Toggle value={!!value} onChange={onChange} className={this.styles.toggleWithLabel_toggle}/>
      </div>
    );
  }
}

ToggleWithLabel.propTypes = {
  value: PropTypes.bool,
  theme: PropTypes.object.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default ToggleWithLabel;
