import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MentionSuggestionsWrapper extends Component {
  state = {
    mentions: [],
  };

  handleSearchChange = ({ value }) => {
    this.props.settings.getMentions(value)
      .then(mentions => this.setState({ mentions }));
  };

  render() {
    const Comp = this.props.component;
    return (
      <Comp
        onSearchChange={this.handleSearchChange}
        suggestions={this.state.mentions}
      />
    );
  }
}

MentionSuggestionsWrapper.propTypes = {
  component: PropTypes.node,
  settings: PropTypes.object,
};

export default MentionSuggestionsWrapper;
