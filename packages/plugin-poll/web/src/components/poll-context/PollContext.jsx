import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { merge } from 'lodash';

import { SocialPollsService } from '../../api';
import { generateId } from '../../helpers';

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

export class PollContextProvider extends PureComponent {
  state = {
    changePollTitle: this.changePollTitle.bind(this),
    updatePollOption: this.updatePollOption.bind(this),
    addOption: this.addOption.bind(this),
    removeOption: this.removeOption.bind(this),
    changePollImage: this.changePollImage.bind(this),
    vote: this.vote.bind(this),
    unvote: this.unvote.bind(this),
    siteMembers: this.props.settings.siteMembers,
  };

  constructor(props) {
    const { poll } = props;
    super(props);

    poll.options = poll.options.map(option => ({ ...option, localId: generateId() }));
    this.state.poll = poll;
  }

  static getDerivedStateFromProps(props, state) {
    if (props.poll.id !== state.poll.id) {
      return { poll: props.poll };
    }

    return { poll: merge(state.poll, { settings: props.poll.settings }) };
  }

  componentDidMount() {
    const { poll } = this.state;
    const { settings } = this.props;

    this.pollApiClient = new SocialPollsService(settings.siteToken);

    if (poll.id && !settings.isWebView) {
      this.fetchPoll();
    }
  }

  async fetchPoll() {
    const { poll } = this.state;

    const pollResponse = await this.pollApiClient.fetchPoll(poll.id);

    this.setState({ poll: merge(poll, pollResponse) });
  }

  async updatePoll(poll) {
    this.setState({ poll });

    this.pollApiClient.cancelTokens.createPoll?.cancel(SocialPollsService.CANCEL_MESSAGE);
    const pollResponse = await this.pollApiClient.createPoll(poll);

    this.props.setPoll(merge(poll, pollResponse));
  }

  async vote(optionId) {
    const poll = await this.pollApiClient.vote(this.state.poll.id, optionId);

    this.setState({ poll });
  }

  async unvote(optionId) {
    const poll = await this.pollApiClient.unvote(this.state.poll.id, optionId);

    this.setState({ poll });
  }

  findOptionIndex(localId) {
    return this.state.poll.options.findIndex(option => option.localId === localId);
  }

  changePollTitle(title) {
    return this.updatePoll({
      ...this.state.poll,
      title,
    });
  }

  changePollImage(imageUrl) {
    return this.updatePoll({
      ...this.state.poll,
      imageUrl,
    });
  }

  updatePollOption(localId, option) {
    const { poll } = this.state;
    const index = this.findOptionIndex(localId);

    poll.options[index] = option;

    return this.updatePoll({ ...poll });
  }

  addOption() {
    const { poll } = this.state;

    poll.options.push({
      localId: generateId(),
      title: '',
      imageUrl: '',
    });

    return this.setState({ poll: { ...poll } });
  }

  removeOption(localId) {
    const { poll } = this.state;
    const index = this.findOptionIndex(localId);

    poll.options.splice(index, 1);

    return this.updatePoll({ ...poll });
  }

  render() {
    const { children } = this.props;

    return <PollContext.Provider value={this.state}>{children}</PollContext.Provider>;
  }
}

PollContextProvider.propTypes = {
  settings: PropTypes.shape({
    siteToken: PropTypes.string,
    isWebView: PropTypes.bool,
    siteMembers: PropTypes.array,
  }),
  poll: PropTypes.shape(PollPropTypes),
  setPoll: PropTypes.func,
  children: PropTypes.any,
};
