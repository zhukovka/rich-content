import React from 'react';
import PropTypes from 'prop-types';
import RadioGroupHorizontal from '../stylable-base/radio-group-horizontal';

const propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
};

export const ThumbnailResize = props => (
  <RadioGroupHorizontal label={'Thumbnail Resize'} dataSource={[{ value: '0', labelText: 'Crop' }, { value: '1', labelText: 'Fit' }]} {...props} />
);
ThumbnailResize.propTypes = propTypes;

export const TitleButtonPlacement = props => (
  <RadioGroupHorizontal
    label={'Title & Button Placement'}
    dataSource={[{ value: 'Underneath', labelText: 'Underneath' }, { value: 'On Hover', labelText: 'On Hover' }]}
    {...props}
  />
);
TitleButtonPlacement.propTypes = propTypes;

export const ImageOrientation = props => (
  <RadioGroupHorizontal
    label={'Image Orientation'}
    dataSource={[{ value: 'Vertical', labelText: 'Vertical' }, { value: 'Horizontal', labelText: 'Horizontal' }]}
    {...props}
  />
);
ImageOrientation.propTypes = propTypes;

export const ScrollDirection = props => (
  <RadioGroupHorizontal
    label={'Scroll Direction'}
    dataSource={[{ value: 0, labelText: 'Vertical' }, { value: 1, labelText: 'Horizontal' }]}
    {...props}
  />
);
ScrollDirection.propTypes = propTypes;
