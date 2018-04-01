/* eslint-disable */
import React, { Component } from 'react';
import ReactModal from 'react-modal';
import MobileDetect from 'mobile-detect';
import * as WixRichContentEditor from 'wix-rich-content-editor';
import { testImages, testVideos } from './mock';
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
      readOnly: false,
      mounted: true,
      textToolbarType: 'inline',
    };
    this.md = window ? new MobileDetect(window.navigator.userAgent) : null;
    this.initEditorProps();
  }

  initEditorProps() {
    this.plugins = WixRichContentEditor.PluginList;
    this.config = {
      hashtag: {
        createHref: decoratedText =>
          `/search/posts?query=${encodeURIComponent('#')}${decoratedText}`,
          onClick: (event, text) => {
          event.preventDefault();
          console.log(`'${text}' hashtag clicked!`);
        }
      }
    };
    const mockUpload = (itemIdx, updateEntity) => {
      //mock upload
      const testItem = testImages[Math.floor(Math.random() * testImages.length)];
      const data = {
        id: testItem.photoId,
        original_file_name: testItem.url,
        file_name: testItem.url,
        width: testItem.metadata.width,
        height: testItem.metadata.height,
      };
      setTimeout(() => updateEntity({ data, itemIdx }), 500);
    }
    this.helpers = {
      onFilesChange: (file, updateEntity) => mockUpload(undefined, updateEntity),
      // handleFileSelection: (index, multiple, updateEntity, removeEntity) => {
      //   const images = multiple ? [1,2,3] : [1];
      //   images.forEach(i => mockUpload(index, updateEntity));
      // },
      onVideoSelected: (url, updateEntity) => {
        setTimeout(() => {
          const testVideo = testVideos[Math.floor(Math.random() * testVideos.length)];
          updateEntity(testVideo);
        }, 500);
      },
      openModal: data => {
        const { modalStyles, ...modalProps } = data;
        try {
          document.body.style.overflow = document.documentElement.style.overflow = 'hidden';
          document.documentElement.style.height = '100%';
          document.documentElement.style.position = 'relative';
        } catch (e) {
          console.warn('Cannot change document styles', e);
        }
        this.setState({
          showModal: true,
          modalProps,
          modalStyles,
        });
      },
      closeModal: () => {
        try {
          document.body.style.overflow = document.documentElement.style.overflow = 'auto';
          document.documentElement.style.height = 'initial';
          document.documentElement.style.position = 'initial';
        } catch (e) {
          console.warn('Cannot change document styles', e);
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
    this.setEditorToolbars();
  }

  setEditor = editor => this.editor = editor;

  setEditorToolbars = () => {
    const { MobileToolbar, TextToolbar } = this.editor.getToolbars();
    this.setState({ MobileToolbar, TextToolbar });
  }

  onMountedChange = event => this.setState({ mounted: event.target.checked });

  onTextToolbarTypeChange = event => {
    this.setState({ textToolbarType: event.target.checked ? 'static' : 'inline' }, () => {
      this.setEditorToolbars();
    });
  };

  onReadOnlyChange = event => this.setState({ readOnly: event.target.checked });

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
    const modalStyles = {
      content: Object.assign({}, (this.state.modalStyles || modalStyleDefaults).content, theme.modalTheme.content),
      overlay: Object.assign({}, (this.state.modalStyles || modalStyleDefaults).overlay, theme.modalTheme.overlay),
    };

    const { MobileToolbar, TextToolbar } = this.state;
    return (
      <div className="wrapper">
        <div className="container">
          {!this.isMobile() &&
            <div className="header">
              <h2>Wix Rich Content Editor</h2>
              <div>
                <label htmlFor="mountedToggle">Mounted</label>
                <input
                  type="checkbox"
                  name="mountedToggle"
                  onChange={this.onMountedChange}
                  defaultChecked={this.state.mounted}
                />
              </div>
              <div>
                <label htmlFor="textToolbarType">Static Text Toolbar</label>
                <input
                  type="checkbox"
                  name="textToolbarType"
                  onChange={this.onTextToolbarTypeChange}
                  defaultChecked={this.state.textToolbarType === 'static'}
                />
              </div>
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
            {TextToolbar && <TextToolbar />}
            {this.state.mounted &&
              <RichContentEditor
                ref={this.setEditor}
                onChange={this.onChange}
                helpers={this.helpers}
                plugins={this.plugins}
                config={this.config}
                editorState={this.state.editorState}
                readOnly={this.state.readOnly}
                isMobile={this.isMobile()}
                textToolbarType={this.state.textToolbarType}
                theme={theme}
                locale={'en'}
              />
            }

            <ReactModal
              isOpen={this.state.showModal}
              contentLabel="External Modal Example"
              style={modalStyles}
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
