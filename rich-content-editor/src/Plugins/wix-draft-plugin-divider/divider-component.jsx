import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { mergeStyles } from '~/Utils';
import styles from './default-divider-styles.scss';

const DEFAULTS = {
  type: 'divider3',
  width: 100,
  config: {
    size: 'content',
    alignment: 'center',
  },
};

class DividerComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
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
    const { className, style } = this.props;

    return (
      <div
        style={{ width: this.state.width + '%', margin: 'auto', ...style }}
        data-hook="divider" onClick={this.props.onClick}
        className={classnames(className, this.styles[this.state.type])}
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
