import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Styles from '~/Styles/global.scss';

export default class BaseExternalModal extends Component {
  render = () => {
    const {
      element: Element,
      helpers,
      componentData,
      componentState,
      store,
      theme
    } = this.props;
    const modalClasses = classNames(Styles.modalContainer, theme && theme.modalContainer);
    return (
      <div className={modalClasses}>
        <Element
          store={store}
          helpers={helpers}
          componentData={componentData}
          componentState={componentState}
        />
      </div>
    );
  };
}

BaseExternalModal.propTypes = {
  element: PropTypes.func.isRequired,
  keyName: PropTypes.string.isRequired,
  store: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
  componentState: PropTypes.object.isRequired,
  theme: PropTypes.object,
  helpers: PropTypes.object,
};
