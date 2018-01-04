import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Styles from '~/Styles/global.scss';

export default class BaseExternalModal extends Component {

  constructor(props) {
    super(props);
  };


  render = () => {
    const Element = this.props.element;
    const modalClasses = classNames(Styles.modalContainer, this.props.theme && this.props.theme.modalContainer);
    return (
      <div className={modalClasses}>
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

BaseExternalModal.propTypes = {
  element: PropTypes.func.isRequired,
  keyName: PropTypes.string.isRequired,
  theme: PropTypes.object,
  store: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
  componentState: PropTypes.object.isRequired,
  helpers: PropTypes.object,
};
