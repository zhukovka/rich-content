import React from 'react';
import PropTypes from 'prop-types';
import AnchorViewer from './AnchorViewer';

class Anchor extends React.PureComponent {
  render() {
    const { componentData, ...otherProps } = this.props;

    return <AnchorViewer componentData={componentData} {...otherProps} renderInEditor />;
  }
}

Anchor.propTypes = {
  componentData: PropTypes.object,
};

export { Anchor as Component };
