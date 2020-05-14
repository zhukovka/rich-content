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
    fetchPoll: this.fetchPoll.bind(this),
    vote: this.vote.bind(this),
    unvote: this.unvote.bind(this),
    getVoters: this.getVoters.bind(this),
    poll: this.props.poll,
  };

  static _getDerivedStateFromProps(props, state) {
    if (props.poll.id !== state.poll.id) {
      return { poll: props.poll };
    }

    return {
      poll: merge(state.poll, { settings: props.poll.settings }),
    };
  }

  constructor(props) {
    super(props);
    this.pollApiClient = new SocialPollsService(props.settings.siteToken);
  }

  componentWillReceiveProps(props) {
    if (props.settings.siteToken !== this.props.settings.siteToken) {
      this.pollApiClient = new SocialPollsService(props.settings.siteToken);
      this.fetchPoll();
    }

    if (props.poll.id !== this.state.poll.id) {
      this.setState({ poll: props.poll });
    }

    this.setState({
      poll: merge(this.state.poll, { settings: props.poll.settings }),
    });
  }

  componentDidMount() {
    const { editorEvents } = this.props;

    editorEvents.subscribe(EditorEvents.PUBLISH, this.syncPoll);
  }

  componentWillUnmount() {
    this.props.editorEvents.unsubscribe(EditorEvents.PUBLISH, this.syncPoll);
  }

  async fetchPoll() {
    if (!this.state.poll.id) {
      return;
    }

    const poll = await this.pollApiClient.fetchPoll(this.state.poll.id);

    this.setState({ poll });
  }

  populateWithData(poll) {
    const { t } = this.props;
    poll.title = poll.title || t('Poll_Editor_Question_Placeholder');

    poll.options = poll.options.map(option => ({
      ...option,
      title: option.title || t('Poll_Editor_Answer_Placeholder'),
    }));

    return poll;
  }

  syncPoll = async () => {
    let dto;
    const poll = this.populateWithData(this.state.poll);

    if (poll.id) {
      dto = await this.pollApiClient.updatePoll(poll);
    } else {
      dto = await this.pollApiClient.createPoll(poll);
    }

    this.props.setPoll(dto);
  };

  updatePoll(poll) {
    this.setState(state => ({
      poll: Object.assign({}, state.poll, poll),
    }));
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
