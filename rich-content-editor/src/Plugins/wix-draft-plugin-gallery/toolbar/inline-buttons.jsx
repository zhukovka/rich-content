import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '../icons/toolbar/icon-add.svg';
import ManageMediaIcon from '../icons/insert-plugin.svg';
import AdvancedSettingsIcon from '../../base/icons/block-settings.svg';
import GridSmallIcon from '../icons/toolbar/layout/icon-grid-small.svg';
import GridSmallIconActive from '../icons/toolbar/layout/icon-grid-small-active.svg';
import GridMediumIcon from '../icons/toolbar/layout/icon-grid-medium.svg';
import GridMediumIconActive from '../icons/toolbar/layout/icon-grid-medium-active.svg';
import GridLargeIcon from '../icons/toolbar/layout/icon-grid-large.svg';
import GridLargeIconActive from '../icons/toolbar/layout/icon-grid-large-active.svg';
import GallerySettingsModal from '../components/gallery-settings-modal';
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
      layout: (props.componentData.config && props.componentData.config.layout) || 'small',
    };
  };

  changeLayout = layout => {
    const componentData = { ...this.props.componentData, config: { ...this.props.componentData.config, layout } };
    this.props.store.set('componentData', componentData);
  };

  render = () => {
    return (
      <div>
        <div onClick={() => this.changeLayout('small')}>{this.state.layout === 'small' ? <GridSmallIconActive /> : <GridSmallIcon />}</div>
        <div onClick={() => this.changeLayout('medium')}>{this.state.layout === 'medium' ? <GridMediumIconActive /> : <GridMediumIcon />}</div>
        <div onClick={() => this.changeLayout('large')}>{this.state.layout === 'large' ? <GridLargeIconActive /> : <GridLargeIcon />}</div>
      </div>
    );
  };
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
      spacing: (props.componentData.config && props.componentData.config.spacing) || 0,
    };
  };

  changeSpacing = event => {
    const spacing = event.target.valueAsNumber;
    const componentData = { ...this.props.componentData, config: { ...this.props.componentData.config, spacing } };
    this.props.store.set('componentData', componentData);
  };

  render = () => {
    return (
      <div>
        <label htmlFor="spacing">Spacing</label>
        <input type="range" min="0" max="100" value={this.state.spacing} id="spacing" step="1" onChange={this.changeSpacing} />
        <output htmlFor="spacing" id="spacingVal">
          {this.state.spacing}px
        </output>
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
  {
    keyName: 'add',
    type: BUTTONS.FILES,
    icon: AddIcon,
    onClick: pubsub => console.log('*** click add *** '), //eslint-disable-line no-console, no-unused-vars,
    onFilesSelected: (pubsub, files) => console.log('*** got files *** ', files), //eslint-disable-line no-console, no-unused-vars,
  },
  { type: BUTTONS.SEPARATOR },
  { type: BUTTONS.SIZE_SMALL_LEFT },
  { type: BUTTONS.SIZE_SMALL_CENTER },
  { type: BUTTONS.SIZE_SMALL_RIGHT },
  { type: BUTTONS.SIZE_CONTENT },
  { type: BUTTONS.SIZE_FULL_WIDTH },
  { type: BUTTONS.SEPARATOR },
  {
    keyName: 'manage_media',
    type: BUTTONS.EXTERNAL_MODAL,
    icon: ManageMediaIcon,
    modalElement: GallerySettingsModal,
    activeTab: 'manage_media',
    modalStyles,
  },
  {
    keyName: 'advanced_settings',
    type: BUTTONS.EXTERNAL_MODAL,
    icon: AdvancedSettingsIcon,
    modalElement: GallerySettingsModal,
    activeTab: 'advanced_settings',
    modalStyles,
  },
  { type: BUTTONS.DELETE },
];

export default InlineButtons;
