import React from 'react';
import PropTypes from 'prop-types';
import Divider1 from './dividers/divider1.svg';
import Divider2 from './dividers/divider2.svg';
import Divider3 from './dividers/divider3.svg';
import Divider4 from './dividers/divider4.svg';

const DEFAULTS = {
  type: 'divider3',
  width: 50,
  config: {
    size: 'fullWidth',
  },
};

class DividerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.stateFromProps(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.stateFromProps(nextProps));
  }

  stateFromProps = props => {
    const type = props.componentData.type || DEFAULTS.type;
    const width = props.componentData.width || DEFAULTS.width;
    return {
      type,
      width,
    };
  };

  getComponent = type => {
    let component = null;
    switch (type) {
      case 'divider1':
        component = Divider1;
        break;
      case 'divider2':
        component = Divider2;
        break;
      case 'divider3':
        component = Divider3;
        break;
      default:
        component = Divider4;
        break;
    }
    return component;
  };

  render() {
    const { style } = this.props;
    const Divider = this.getComponent(this.state.type);
    return (
      <div style={{ width: this.state.width + '%', margin: 'auto', ...style }} onClick={this.props.onClick} className={this.props.className}>
        <Divider style={{ pointerEvents: 'none' }} width="100%" viewBox="0 0 500 46" preserveAspectRatio="none" />
      </div>
    );
  }
}

DividerComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  componentState: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  blockProps: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  style: PropTypes.string,
  onClick: PropTypes.func,
};

export { DividerComponent as Component, DEFAULTS };
