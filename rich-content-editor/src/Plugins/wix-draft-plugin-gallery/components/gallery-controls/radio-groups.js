import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RadioGroupHorizontal from '../stylable-base/radio-group-horizontal';

class BinaryOptionGroup extends Component {
  constructor(props) {
    super(props);
    this.buttons = [];
    this.label = '';
  }

  render = () => <RadioGroupHorizontal label={this.label} dataSource={this.buttons} onChange={this.props.onChange} value={this.props.value} />;
}

BinaryOptionGroup.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export class ThumbnailResize extends BinaryOptionGroup {
  constructor(props) {
    super(props);
    this.buttons = [
      {
        value: 'Crop',
        labelText: 'Crop',
      },
      {
        value: 'Fit',
        labelText: 'Fit',
      },
    ];
    this.label = 'Thumbnail Resize';
  }
}

ThumbnailResize.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOf('Fit', 'Crop'),
};

export class TitleButtonPlacement extends BinaryOptionGroup {
  constructor(props) {
    super(props);
    this.buttons = [
      {
        value: 'Underneath',
        labelText: 'Underneath',
      },
      {
        value: 'Hover',
        labelText: 'On Hover',
      },
    ];
    this.label = 'Title & Button Placement';
  }
}

TitleButtonPlacement.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOf('Hover', 'Underneath'),
};

export class ImageOrientation extends BinaryOptionGroup {
  constructor(props) {
    super(props);
    this.buttons = [
      {
        value: 'Vertical',
        labelText: 'Vertical',
      },
      {
        value: 'Horizontal',
        labelText: 'Horizontal',
      },
    ];
    this.label = 'Image Orientation';
  }
}

ImageOrientation.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOf('Vertical', 'Horizontal'),
};

export class ScrollDirection extends BinaryOptionGroup {
  constructor(props) {
    super(props);
    this.buttons = [
      {
        value: 'Vertical',
        labelText: 'Vertical',
      },
      {
        value: 'Horizontal',
        labelText: 'Horizontal',
      },
    ];
    this.label = 'Scroll Direction';
  }
}

ScrollDirection.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOf('Vertical', 'Horizontal'),
};
