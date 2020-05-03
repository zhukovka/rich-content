import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { merge } from 'lodash';
import {
  WithEditorEventsProps,
  withEditorEvents,
  EditorEvents,
} from 'wix-rich-content-editor-common';

import { SocialPollsService } from '../../api';

import { PollPropTypes } from './types';

export const PollContext = React.createContext({});

export const withPoll = WrappedComponent => props => {
  return (
    <PollContext.Consumer>
      {contextValue => {
        return <WrappedComponent {...props} {...contextValue} />;
      }}
    </PollContext.Consumer>
  );
};

export class PollContextProviderComponent extends PureComponent {
  state = {
    changePollTitle: this.changePollTitle.bind(this),
    updatePollOption: this.updatePollOption.bind(this),
    addOption: this.addOption.bind(this),
    removeOption: this.removeOption.bind(this),
    changePollImage: this.changePollImage.bind(this),
    vote: this.vote.bind(this),
    unvote: this.unvote.bind(this),
    getVoters: this.getVoters.bind(this),
    poll: this.props.poll,
  };

  static getDerivedStateFromProps(props, state) {
    return {
      poll: merge(state.poll, { settings: props.poll.settings }),
    };
  }

  componentDidMount() {
    const { poll } = this.state;
    const { settings, editorEvents } = this.props;

    this.pollApiClient = new SocialPollsService(settings.siteToken);

    if (poll.id && !settings.isWebView) {
      this.fetchPoll();
    }

    editorEvents.subscribe(EditorEvents.PUBLISH, this.syncPoll);
  }

  componentWillUnmount() {
    this.props.editorEvents.unsubscribe(EditorEvents.PUBLISH, this.syncPoll);
  }

  async fetchPoll() {
    const poll = await this.pollApiClient.fetchPoll(this.state.poll.id);

    this.setState({ poll });
  }

  syncPoll = async () => {
    const { poll } = this.state;
    let dto;

    if (poll.id) {
      this.pollApiClient.cancelTokens.updatePoll?.cancel(SocialPollsService.CANCEL_MESSAGE);
      dto = await this.pollApiClient.updatePoll(poll);
    } else {
      this.pollApiClient.cancelTokens.createPoll?.cancel(SocialPollsService.CANCEL_MESSAGE);
      dto = await this.pollApiClient.createPoll(poll);
    }

    this.updatePoll(dto);
    this.props.setPoll(dto);
  };

  updatePoll(poll) {
    this.setState({
      poll: {
        ...this.state.poll,
        ...poll,
      },
    });
  }

  async vote(optionId) {
    const poll = await this.pollApiClient.vote(this.state.poll.id, optionId);

    this.setState({ poll });
  }

  async unvote(optionId) {
    const poll = await this.pollApiClient.unvote(this.state.poll.id, optionId);

    this.setState({ poll });
  }

  getVoters(optionId, params) {
    return this.pollApiClient.getVoters(this.state.poll.id, optionId, params);
  }

  changePollTitle(title) {
    return this.updatePoll({ title });
  }

  changePollImage(mediaId) {
    return this.updatePoll({ mediaId });
  }

  updatePollOption(index, option) {
    const { poll } = this.state;

    poll.options[index] = option;

    return this.updatePoll(poll);
  }

  addOption() {
    const { poll } = this.state;

    poll.options.push({
      title: '',
      mediaId: '',
    });

    return this.updatePoll(poll);
  }

  removeOption(index) {
    const { poll } = this.state;

    poll.options.splice(index, 1);

    return this.updatePoll(poll);
  }

  render() {
    const { children } = this.props;

    return <PollContext.Provider value={this.state}>{children}</PollContext.Provider>;
  }
}

PollContextProviderComponent.propTypes = {
  ...WithEditorEventsProps,
  settings: PropTypes.shape({
    siteToken: PropTypes.string,
    isWebView: PropTypes.bool,
    getSiteMembers: PropTypes.func,
  }),
  poll: PropTypes.shape(PollPropTypes),
  setPoll: PropTypes.func,
  children: PropTypes.any,
};

export const PollContextProvider = withEditorEvents(PollContextProviderComponent);
