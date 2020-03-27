import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Poll } from './Poll';
import { PollContextProvider } from './poll-context';
import { RCEHelpersContext } from './rce-helpers-context';

export class PollEditor extends PureComponent {
  setPoll = poll => {
    const { componentData, store } = this.props;

    store.set('componentData', {
      ...componentData,
      poll,
    });
  };

  isPluginFocused() {
    const blockKey = this.props.block.getKey();
    const selectedBlockKey = this.props.selection.getAnchorKey();

    return blockKey === selectedBlockKey;
  }

  render() {
    const {
      componentData,
      componentState,
      setInPluginEditingMode,
      settings,
      helpers,
      t,
    } = this.props;

    return (
      <RCEHelpersContext.Provider
        value={{
          isViewMode: settings.isWebView || componentState.isPreview || !this.isPluginFocused(),
          setInPluginEditingMode,
          layout: componentData.layout,
          design: componentData.design,
          helpers,
          t,
        }}
      >
        <PollContextProvider settings={settings} poll={componentData.poll} setPoll={this.setPoll}>
          <Poll />
        </PollContextProvider>
      </RCEHelpersContext.Provider>
    );
  }
}

PollEditor.propTypes = {
  componentState: PropTypes.shape({
    isPreview: PropTypes.bool,
  }).isRequired,
  componentData: PropTypes.shape({
    poll: PropTypes.object,
    pollId: PropTypes.string,
    layout: PropTypes.object,
    design: PropTypes.object,
  }).isRequired,

  block: PropTypes.object.isRequired,
  selection: PropTypes.object.isRequired,

  setInPluginEditingMode: PropTypes.func.isRequired,
  settings: PropTypes.shape({
    siteToken: PropTypes.string,
    isWebView: PropTypes.bool,
  }),
  helpers: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  store: PropTypes.shape({
    set: PropTypes.func.isRequired,
    get: PropTypes.func.isRequired,
  }).isRequired,
};
