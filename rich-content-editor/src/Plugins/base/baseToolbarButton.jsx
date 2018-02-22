/* eslint-disable react/no-find-dom-node */
import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { BUTTONS } from './buttons';
import Panel from './basePanel';
import { mergeStyles } from '~/Utils';
import styles from '~/Styles/plugin-toolbar-button.scss';
import { VideoReplaceButton } from './VideoReplaceButton';

class BaseToolbarButton extends React.Component {

  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = { isActive: false };
  }

  componentDidMount() {
    this.props.pubsub.subscribe('componentState', this.onComponentStateChange);
  }

  componentWillUnmount() {
    this.props.pubsub.unsubscribe('componentState', this.onComponentStateChange);
  }

  handleFileChange = event => {
    if (event.target.files && event.target.files.length > 0) {
      const { helpers, handleFileSelection } = this.props;
      if (handleFileSelection && helpers && helpers.handleFileSelection) {
        // const keyName = BUTTONS.EXTERNAL_MODAL;
        // const theme = Styles;

        // helpers.handleFileSelection({ ...this.props, componentState, keyName, helpers, theme, pubsub });
        helpers.handleFileSelection();
      } else {
        const files = Array.from(event.target.files);
        const state = { userSelectedFiles: { files } };
        this.props.pubsub.update('componentState', state);
      }
    }

    this.resetForm();
  };

  setForm = form => (this.form = form);

  resetForm = () => this.form && this.form.reset();

  getBoundingRectForModalButton = isActive => {
    if (this.props.type === BUTTONS.PANEL && isActive) {
      const blockNode = findDOMNode(this);
      return blockNode.getBoundingClientRect();
    } else {
      return null;
    }
  };

  handleClick = event => {
    event.preventDefault();
    const { componentState, keyName, helpers, pubsub, theme, onClick, ...otherProps } = this.props;
    const activeButton = componentState.activeButton || { keyName, isActive: false };
    const isToggleButton = !(this.props.type === BUTTONS.EXTERNAL_MODAL || this.props.type === BUTTONS.FILES);
    const isActive = !isToggleButton ? activeButton.keyName === keyName : !(activeButton.keyName === keyName && activeButton.isActive);
    componentState.activeButton = { ...activeButton, keyName, isActive, boundingRect: this.getBoundingRectForModalButton(isActive) };
    pubsub.set('componentState', componentState);

    if (this.props.type === BUTTONS.EXTERNAL_MODAL && isActive) {
      if (helpers && helpers.openModal) {
        const keyName = BUTTONS.EXTERNAL_MODAL;
        const modalProps = {
          componentState,
          keyName,
          helpers,
          pubsub,
          theme: theme.modal || {},
          ...otherProps,
        };
        helpers.openModal(modalProps);
      } else {
        console.error('Open external helper function is not defined for toolbar button with keyName ' + keyName); //eslint-disable-line no-console
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
    const { iconActive, icon } = this.props;
    const ActiveIcon = iconActive || icon;
    const Icon = icon;
    return (
      <div className={this.styles.icon}>
        {this.state.isActive ? <ActiveIcon /> : <Icon />}
      </div>
    );
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

  renderPanelButton = (buttonWrapperClassNames, buttonClassNames) => {
    return (
      <div>
        <div className={buttonWrapperClassNames} onMouseDown={this.preventBubblingUp}>
          <button className={buttonClassNames} type="button" onMouseDown={this.handleClick} children={this.props.children || [this.getIcon()]}>
            {this.getIcon()}
          </button>
        </div>
        <Panel
          element={this.props.panelElement}
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

  renderFilesButton = (buttonClassNames, styles) => {
    const replaceButtonWrapperClassNames = classNames(styles.replaceButtonWrapper);
    return (
      <div className={replaceButtonWrapperClassNames}>
        <form ref={this.setForm}>
          <input name="file" type="file" onChange={this.handleFileChange} accept="image/*" tabIndex="-1" />
        </form>
        <button className={buttonClassNames} children={this.props.children}>
          {this.getIcon()}
        </button>
      </div>
    );
  };

  renderReplaceVideoButton = styles => {
    // TODO: in theme, change fileButtonWrapper => replaceButtonWrapper
    const replaceButtonWrapperClassNames = classNames(styles.replaceButtonWrapper);
    return <VideoReplaceButton className={replaceButtonWrapperClassNames} icon={this.getIcon()} pubsub={this.props.pubsub} />;
  };

  render = () => {
    const { styles } = this;
    const { isActive } = this.state;
    const buttonWrapperClassNames = classNames(styles.buttonWrapper);
    const buttonClassNames = classNames({
      [styles.button]: true,
      [styles.active]: isActive
    });

    let toolbarButton;
    switch (this.props.type) {
      case BUTTONS.FILES:
        toolbarButton = this.renderFilesButton(buttonClassNames, styles);
        break;
      case BUTTONS.VIDEO_REPLACE:
        toolbarButton = this.renderReplaceVideoButton(styles);
        break;
      case BUTTONS.PANEL:
        toolbarButton = this.renderPanelButton(buttonWrapperClassNames, buttonClassNames);
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
  panelElement: PropTypes.func,
  theme: PropTypes.object.isRequired,
  pubsub: PropTypes.object.isRequired,
  componentData: PropTypes.object.isRequired,
  componentState: PropTypes.object.isRequired,
  helpers: PropTypes.object,
  onClick: PropTypes.func,
  onFileSelected: PropTypes.func,
  children: PropTypes.object,
  iconActive: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.element]),
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.element]),
  modalStyles: PropTypes.object,
  handleFileSelection: PropTypes.bool,
  isMobile: PropTypes.bool,
};

export default BaseToolbarButton;
