import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Toggle } from 'stylable-components/dist/src/components/toggle';

import style from './toggle-with-label.scss';

class ToggleWithLabel extends Component {
  render() {
    const { value, label, onChange } = this.props;
    return (
      <div className={style['toggle-with-label']}>
        {label ? <label>{label}</label> : null}
        <Toggle value={!!value} onChange={onChange} />
      </div>
    );
  }
}

ToggleWithLabel.propTypes = {
  value: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default ToggleWithLabel;
