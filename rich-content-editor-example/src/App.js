import React, { Component } from 'react';
import ReactModal from 'react-modal';
import decorateComponentWithProps from 'decorate-component-with-props';
import logo from './logo.svg';
import * as WixRichContentEditor from 'wix-rich-content-editor';
import './App.css';
import 'wix-rich-content-editor/dist/wix-rich-content-editor.css';
//import TestData from './TestData/initialState';

const modalStyleDefaults = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastSave: new Date(),
      editorState: WixRichContentEditor.EditorState.createEmpty(),
      readOnly: false
    };
    this.initEditorProps();
  }

  initEditorProps() {
    this.plugins = WixRichContentEditor.PluginList;
    this.decorators = {
      list: WixRichContentEditor.DecoratorList,
      config: {
        Hashtag: {
          createHref: decoratedText =>
            `/search/posts?query=${encodeURIComponent('#')}${decoratedText}`
        }
      }
    };
    this.textButtons = WixRichContentEditor.TextButtonList;
    this.helpers = {
      onFilesChange: (files, updateEntity) => {
        console.log('[consumer] files changed!', files); //eslint-disable-line no-console
        //mock upload
        const data = {
          original_file_name: //eslint-disable-line camelcase
            'a27d24_e1ac8887d0e04dd5b98fb4c263af1180~mv2_d_4915_3277_s_4_2.jpg',
          file_name: //eslint-disable-line camelcase
            'a27d24_e1ac8887d0e04dd5b98fb4c263af1180~mv2_d_4915_3277_s_4_2.jpg',
          width: 4915,
          height: 3277
        };
        setTimeout(() => updateEntity({ data }), 1500);
      },
      openExternalModal: data => {
        const { panelElement, modalStyles, ...elementProps } = data;
        const ModalContent = decorateComponentWithProps(
          panelElement,
          elementProps
        );
        this.setState({
          showModal: true,
          modalContent: <ModalContent />,
          modalStyles
        });
      },
      closeExternalModal: () => {
        this.setState({
          showModal: false
        });
      }
    };
  }

  onReadOnlyChange = event => {
    this.setState({ readOnly: event.target.checked });
  };

  onChange = editorState => {
    this.setState({
      lastSave: new Date(),
      editorState
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      modalContent: null
    });
  };

  render() {
    const sideToolbarOffset = { x: -40, y: 0 };
    const { RichContentEditor } = WixRichContentEditor;
    return (
      <div className="wrapper">
        <div className="header">
          <img src={logo} className="logo" alt="logo" />
          <h2>Welcome to WixDraftJs</h2>
          <div>
            <label htmlFor="readOnlyToggle">Read Only</label>
            <input
              type="checkbox"
              name="readOnlyToggle"
              onChange={this.onReadOnlyChange}
              defaultChecked={this.state.readOnly}
            />
          </div>
          <span className="intro">
            Last saved on {this.state.lastSave.toTimeString()}
          </span>
        </div>
        <div className="content">
          <RichContentEditor
            onChange={this.onChange}
            helpers={this.helpers}
            plugins={this.plugins}
            decorators={this.decorators}
            textButtons={this.textButtons}
            editorState={this.state.editorState}
            readOnly={this.state.readOnly}
            sideToolbarOffset={sideToolbarOffset}
          />
          <ReactModal
            isOpen={this.state.showModal}
            contentLabel="External Modal Example"
            style={this.state.modalStyles || modalStyleDefaults}
            onRequestClose={this.closeModal}
          >
            {this.state.modalContent}
          </ReactModal>
        </div>
      </div>
    );
  }
}


export default App;
