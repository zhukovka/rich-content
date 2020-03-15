import React from 'react';
import PropTypes from 'prop-types';

export const RCEHelpersPropTypes = {
  rce: PropTypes.shape({
    isViewMode: PropTypes.bool.isRequired,
    setInPluginEditingMode: PropTypes.func,
  }).isRequired,
  layout: PropTypes.object.isRequired,
  design: PropTypes.object.isRequired,
};

export const RCEHelpersContext = React.createContext({});

export const withRCEHelpers = WrappedComponent => props => {
  return (
    <RCEHelpersContext.Consumer>
      {contextValue => (
        <WrappedComponent
          {...props}
          rce={contextValue}
          layout={contextValue.layout}
          design={contextValue.design}
        />
      )}
    </RCEHelpersContext.Consumer>
  );
};
