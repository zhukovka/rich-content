import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Tooltip from '~/Components/Tooltip';
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

  componentDidMount() {
    setTimeout(() => {
      window.addEventListener('click', this.onWindowClick);
    });
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onWindowClick);
  }

  onWindowClick = () => {
    if (this.state.isActive) {
      this.setState({ isActive: false });
      this.hidePopup();
    }
  }

  onMouseDown = event => {
    event.preventDefault();
    event.stopPropagation();
    const { isMobile, pubsub } = this.props;
    if (!isMobile) {
      this.togglePopup();
      this.setState({ isActive: !this.state.isActive });
    } else {
      pubsub.get('openAddPluginModal')();
    }
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
        this.popupOffset = this.popup.offsetWidth / 2 + 28;
      }
    }
    return this.popupOffset;
  };

  render() {
    const { theme, getEditorState, setEditorState } = this.props;
    const { buttonStyles, toolbarStyles } = theme || {};
    const floatingContainerClassNames = classNames(Styles.floatingContainer, toolbarStyles && toolbarStyles.floatingContainer);
    const floatingIconClassNames = classNames(Styles.floatingIcon, toolbarStyles && toolbarStyles.floatingIcon);
    const popoupClassNames = classNames(Styles.toolbar, toolbarStyles && toolbarStyles.toolbar);
    return (
      <div className={floatingContainerClassNames}>
        <Tooltip
          content={'Insert Media'}
          moveBy={{ x: 7, y: -7 }}
          theme={theme}
        >
          <div className={floatingIconClassNames} onMouseDown={this.onMouseDown} ref={el => (this.selectButton = el)}>
            {!this.state.isActive ? <PlusIcon /> : <PlusActiveIcon />}
          </div>
        </Tooltip>
        <div className={popoupClassNames} style={this.state.style} ref={el => (this.popup = el)}>
          {this.props.structure.map((Component, index) => (
            <Component
              key={index}
              getEditorState={getEditorState}
              setEditorState={setEditorState}
              theme={buttonStyles}
              hidePopup={this.hidePopup}
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
  theme: PropTypes.object.isRequired,
  isMobile: PropTypes.bool
};
