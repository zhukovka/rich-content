import React from 'react';

import { RCEHelpersPropTypes } from '../rce-helpers-context';

import { LAYOUT } from '../../constants';

import { OptionPropTypes } from './types';

export class PollOptionBase extends React.PureComponent {
  static propTypes = {
    ...OptionPropTypes,
    ...RCEHelpersPropTypes,
  };

  state = {
    loading: false,
  };

  isUserChoice() {
    const { poll, option } = this.props;

    return !!poll.ownVotes.includes(option.id);
  }

  isViewMode() {
    return this.props.rce.isViewMode;
  }

  isGridLayout() {
    return this.props.layout.poll?.type === LAYOUT.GRID;
  }

  isListLayout() {
    return this.props.layout.poll?.type === LAYOUT.LIST;
  }

  isImageEnabled() {
    return this.props.layout.option?.enableImage;
  }

  handleRemove = e => {
    e.stopPropagation();

    this.props.remove();
  };

  handleVoteClick = async () => {
    this.setState({ loading: true });

    try {
      if (this.isUserChoice()) {
        await this.props.unvote(this.props.option.id);
      } else {
        await this.props.vote(this.props.option.id);
      }
    } catch (error) {
    } finally {
      this.setState({ loading: false });
    }
  };

  handleTitleChange = title => {
    const { update, option } = this.props;

    return update({ ...option, title });
  };

  handleImageChange = mediaId => {
    const { update, option } = this.props;

    return update({ ...option, mediaId });
  };

  getVotePercentage() {
    const { option, poll, showResults } = this.props;

    if (!showResults) {
      return 0;
    }

    return (option.count / poll.count) * 100 || 0;
  }

  render() {
    if (this.isViewMode()) {
      return this.renderViewMode();
    }

    return this.renderEditMode();
  }
}
