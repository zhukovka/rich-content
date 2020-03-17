import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { PollApiClient } from '../../api';

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
    poll: this.props.poll,
    changePollTitle: this.changePollTitle.bind(this),
    updatePollOption: this.updatePollOption.bind(this),
    addOption: this.addOption.bind(this),
    removeOption: this.removeOption.bind(this),
    changePollImage: this.changePollImage.bind(this),
    vote: this.vote.bind(this),
    unvote: this.unvote.bind(this),
  };

  componentDidMount() {
    const { poll } = this.state;

    this.pollApiClient = new PollApiClient(this.props.siteToken);

    if (poll.id) {
      this.fetchPoll();
    }
  }

  componentWillReceiveProps(props) {
    if (this.props.poll.id !== props.poll.id) {
      this.setState({ poll: props.poll });
    }
  }

  async fetchPoll() {
    const { poll } = this.state;

    const pollResponse = await this.pollApiClient.fetchPoll(poll.id);

    this.setState({ poll: pollResponse });
  }

  async updatePoll(poll) {
    const pollResponse = await this.pollApiClient.createPoll(poll);
    this.props.setPoll(pollResponse);
  }

  async vote(optionId) {
    const poll = await this.pollApiClient.vote(this.state.poll.id, optionId);

    this.setState({ poll });
  }

  async unvote(optionId) {
    const poll = await this.pollApiClient.unvote(this.state.poll.id, optionId);

    this.setState({ poll });
  }

  changePollTitle(title) {
    this.updatePoll({
      ...this.props.poll,
      title,
    });
  }

  changePollImage(imageUrl) {
    this.updatePoll({
      ...this.props.poll,
      imageUrl,
    });
  }

  updatePollOption(index, option) {
    const { poll } = this.props;

    poll.options[index] = option;

    this.updatePoll({ ...poll });
  }

  addOption() {
    const { poll } = this.props;

    poll.options.push({
      title: '',
      imageUrl: '',
    });

    this.updatePoll({ ...poll });
  }

  removeOption(index) {
    const { poll } = this.props;

    poll.options.splice(index, 1);

    this.updatePoll({ ...poll });
  }

  render() {
    const { children } = this.props;

    return <PollContext.Provider value={this.state}>{children}</PollContext.Provider>;
  }
}

PollContextProvider.propTypes = {
  siteToken: PropTypes.string,
  poll: PropTypes.shape(PollPropTypes),
  setPoll: PropTypes.func,
  children: PropTypes.any,
};
