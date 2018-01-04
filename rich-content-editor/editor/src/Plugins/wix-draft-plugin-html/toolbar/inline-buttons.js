import React from 'react'
import PropTypes from 'prop-types';
import SettingsIcon from '../../base/icons/block-settings.svg'
import EditIcon from '../icons/icon-edit.svg'
import { BUTTONS } from '~/Plugins/base/buttons'
import Styles from '../default-html-styles.scss'

class SettingsModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.stateFromProps(props);
  };

  componentWillReceiveProps(nextProps) {
    this.setState(this.stateFromProps(nextProps));
  }

  stateFromProps = (props) => {
    return {
      width: (props.componentData && props.componentData.config && props.componentData.config.width) || 200,
      height: (props.componentData && props.componentData.config && props.componentData.config.height) || 200,
    };
  };

  changeWidth = (event) => {
    console.log('changeWidth in modal', event.target.valueAsNumber);
    const width = event.target.valueAsNumber;
    const componentData = {...this.props.componentData, config: {...this.props.componentData.config, width}};
    this.props.store.set('componentData', componentData);
  };
  changeHeight = (event) => {
    console.log('changeHeight in modal', event.target.valueAsNumber);
    const height = event.target.valueAsNumber;
    const componentData = {...this.props.componentData, config: {...this.props.componentData.config, height}};
    this.props.store.set('componentData', componentData);
  };

  render = () => {
    return (
      <div>
        <div>
          <label htmlFor="width">Width</label>
          <input type="range" min="10" max="1000" value={this.state.width} id="width"
                 step="10" onChange={this.changeWidth}/>
          <output htmlFor="width" id="widthVal">{this.state.width}px</output>
        </div>
        <div>
          <label htmlFor="height">Height</label>
          <input type="range" min="10" max="1000" value={this.state.height} id="height"
                 step="10" onChange={this.changeHeight}/>
          <output htmlFor="height" id="widthVal">{this.state.height}px</output>
        </div>
      </div>
    );
  };
}

class ExternalSettingsModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.stateFromProps(props);
  };

  componentWillReceiveProps(nextProps) {
    this.setState(this.stateFromProps(nextProps));
  }

  stateFromProps = (props) => {
    return {
      width: (props.componentData && props.componentData.config && props.componentData.config.width) || 200,
      height: (props.componentData && props.componentData.config && props.componentData.config.height) || 200,
    };
  };

  changeWidth = (event) => {
    const width = event.target.valueAsNumber;
    this.setState({width});
    console.log('changeWidth in modal', this.state);
    const componentData = {...this.props.componentData, config: {...this.props.componentData.config, width, height: this.state.height}};
    this.props.store.set('componentData', componentData);
  };
  changeHeight = (event) => {
    const height = event.target.valueAsNumber;
    this.setState({height});
    console.log('changeHeight in modal', this.state);
    const componentData = {...this.props.componentData, config: {...this.props.componentData.config, height, width: this.state.width}};
    this.props.store.set('componentData', componentData);
  };

  render = () => {
    return (
      <div>
        <div>
          <label htmlFor="width">Width</label>
          <input type="range" min="10" max="1000" value={this.state.width} id="width"
                 step="10" onChange={this.changeWidth}/>
          <output htmlFor="width" id="widthVal">{this.state.width}px</output>
        </div>
        <div>
          <label htmlFor="height">Height</label>
          <input type="range" min="10" max="1000" value={this.state.height} id="height"
                 step="10" onChange={this.changeHeight}/>
          <output htmlFor="height" id="widthVal">{this.state.height}px</output>
        </div>
      </div>
    );
  };
}

class EditModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.stateFromProps(props);
  };

  componentWillReceiveProps(nextProps) {
    this.setState(this.stateFromProps(nextProps));
  }

  stateFromProps = (props) => {
    return {
      isSrc: !!(props.componentData && props.componentData.config && props.componentData.config.isSrc),
      src: (props.componentData && props.componentData.src) || '',
      content: (props.componentData && props.componentData.content) || '',
    };
  };

  changeIsSrc = (event) => {
    console.log('changeIsSrc in modal', event.target.value);
    const isSrc = (event.target.value != 'false');
    this.setState({ isSrc });
  };

  changeIsContent = (event) => {
    console.log('changeIsContent in modal', event.target.value);
    const isSrc = !(event.target.value != 'false');
    this.setState({ isSrc });
  };

  changeContent = (event) => {
    console.log('changeContent in modal', event.target.value);
    const content=event.target.value;
    this.setState({ content });
  };

  changeSrc = (event) => {
    console.log('changeSrc in modal', event.target.value);
    const src=event.target.value;
    this.setState({ src });
  };

  updateContent = () => {
    const componentData = {...this.props.componentData};
    componentData.src=this.state.src;
    componentData.content=this.state.content;
    componentData.config.isSrc = this.state.isSrc;

    this.props.store.set('componentData', componentData);
  };

  render = () => {
    return (
      <div>
        <div className={Styles.tabs}>

          <div className={Styles.tab}>
            <input type="radio" id="tab-1" name="tab-group-1" checked={this.state.isSrc} onChange={this.changeIsSrc}></input>
              <label htmlFor="tab-1">Source</label>

              <div className={Styles.content}>
                <input type="text" value={this.state.src} id="src"
                       onChange={this.changeSrc}/>
              </div>
          </div>

          <div className={Styles.tab}>
            <input type="radio" id="tab-2" name="tab-group-1" checked={!(this.state.isSrc)} onChange={this.changeIsContent}></input>
              <label htmlFor="tab-2">Code</label>

              <div className={Styles.content}>
                <textarea value={this.state.content} id="content"
                          onChange={this.changeContent}></textarea>
              </div>
          </div>
        </div>
        <div>
          <input type="button" onClick={this.updateContent} value="Update"/>
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
  {keyName: 'edit', type: BUTTONS.MODAL, modalElement: EditModal, icon: EditIcon, onClick: (pubsub) => {
    console.log('*** click edit *** ');
  }},
  {type: BUTTONS.SEPARATOR},
  {keyName: 'settings', type: BUTTONS.MODAL, modalElement: SettingsModal,  icon: SettingsIcon, onClick: (pubsub) => console.log('*** click settings *** ')},
  {keyName: 'external_settings', type: BUTTONS.EXTERNAL_MODAL, modalElement: ExternalSettingsModal, icon: SettingsIcon, onClick: ((pubsub) => {console.log('*** click external settings *** ');})},
  {type: BUTTONS.DELETE},
];

export default InlineButtons;
