import React, { Component } from 'react';
import decorateComponentWithProps from 'decorate-component-with-props';
import ReactModal from 'react-modal';
import MobileDetect from 'mobile-detect';
import logo from './logo.svg';
import * as WixRichContentEditor from 'wix-rich-content-editor';
import './App.css';
import 'wix-rich-content-editor/dist/wix-rich-content-editor.css';
import { testImages } from './images-mock';
import theme from './theme/theme';
import testData from './testData/initialState';

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

const sideToolbarOffset = {
  desktop: { x: -40, y: 0 },
  mobile: { x: 0, y: 0 }
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
          original_file_name: testItem.url, // eslint-disable-line camelcase
          file_name: testItem.url, // eslint-disable-line camelcase
          width: testItem.metadata.width,
          height: testItem.metadata.height,
        };
        setTimeout(() => updateEntity({ data }), (Math.floor(Math.random() * 2000) + 1000));
      },
      openExternalModal: data => {
        const { modalElement, modalStyles, ...elementProps } = data;
        const ModalContent = decorateComponentWithProps(modalElement, elementProps);
        try {
          document.body.style.overflow = document.head.style.overflow = 'hidden';
        } catch (e) {
          console.warn('Cannot change document styles', e); //eslint-disable-line
        }
        this.setState({
          showModal: true,
          modalContent: <ModalContent />,
          modalStyles
        });
      },
      closeExternalModal: () => {
        try {
          document.body.style.overflow = document.head.style.overflow = 'auto';
        } catch (e) {
          console.warn('Cannot change document styles', e); //eslint-disable-line
        }
        this.setState({
          showModal: false
        });
      }
    };
  }

  componentDidMount() {
    this.mobileComponents = this.editor.getMobileComponents();
  }

  setEditor = editor => this.editor = editor;

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
    const { RichContentEditor } = WixRichContentEditor;
    const { Toolbar: MobileToolbar, Panel: MobileAddPluginPanel } = this.mobileComponents || {};
    return (
      <div className="wrapper">
        <div className="container">
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
          {MobileToolbar && <MobileToolbar />}
          <div className="content">
            <RichContentEditor
              ref={this.setEditor}
              onChange={this.onChange}
              helpers={this.helpers}
              plugins={this.plugins}
              decorators={this.decorators}
              initialState={testData}
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
        {MobileAddPluginPanel && <MobileAddPluginPanel />}
      </div>
    );
  }
}


export default App;
