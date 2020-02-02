import React from 'react';
import PropTypes from 'prop-types';
import AnchorViewer from './AnchorViewer';

class Anchor extends React.PureComponent {
  render() {
    const { componentData, children, anchorTarget, relValue, settings, ...otherProps } = this.props;

    return (
      <AnchorViewer
        componentData={componentData}
        anchorTarget={anchorTarget}
        relValue={relValue}
        settings={settings}
        {...otherProps}
        renderInEditor
      >
        {children}
      </AnchorViewer>
    );
  }
}

Anchor.propTypes = {
  componentData: PropTypes.object,
  entityKey: PropTypes.string.isRequired,
  contentState: PropTypes.object.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
  settings: PropTypes.object,
  href: PropTypes.string,
  rel: PropTypes.string,
  target: PropTypes.string,
};

export { Anchor as Component };
