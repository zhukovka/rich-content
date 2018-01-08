import React from 'react';
import PropTypes from 'prop-types';
import SettingsIcon from '../../base/icons/block-settings.svg';
import EditIcon from '../icons/icon-edit.svg';
import { BUTTONS } from '~/Plugins/base/buttons';
import Styles from '../default-html-styles.scss';

class SettingsModal extends React.Component {
  static propTypes = {
    componentData: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = this.stateFromProps(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.stateFromProps(nextProps));
  }

  stateFromProps = props => {
    const { componentData } = props;
    return {
      width: (componentData && componentData.config && componentData.config.width) || 200,
      height: (componentData && componentData.config && componentData.config.height) || 200,
    };
  };

  changeWidth = event => {
    const width = event.target.valueAsNumber;
    const componentData = { ...this.props.componentData, config: { ...this.props.componentData.config, width } };
    this.props.store.set('componentData', componentData);
  };
  changeHeight = event => {
    const height = event.target.valueAsNumber;
    const componentData = { ...this.props.componentData, config: { ...this.props.componentData.config, height } };
    this.props.store.set('componentData', componentData);
  };

  render = () => {
    return (
      <div>
        <div>
          <label htmlFor="width">Width</label>
          <input type="range" min="10" max="1000" value={this.state.width} id="width" step="10" onChange={this.changeWidth} />
          <output htmlFor="width" id="widthVal">
            {this.state.width}px
          </output>
        </div>
        <div>
          <label htmlFor="height">Height</label>
          <input type="range" min="10" max="1000" value={this.state.height} id="height" step="10" onChange={this.changeHeight} />
          <output htmlFor="height" id="widthVal">
            {this.state.height}px
          </output>
        </div>
      </div>
    );
  };
}

class ExternalSettingsModal extends React.Component {
  static propTypes = {
    componentData: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = this.stateFromProps(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.stateFromProps(nextProps));
  }

  stateFromProps = props => {
    const { componentData } = props;
    return {
      width: (componentData && componentData.config && componentData.config.width) || 200,
      height: (componentData && componentData.config && componentData.config.height) || 200,
    };
  };

  changeWidth = event => {
    const width = event.target.valueAsNumber;
    this.setState({ width });
    const componentData = { ...this.props.componentData, config: { ...this.props.componentData.config, width, height: this.state.height } };
    this.props.store.set('componentData', componentData);
  };
  changeHeight = event => {
    const height = event.target.valueAsNumber;
    this.setState({ height });
    const componentData = { ...this.props.componentData, config: { ...this.props.componentData.config, height, width: this.state.width } };
    this.props.store.set('componentData', componentData);
  };

  render = () => {
    return (
      <div>
        <div>
          <label htmlFor="width">Width</label>
          <input type="range" min="10" max="1000" value={this.state.width} id="width" step="10" onChange={this.changeWidth} />
          <output htmlFor="width" id="widthVal">
            {this.state.width}px
          </output>
        </div>
        <div>
          <label htmlFor="height">Height</label>
          <input type="range" min="10" max="1000" value={this.state.height} id="height" step="10" onChange={this.changeHeight} />
          <output htmlFor="height" id="widthVal">
            {this.state.height}px
          </output>
        </div>
      </div>
    );
  };
}

class EditModal extends React.Component {
  static propTypes = {
    componentData: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = this.stateFromProps(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.stateFromProps(nextProps));
  }

  stateFromProps = props => {
    return {
      isSrc: !!(props.componentData && props.componentData.config && props.componentData.config.isSrc),
      src: (props.componentData && props.componentData.src) || '',
      content: (props.componentData && props.componentData.content) || '',
    };
  };

  changeIsSrc = event => {
    const isSrc = event.target.value !== 'false';
    this.setState({ isSrc });
  };

  changeIsContent = event => {
    const isSrc = !(event.target.value !== 'false');
    this.setState({ isSrc });
  };

  changeContent = event => {
    const content = event.target.value;
    this.setState({ content });
  };

  changeSrc = event => {
    const src = event.target.value;
    this.setState({ src });
  };

  updateContent = () => {
    const componentData = { ...this.props.componentData };
    componentData.src = this.state.src;
    componentData.content = this.state.content;
    componentData.config.isSrc = this.state.isSrc;

    this.props.store.set('componentData', componentData);
  };

  render = () => {
    return (
      <div>
        <div className={Styles.tabs}>
          <div className={Styles.tab}>
            <input type="radio" id="tab-1" name="tab-group-1" checked={this.state.isSrc} onChange={this.changeIsSrc} />
            <label htmlFor="tab-1">Source</label>

            <div className={Styles.content}>
              <input type="text" value={this.state.src} id="src" onChange={this.changeSrc} />
            </div>
          </div>

          <div className={Styles.tab}>
            <input type="radio" id="tab-2" name="tab-group-1" checked={!this.state.isSrc} onChange={this.changeIsContent} />
            <label htmlFor="tab-2">Code</label>

            <div className={Styles.content}>
              <textarea value={this.state.content} id="content" onChange={this.changeContent} />
            </div>
          </div>
        </div>
        <div>
          <input type="button" onClick={this.updateContent} value="Update" />
        </div>
      </div>
    );
  };
}

EditModal.propTypes = {
  store: PropTypes.object.isRequired,
  helpers: PropTypes.object,
  componentData: PropTypes.object.isRequired,
  componentState: PropTypes.object.isRequired,
};

const InlineButtons = [
  //the icons in the toolbar are the following:
  // Edit - open a small dialog that has an option to add src for the iframe or code
  {
    keyName: 'edit',
    type: BUTTONS.MODAL,
    modalElement: EditModal,
    icon: EditIcon,
    onClick: pubsub => console.log('*** click edit *** '), //eslint-disable-line no-console, no-unused-vars,
  },
  { type: BUTTONS.SEPARATOR },
  {
    keyName: 'settings',
    type: BUTTONS.MODAL,
    modalElement: SettingsModal,
    icon: SettingsIcon,
    onClick: pubsub => console.log('*** click settings *** '), //eslint-disable-line no-console, no-unused-vars,
  },
  {
    keyName: 'external_settings',
    type: BUTTONS.EXTERNAL_MODAL,
    modalElement: ExternalSettingsModal,
    icon: SettingsIcon,
    onClick: pubsub => console.log('*** click external settings *** '), //eslint-disable-line no-console, no-unused-vars,
  },
  { type: BUTTONS.DELETE },
];

export default InlineButtons;
