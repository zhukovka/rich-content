import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Styles from '~/Styles//global.scss';

export default class BaseModal extends Component {
  constructor(props) {
    super(props);
    this.state = this.stateFromProps(props.componentState);
  }

  stateFromProps = componentState => {
    const { keyName, boundingRect, isActive } = componentState.activeButton || {};
    if (keyName === this.props.keyName && boundingRect && isActive) {
      return {
        style: {
          top: boundingRect.height,
          left: 0,
          transition: 'transform 0.15s cubic-bezier(.3,1.2,.2,1)',
        },
      };
    } else {
      return {
        style: {
          transform: 'translate(-50%) scale(0)',
        },
      };
    }
  };

  componentWillReceiveProps = nextProps => {
    this.setState(this.stateFromProps(nextProps.componentState));
  };

  render = () => {
    const Element = this.props.element;
    const modalClasses = classNames(Styles.modalContainer, this.props.theme.modalContainer);
    return (
      <div className={modalClasses} style={this.state.style}>
        <Element
          store={this.props.store}
          helpers={this.props.helpers}
          componentData={this.props.componentData}
          componentState={this.props.componentState}
        />
      </div>
    );
  };
}

BaseModal.propTypes = {
  element: PropTypes.func.isRequired,
  keyName: PropTypes.string.isRequired,
  theme: PropTypes.object,
  store: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
  componentState: PropTypes.object.isRequired,
  helpers: PropTypes.object,
};
