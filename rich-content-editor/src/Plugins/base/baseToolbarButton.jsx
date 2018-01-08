/* eslint-disable react/no-find-dom-node */
import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { BUTTONS } from './buttons';
import Modal from './baseModal';
import Styles from '~/Styles/plugin-toolbar-button.scss';

class BaseToolbarButton extends React.Component {
  state = { isActive: false };

  componentDidMount() {
    this.props.pubsub.subscribe('componentState', this.onComponentStateChange);
  }

  componentWillUnmount() {
    this.props.pubsub.unsubscribe('componentState', this.onComponentStateChange);
  }

  handleFileChange = event => {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files);
      const state = { userSelectedFiles: { files } };
      this.props.pubsub.update('componentState', state);
    }

    this.resetForm();
  };

  setForm = form => (this.form = form);

  resetForm = () => this.form && this.form.reset();

  getBoundingRectForModalButton = isActive => {
    if (this.props.type === BUTTONS.MODAL && isActive) {
      const blockNode = findDOMNode(this);
      return blockNode.getBoundingClientRect();
    } else {
      return null;
    }
  };

  handleClick = event => {
    event.preventDefault();
    const { componentState, keyName, pubsub, onClick } = this.props;
    const activeButton = componentState.activeButton || { keyName, isActive: false };
    const isToggleButton = !(this.props.type === BUTTONS.EXTERNAL_MODAL || this.props.type === BUTTONS.FILES);
    const isActive = !isToggleButton ? activeButton.keyName === keyName : !(activeButton.keyName === keyName && activeButton.isActive);
    componentState.activeButton = { ...activeButton, keyName, isActive, boundingRect: this.getBoundingRectForModalButton(isActive) };
    pubsub.set('componentState', componentState);

    if (this.props.type === BUTTONS.EXTERNAL_MODAL && isActive) {
      const helpers = this.props.helpers;
      if (helpers && helpers.openExternalModal) {
        //console.log('Opening external modal');
        const modalElement = this.props.modalElement;
        const componentData = this.props.componentData;
        const store = pubsub.store;
        const keyName = BUTTONS.EXTERNAL_MODAL;
        const theme = Styles;

        helpers.openExternalModal({ modalElement, componentData, componentState, store, keyName, helpers, theme });
      } else {
        //console.warn('Open external helper function is not defined for toolbar button with keyName ' + keyName);
      }
    }
    onClick && onClick(pubsub);
  };

  onComponentStateChange = componentState => {
    if (componentState.activeButton) {
      const activeButton = componentState.activeButton;
      const isActive = activeButton.keyName === this.props.keyName && activeButton.isActive;
      this.setState({ isActive });
    } else if (this.state.isActive) {
      this.setState({ isActive: false });
    }
  };

  getIcon = () => {
    const ActiveIcon = this.props.iconActive || this.props.icon;
    const Icon = this.props.icon;
    return this.state.isActive ? <ActiveIcon /> : <Icon />;
  };

  renderToggleButton = (buttonWrapperClassNames, buttonClassNames) => {
    return (
      <div className={buttonWrapperClassNames} onMouseDown={this.preventBubblingUp}>
        <button className={buttonClassNames} type="button" onMouseDown={this.handleClick} children={this.props.children || [this.getIcon()]}>
          {this.getIcon()}
        </button>
      </div>
    );
  };

  renderModalButton = (buttonWrapperClassNames, buttonClassNames) => {
    return (
      <div>
        <div className={buttonWrapperClassNames} onMouseDown={this.preventBubblingUp}>
          <button className={buttonClassNames} type="button" onMouseDown={this.handleClick} children={this.props.children || [this.getIcon()]}>
            {this.getIcon()}
          </button>
        </div>
        <Modal
          element={this.props.modalElement}
          theme={this.props.theme}
          keyName={this.props.keyName}
          store={this.props.pubsub.store}
          componentData={this.props.componentData}
          componentState={this.props.componentState}
          helpers={this.props.helpers}
        />
      </div>
    );
  };

  renderFilesButton = () => {
    const fileButtonWrapperClassNames = classNames(Styles.fileButtonWrapper, this.props.theme.fileButtonWrapper);
    return (
      <div className={fileButtonWrapperClassNames}>
        <button type="button" children={this.props.children}>
          {this.getIcon()}
        </button>
        <form ref={this.setForm}>
          <input name="file" type="file" onChange={this.handleFileChange} accept="image/*" tabIndex="-1" />
        </form>
      </div>
    );
  };

  render = () => {
    const { theme } = this.props;
    const { isActive } = this.state;
    const buttonWrapperClassNames = classNames(Styles.buttonWrapper, theme.buttonWrapper);
    const buttonClassNames = classNames({
      [Styles.button]: true,
      [theme.button]: true,
      [Styles.active]: isActive,
      [theme.active]: isActive,
    });

    let toolbarButton;
    switch (this.props.type) {
      case BUTTONS.FILES:
        toolbarButton = this.renderFilesButton();
        break;
      case BUTTONS.MODAL:
        toolbarButton = this.renderModalButton(buttonWrapperClassNames, buttonClassNames);
        break;
      default:
        toolbarButton = this.renderToggleButton(buttonWrapperClassNames, buttonClassNames);
        break;
    }
    return toolbarButton;
  };
}

BaseToolbarButton.propTypes = {
  type: PropTypes.string,
  keyName: PropTypes.string.isRequired,
  modalElement: PropTypes.func,
  theme: PropTypes.object,
  pubsub: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
  componentState: PropTypes.object.isRequired,
  helpers: PropTypes.object,
  onClick: PropTypes.func,
  onFileSelected: PropTypes.func,
  children: PropTypes.object,
  iconActive: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.element]),
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.element]),
};

export default BaseToolbarButton;
