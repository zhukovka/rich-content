import React from 'react';
import PropTypes from 'prop-types';
import RadioGroupHorizontal from '../stylable-base/radio-group-horizontal';

const propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.object
};

export const ThumbnailResize = props => (
  <RadioGroupHorizontal
    label={'Thumbnail Resize'}
    dataSource={[{ value: 'fill', labelText: 'Crop' }, { value: 'fit', labelText: 'Fit' }]}
    {...props}
  />
);
ThumbnailResize.propTypes = propTypes;

export const TitleButtonPlacement = props => (
  <RadioGroupHorizontal
    label={'Title & Button Placement'}
    dataSource={[{ value: 'SHOW_ALWAYS', labelText: 'Underneath' }, { value: 'SHOW_ON_HOVER', labelText: 'On Hover' }]}
    {...props}
  />
);
TitleButtonPlacement.propTypes = propTypes;

export const ImageOrientation = props => (
  <RadioGroupHorizontal
    label={'Image Orientation'}
    readOnly={props.options.oneRow}
    dataSource={[{ value: '1', labelText: 'Vertical' }, { value: '0', labelText: 'Horizontal' }]}
    {...props}
  />
);
ImageOrientation.propTypes = propTypes;

export const ScrollDirection = props => (
  <RadioGroupHorizontal
    label={'Scroll Direction'}
    dataSource={[{ value: 'vertical', labelText: 'Vertical' }, { value: 'horizontal', labelText: 'Horizontal' }]}
    {...props}
  />
);
ScrollDirection.propTypes = propTypes;
