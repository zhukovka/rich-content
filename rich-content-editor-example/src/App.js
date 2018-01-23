import React, { Component } from 'react';
import decorateComponentWithProps from 'decorate-component-with-props';
import ReactModal from 'react-modal';
import MobileDetect from 'mobile-detect';
import logo from './logo.svg';
import * as WixRichContentEditor from 'wix-rich-content-editor';
import './App.css';
import 'wix-rich-content-editor/dist/wix-rich-content-editor.css';
import { testImages } from './images-mock';
import theme from './theme';
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
    this.md = window ? new MobileDetect(window.navigator.userAgent) : null;
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
    this.helpers = {
      onFilesChange: (file, updateEntity) => {
        console.log('[consumer] file changed!', file); //eslint-disable-line no-console
        //mock upload
        const testItem = testImages[Math.floor(Math.random() * testImages.length)];
        const data = {
          id: testItem.photoId,
          original_file_name: testItem.url,
          file_name: testItem.url,
          width: testItem.metadata.width,
          height: testItem.metadata.height,
          metadata: {
            altText: 'This is a altText',
            caption: 'This is a caption'
          }
        };
        setTimeout(() => updateEntity({ data }), (Math.floor(Math.random() * 2000) + 1000));
      },
      openExternalModal: data => {
        const { panelElement, modalStyles, ...elementProps } = data;
        const ModalContent = decorateComponentWithProps(panelElement, elementProps);
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

  isMobile = () => {
    return this.md && this.md.mobile() !== null;
  }

  render() {
    const sideToolbarOffset = { x: -40, y: 0 };
    const { RichContentEditor } = WixRichContentEditor;
    return (
      <div className="wrapper">
        <div className="header">
          <img src={logo} className="logo" alt="logo" />
          <h2>Wix Rich Content Editor</h2>
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
            editorState={this.state.editorState}
            readOnly={this.state.readOnly}
            sideToolbarOffset={sideToolbarOffset}
            isMobile={this.isMobile()}
            theme={theme}
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
