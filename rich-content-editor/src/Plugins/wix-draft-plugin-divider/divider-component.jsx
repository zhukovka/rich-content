import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Styles from './default-divider-styles.scss';
import Themable from '~/Components/Themable';

const DEFAULTS = {
  type: 'divider3',
  width: 100,
  config: {
    size: 'content',
    alignment: 'center',
  },
};

class DividerComponent extends Themable {
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

  getDefaultStyles() {
    return Styles;
  }

  getTheme() {
    return this.props.theme;
  }

  renderDesktop(styles) {
    const { style } = this.props;

    return (
      <div
        style={{ width: this.state.width + '%', margin: 'auto', ...style }}
        onClick={this.props.onClick}
        className={classnames(this.props.className, styles[this.state.type])}
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
