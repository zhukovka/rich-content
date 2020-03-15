import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { PollContextProvider } from './poll-context';
import { RCEHelpersContext } from './rce-helpers-context';
import { Poll } from './Poll';

export class PollViewer extends PureComponent {
  render() {
    const { componentData } = this.props;

    return (
      <RCEHelpersContext.Provider
        value={{ isViewMode: true, layout: componentData.layout, design: componentData.design }}
      >
        <PollContextProvider pollId={componentData.pollId} poll={componentData.poll}>
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
};
