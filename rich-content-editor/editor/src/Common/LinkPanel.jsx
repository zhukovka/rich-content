import React, { Component } from 'react';

class LinkPanel extends Component {

  constructor(props) {
    super(props);
    const { url, targetBlank } = props;
    this.state = {
      url: url || '',
      targetBlank: targetBlank|| false
    };
  }

  handleURLChange = event => {
    this.setState({ url: event.target.value });
  }

  handleTargetChange = event => {
    this.setState({ targetBlank: event.target.checked });
  }

  onDoneClick = () => {
    const { url, targetBlank } = this.state;
    this.props.onDone && this.props.onDone({ url, targetBlank });
  }

  onCancelClick = () => {
    this.props.onCancel && this.props.onCancel();
  }

  render() {
    return (
      <div>
        <input type="text" onChange={this.handleURLChange} value={this.state.url} />
        <input type="checkbox" onChange={this.handleTargetChange} defaultChecked={this.state.targetBlank} />
        <button onClick={this.onDoneClick}>Done</button>
        <button onClick={this.onCancelClick}>Cancel</button>
      </div>
    );
  }
}

export default LinkPanel;
