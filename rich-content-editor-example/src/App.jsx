import React, { Component } from 'react';
import ReactModal from 'react-modal';
import MobileDetect from 'mobile-detect';
import logo from './logo.svg';
import * as WixRichContentEditor from 'wix-rich-content-editor';
import { testImages } from './images-mock';
// import testData from './testData/initialState';
import './App.css';
import 'wix-rich-content-editor/dist/wix-rich-content-editor.css';
import theme from './theme/theme'; // must import after custom styles

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
          original_file_name: testItem.url, // eslint-disable-line camelcase
          file_name: testItem.url, // eslint-disable-line camelcase
          width: testItem.metadata.width,
          height: testItem.metadata.height,
        };
        setTimeout(() => updateEntity({ data }), (Math.floor(Math.random() * 2000) + 1000));
      },
      openModal: data => {
        const { modalStyles, ...modalProps } = data;
        try {
          document.body.style.overflow = document.head.style.overflow = 'hidden';
        } catch (e) {
          console.warn('Cannot change document styles', e); //eslint-disable-line
        }
        this.setState({
          showModal: true,
          modalProps,
          modalStyles,
        });
      },
      closeModal: () => {
        try {
          document.body.style.overflow = document.head.style.overflow = 'auto';
        } catch (e) {
          console.warn('Cannot change document styles', e); //eslint-disable-line
        }
        this.setState({
          showModal: false,
          modalProps: null,
          modalStyles: null,
        });
      }
    };
  }

  componentDidMount() {
    ReactModal.setAppElement('body');
    this.setState({ MobileToolbar: this.editor.getMobileToolbar() });
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
    const {
      RichContentEditor,
      RichContentModal,
    } = WixRichContentEditor;
    const { MobileToolbar } = this.state;
    return (
      <div className="wrapper">
        <div className="container">
          {!this.isMobile() &&
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
          }
          {MobileToolbar && <MobileToolbar />}
          <div className="content">
            <RichContentEditor
              ref={this.setEditor}
              onChange={this.onChange}
              helpers={this.helpers}
              plugins={this.plugins}
              decorators={this.decorators}
              editorState={this.state.editorState}
              readOnly={this.state.readOnly}
              isMobile={this.isMobile()}
              theme={theme}
            />
            <ReactModal
              isOpen={this.state.showModal}
              contentLabel="External Modal Example"
              style={this.state.modalStyles || modalStyleDefaults}
              onRequestClose={this.closeModal}
            >
              {this.state.showModal && <RichContentModal {...this.state.modalProps} />}
            </ReactModal>
          </div>
        </div>
      </div>
    );
  }
}


export default App;
