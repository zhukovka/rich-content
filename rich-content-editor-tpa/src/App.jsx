import React, { Component } from 'react';
import logo from './logo.svg';
import TestData from './TestData/initialState';
import {RichContentEditor} from 'wix-rich-content-editor';
import {ReactHeight} from 'react-height';
import Styles from './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={lastSave: new Date(), readOnly: false}
  }
  setEditor = editor => this.editor=editor;

  onChange = (editorState) => {
    //TODO: this is the place where we want to auto-save
    this.setState({lastSave: new Date()});
  };

  componentWillReceiveProps(nextProps) {
    if(typeof nextProps.readOnly !== 'undefined') {
      this.setState(this.setState({ readOnly: nextProps.readOnly }));
    }
  }

  componentDidMount() {
    this.lastHeight = 0;
    setInterval(() => {
      const component = document.getElementById('content-wrapper');
      if (component) {
        const height = component.scrollHeight;
        if (this.lastHeight !== height) {
          this.lastHeight = height;
          Wix.setHeight(height);
        }
      }
    }, 1000);
  }

  _getModalPointer = () => {
    for (let i = 0; i < window.parent.frames.length; i++) {
      try {
        if (window.parent.frames[i].location.pathname === '/modal.html') {
          return window.parent.frames[i];
        }
      } catch (e) {
        //console.log('catch '+ i);
      }
    }
  };


  nextPhoto = 0;
  helpers = {
    onFilesChange: (files, updateEntity) => {
      console.log('[consumer] files changed!', files);
      //mock upload
      const data = [{
        original_file_name: "a27d24_e1ac8887d0e04dd5b98fb4c263af1180~mv2_d_4915_3277_s_4_2.jpg",
        file_name: "a27d24_e1ac8887d0e04dd5b98fb4c263af1180~mv2_d_4915_3277_s_4_2.jpg",
        width: 4915,
        height: 3277,
      },
      {
        original_file_name: "8bb438_b2d862605f684658926e6ee05e954880.jpg",
        file_name: "8bb438_b2d862605f684658926e6ee05e954880.jpg",
        width: 1920,
        height: 1080
      }];
      setTimeout(() => updateEntity({data: data[this.nextPhoto++ % 2]}), 4500);
    },
    openExternalModal: (modalProps) => {
      window.Wix.openModal(window.document.location.origin + '/modal.html', 500, 500, ()=>console.log('closing'));
      window.Wix.PubSub.subscribe("externalModal", (event) => {
        if (event.origin !== window.Wix.Utils.getCompId()) {
          console.log('externalModal in main app', event);
          if (event.data.value = 'modal_loaded') {
            const modal = this._getModalPointer();
            if (modal) {
              console.log('Found modal pointer');
              modal.showModal(modalProps);
            }
            // window.Wix.PubSub.publish("externalModal", { value: "editorState", editorState: this.editor.getEditorState() }, true);
          }
        }
        //process the event which has the following format :
        // {
        //      name:eventName,
        //      data: eventData,
        //      origin: compId
        // }
      });
    }
  };

  setHeight(height) {
    console.log('Got new height', height);
    Wix.setHeight(height);
  }

  render() {
    return (
      <ReactHeight id='content-wrapper' onHeightReady={this.setHeight}>
        <div className={Styles.app}>
          <div className={Styles.appHeader}>
            <img src={logo} className={Styles.appLogo} alt="logo" />
            <h2>Welcome to Wix Rich-Content</h2>
            <h3>Last saved on {this.state.lastSave.toTimeString()}</h3>
            <div>
              <label htmlFor="readOnly">read only mode</label>
              <input type="checkbox" checked={this.state.readOnly} id="readOnly"
                     onChange={(event) => this.setState({readOnly: event.target.checked})}/>
              <output htmlFor="readOnly" id="readOnlyVal">{this.state.readOnly}</output>
            </div>
          </div>
          <div className={Styles.appIntro}>
            <RichContentEditor
            ref={this.setEditor}
            initialState={TestData}
            onChange={this.onChange}
            helpers={this.helpers}
            readOnly={this.state.readOnly}
            />
          </div>
        </div>
      </ReactHeight>
    );
  }
}

export default App;
