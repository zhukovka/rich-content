import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlusIcon from '../icons/plus-default.svg';
import PlusActiveIcon from '../icons/plus-active.svg';

export default class AddPluginBlockSelect extends Component {
  state = {
    style: {
      isActive: false,
      transform: 'translate(-50%) scale(0)',
    },
  };

  onMouseDown = event => {
    event.preventDefault();
    event.stopPropagation();
    this.togglePopup();
  };

  togglePopup = () => {
    if (this.state.isActive) {
      this.hidePopup();
    } else {
      this.showPopup();
    }
  };

  showPopup = () => {
    this.setState({
      isActive: true,
      style: {
        left: this.getPopupOffset(),
        transform: 'translate(-50%) scale(1)',
        transition: 'transform 0.15s cubic-bezier(.3,1.2,.2,1)',
      },
    });
  };

  hidePopup = () => {
    this.setState({
      isActive: false,
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
    return (
      <div className={theme.addPluginBlockSelectStyles.addBlockWrapper}>
        <div className={theme.addPluginBlockSelectStyles.blockType} onMouseDown={this.onMouseDown} ref={el => (this.selectButton = el)}>
          {!this.state.isActive ? <PlusIcon /> : <PlusActiveIcon />}
        </div>
        <div className={theme.addPluginBlockSelectStyles.popup} style={this.state.style} ref={el => (this.popup = el)}>
          {this.props.structure.map((Component, index) => (
            <Component
              key={index}
              getEditorState={getEditorState}
              setEditorState={setEditorState}
              theme={theme.buttonStyles}
              hidePluginSelectPopup={this.hidePopup}
            />
          ))}
        </div>
      </div>
    );
  }
}

AddPluginBlockSelect.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  structure: PropTypes.array.isRequired,
  theme: PropTypes.object,
};
