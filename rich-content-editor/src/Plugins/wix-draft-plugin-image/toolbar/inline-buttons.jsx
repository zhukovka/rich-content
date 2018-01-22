import React from 'react';
import PropTypes from 'prop-types';
import MediaReplaceIcon from '../icons/toolbar/media-replace.svg';
import SettingsIcon from '../../base/icons/block-settings.svg';
import ClassicLayoutIcon from '../icons/toolbar/layout/icon-classic-layout.svg';
import ClassicLayoutIconActive from '../icons/toolbar/layout/icon-classic-layout-active.svg';
import TextOnImageIcon from '../icons/toolbar/layout/icon-text-on-image-layout.svg';
import TextOnImageIconActive from '../icons/toolbar/layout/icon-text-on-image-layout-active.svg';
import ImageSettings from './image-settings';
import { BUTTONS } from '~/Plugins/base/buttons';

class LayoutModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.stateFromProps(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.stateFromProps(nextProps));
  }

  stateFromProps = props => {
    return {
      layout: (props.componentData.config && props.componentData.config.layout) || 'classic',
    };
  };

  changeLayout = layout => {
    const componentData = { ...this.props.componentData, config: { ...this.props.componentData.config, layout } };
    this.props.store.set('componentData', componentData);
  };

  render() {
    return (
      <div>
        <div onClick={() => this.changeLayout('classic')}>
          {this.state.layout === 'classic' ? <ClassicLayoutIconActive /> : <ClassicLayoutIcon />}
        </div>
        <div onClick={() => this.changeLayout('textOnImage')}>
          {this.state.layout === 'textOnImage' ? <TextOnImageIconActive /> : <TextOnImageIcon />}
        </div>
      </div>
    );
  }
}

LayoutModal.propTypes = {
  store: PropTypes.object.isRequired,
  helpers: PropTypes.object,
  componentData: PropTypes.object.isRequired,
  componentState: PropTypes.object.isRequired,
};

class SettingsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.stateFromProps(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.stateFromProps(nextProps));
  }

  stateFromProps = props => {
    return {
      showTitle: !!(props.componentData.config && props.componentData.config.showTitle),
      showDescription: !!(props.componentData.config && props.componentData.config.showDescription),
    };
  };

  changeConfig = (key, value) => {
    const componentData = { ...this.props.componentData, config: { ...this.props.componentData.config, [key]: value } };
    this.props.store.set('componentData', componentData);
  };

  render = () => {
    return (
      <div>
        <div>
          <label htmlFor="showTitle">Display title</label>
          <input
            type="checkbox"
            checked={this.state.showTitle}
            id="showTitle"
            onChange={event => this.changeConfig('showTitle', event.target.checked)}
          />
          <output htmlFor="showTitle" id="showTitleVal">
            {this.state.showTitle}
          </output>
        </div>
        <div>
          <label htmlFor="showDescription">Display description</label>
          <input
            type="checkbox"
            checked={this.state.showDescription}
            id="showDescription"
            onChange={event => this.changeConfig('showDescription', event.target.checked)}
          />
          <output htmlFor="showDescription" id="showDescriptionVal">
            {this.state.showDescription}
          </output>
        </div>
      </div>
    );
  };
}

SettingsModal.propTypes = {
  store: PropTypes.object.isRequired,
  helpers: PropTypes.object,
  componentData: PropTypes.object.isRequired,
  componentState: PropTypes.object.isRequired,
};

const modalStyles = {
  overlay: {
    top: 0,
    left: 0,
    position: 'absolute',
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 100,
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 'auto',
    right: 0,
    bottom: 0,
    border: 'none',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: 0,
    outline: 'none',
    padding: 0,
    height: '100vh',
    width: '522px',
  },
};

const InlineButtons = [
  { type: BUTTONS.SIZE_ORIGINAL_CENTER },
  { type: BUTTONS.SIZE_SMALL_LEFT },
  { type: BUTTONS.SIZE_SMALL_CENTER },
  { type: BUTTONS.SIZE_SMALL_RIGHT },
  { type: BUTTONS.SIZE_CONTENT },
  { type: BUTTONS.SIZE_FULL_WIDTH },
  { type: BUTTONS.SEPARATOR },
  // {
  //   keyName: 'settings',
  //   type: BUTTONS.PANEL,
  //   panelElement: SettingsModal,
  //   icon: SettingsIcon,
  //   onClick: pubsub => console.log('*** click settings *** '), //eslint-disable-line no-console, no-unused-vars,
  // },
  {
    keyName: 'advanced_settings',
    type: BUTTONS.EXTERNAL_MODAL,
    icon: SettingsIcon,
    panelElement: ImageSettings,
    activeTab: 'advanced_settings',
    modalStyles,
  },
  {
    keyName: 'replace',
    type: BUTTONS.FILES,
    icon: MediaReplaceIcon,
  },
  { type: BUTTONS.DELETE },
];

export default InlineButtons;
