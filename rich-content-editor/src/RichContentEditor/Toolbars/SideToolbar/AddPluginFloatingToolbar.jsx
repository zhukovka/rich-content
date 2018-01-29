import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PlusIcon from '../icons/plus-default.svg';
import PlusActiveIcon from '../icons/plus-active.svg';
import Styles from '~/Styles/side-toolbar.scss';

export default class AddPluginFloatingToolbar extends Component {
  state = {
    style: {
      isActive: false,
      transform: 'translate(-50%) scale(0)',
    },
  };

  onMouseDown = event => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ isActive: !this.state.isActive }, () => {
      this.togglePopup();
    });
  };

  togglePopup = () => {
    const { isMobile } = this.props;
    if (!isMobile) {
      if (this.state.isActive) {
        this.hidePopup();
      } else {
        this.showPopup();
      }
    } else {
      this.props.pubsub.set('addPluginPanelVisible', this.state.isActive);
    }
  };

  showPopup = () => {
    this.setState({
      style: {
        left: this.getPopupOffset(),
        transform: 'translate(-50%) scale(1)',
        transition: 'transform 0.15s cubic-bezier(.3,1.2,.2,1)',
      },
    });
  };

  hidePopup = () => {
    this.setState({
      style: {
        transform: 'translate(-50%) scale(0)',
      },
    });
  };

  getPopupOffset = () => {
    if (!this.popupOffset) {
      if (this.popup) {
        this.popupOffset = this.popup.offsetWidth / 2 + 35;
      }
    }
    return this.popupOffset;
  };

  render() {
    const { theme, getEditorState, setEditorState } = this.props;
    const { buttonStyles, toolbarStyles } = theme || {};
    const wrapperClassNames = classNames(Styles.wrapper, toolbarStyles && toolbarStyles.wrapper);
    const blockTypeClassNames = classNames(Styles.blockType, toolbarStyles && toolbarStyles.blockType);
    const popoupClassNames = classNames(Styles.popup, theme && theme.popup);
    return (
      <div className={wrapperClassNames}>
        <div className={blockTypeClassNames} onMouseDown={this.onMouseDown} ref={el => (this.selectButton = el)}>
          {!this.state.isActive ? <PlusIcon /> : <PlusActiveIcon />}
        </div>
        <div className={popoupClassNames} style={this.state.style} ref={el => (this.popup = el)}>
          {this.props.structure.map((Component, index) => (
            <Component
              key={index}
              getEditorState={getEditorState}
              setEditorState={setEditorState}
              theme={buttonStyles}
              hidePluginSelectPopup={this.hidePopup}
            />
          ))}
        </div>
      </div>
    );
  }
}

AddPluginFloatingToolbar.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  structure: PropTypes.array.isRequired,
  pubsub: PropTypes.object.isRequired,
  theme: PropTypes.object,
  isMobile: PropTypes.bool
};
