import React, { Component } from 'react';
import PropTypes from 'prop-types';

class HTMLSettings extends Component {
  static propTypes = {
    componentData: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = this.stateFromProps(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.stateFromProps(nextProps));
  }

  stateFromProps = props => {
    const { componentData } = props;
    return {
      width: (componentData && componentData.config && componentData.config.width) || 200,
      height: (componentData && componentData.config && componentData.config.height) || 200,
    };
  };

  changeWidth = event => {
    const width = event.target.valueAsNumber;
    this.setState({ width });
    const componentData = { ...this.props.componentData, config: { ...this.props.componentData.config, width, height: this.state.height } };
    this.props.store.set('componentData', componentData);
  };
  changeHeight = event => {
    const height = event.target.valueAsNumber;
    this.setState({ height });
    const componentData = { ...this.props.componentData, config: { ...this.props.componentData.config, height, width: this.state.width } };
    this.props.store.set('componentData', componentData);
  };

  render = () => {
    return (
      <div>
        <div>
          <label htmlFor="width">Width</label>
          <input type="range" min="10" max="1000" value={this.state.width} id="width" step="10" onChange={this.changeWidth} />
          <output htmlFor="width" id="widthVal">
            {this.state.width}px
          </output>
        </div>
        <div>
          <label htmlFor="height">Height</label>
          <input type="range" min="10" max="1000" value={this.state.height} id="height" step="10" onChange={this.changeHeight} />
          <output htmlFor="height" id="widthVal">
            {this.state.height}px
          </output>
        </div>
      </div>
    );
  };
}

export default HTMLSettings;
