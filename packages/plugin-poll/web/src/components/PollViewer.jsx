import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { PollContextProvider } from './poll-context';
import { RCEHelpersContext } from './rce-helpers-context';
import { Poll } from './Poll';

export class PollViewer extends PureComponent {
  render() {
    const { componentData, settings } = this.props;

    return (
      <RCEHelpersContext.Provider
        value={{ isViewMode: true, layout: componentData.layout, design: componentData.design }}
      >
        <PollContextProvider poll={componentData.poll} settings={settings}>
          <Poll />
        </PollContextProvider>
      </RCEHelpersContext.Provider>
    );
  }
}

PollViewer.propTypes = {
  componentData: PropTypes.shape({
    poll: PropTypes.object.isRequired,
    layout: PropTypes.object.isRequired,
    design: PropTypes.object.isRequired,
    pollId: PropTypes.string,
  }).isRequired,
  settings: PropTypes.object,
};
