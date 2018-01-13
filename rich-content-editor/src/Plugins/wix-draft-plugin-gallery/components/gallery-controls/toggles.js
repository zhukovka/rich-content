import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ToggleWithLabel from '../stylable-base/toggle-with-label';

class LoadMoreToggle extends Component {
  render() {
    return <ToggleWithLabel label={'Load More Button'} value={this.props.value} />;
  }
}

LoadMoreToggle.propTypes = {
  value: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default LoadMoreToggle;
