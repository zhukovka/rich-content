import React from 'react';
import PropTypes from 'prop-types';
import SliderWithInput from './slider-with-input';

const propTypes = {
  value: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.object,
};

export const ItemsPerRow = props => <SliderWithInput min={1} max={5} label={'Items per row:'} {...props} />;
ItemsPerRow.propTypes = propTypes;

export const Spacing = props => <SliderWithInput label={'Spacing between items:'} {...props} />;
Spacing.propTypes = propTypes;

export const ThumbnailSize = props => (
  <SliderWithInput
    label={props.options.isVertical ? 'Column Width' : 'Row Height'} min={10} max={1000} {...props}
  />
);
ThumbnailSize.propTypes = propTypes;
