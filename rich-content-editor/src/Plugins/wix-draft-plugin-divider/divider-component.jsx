import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Styles from './default-divider-styles.scss';

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

  render() {
    const { style, theme } = this.props;

    const appliedStyles = theme || Styles;

    return (
      <div
        style={{ width: this.state.width + '%', margin: 'auto', ...style }}
        onClick={this.props.onClick}
        className={classnames(this.props.className, appliedStyles[this.state.type])}
      />
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
