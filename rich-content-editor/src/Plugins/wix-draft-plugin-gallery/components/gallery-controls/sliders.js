import React from 'react';
import PropTypes from 'prop-types';
import SliderWithInput from '../stylable-base/slider-with-input';

const propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export const ItemsPerRow = props => <SliderWithInput min={1} max={5} label={'Items per row:'} {...props} />;
ItemsPerRow.propTypes = propTypes;

export const Spacing = props => <SliderWithInput label={'Spacing between items:'} {...props} />;
Spacing.propTypes = propTypes;

export const ThumbnailSize = props => <SliderWithInput label={'Thumbnail Size'} {...props} />;
ThumbnailSize.propTypes = propTypes;
