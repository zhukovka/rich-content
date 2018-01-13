import React from 'react';
import PropTypes from 'prop-types';
import ToggleWithLabel from '../stylable-base/toggle-with-label';

const propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export const LoadMoreToggle = props => <ToggleWithLabel label={'Load More Button'} {...props} />;
LoadMoreToggle.propTypes = propTypes;
