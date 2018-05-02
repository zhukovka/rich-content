/* eslint-disable */
import React, { Component } from 'react';
import ReactModal from 'react-modal';
import MobileDetect from 'mobile-detect';
import { createLinkPlugin } from 'wix-rich-content-plugin-link';
import { createHashtagPlugin } from 'wix-rich-content-plugin-hashtag';
//import { createExternalEmojiPlugin } from 'wix-rich-content-plugin-emoji';
import { createImagePlugin } from 'wix-rich-content-plugin-image';
import { createVideoPlugin } from 'wix-rich-content-plugin-video';
import * as WixRichContentEditor from 'wix-rich-content-editor';
import { testImages, testVideos } from './mock';
// import testData from './testData/initialState';
import './App.css';
import 'wix-rich-content-editor/dist/wix-rich-content-editor.css';
import 'wix-rich-content-plugin-link/dist/styles.css';
import 'wix-rich-content-plugin-hashtag/dist/styles.css';
import 'wix-rich-content-plugin-emoji/dist/styles.css';
import 'wix-rich-content-plugin-image/dist/styles.css';
import 'wix-rich-content-plugin-video/dist/styles.css';
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
    this.plugins = WixRichContentEditor.PluginList.filter(p => p.indexOf('emoji') === -1);
    this.plugins.unshift(createImagePlugin);
    this.plugins.splice(2, 0, createVideoPlugin);
    this.plugins = [
      ...this.plugins,
      createLinkPlugin,
      createHashtagPlugin,
      //createExternalEmojiPlugin,
    ];
    this.config = {
      hashtag: {
        createHref: decoratedText =>
          `/search/posts?query=${encodeURIComponent('#')}${decoratedText}`,
          onClick: (event, text) => {
          event.preventDefault();
          console.log(`'${text}' hashtag clicked!`);
        }
      },
      // image: {
        // imageProps: src => ({
        //   'data-pin-media': `https://static.wixstatic.com/media/${src.file_name}`,
        //   'data-pin-url': 'https://wix.com',
        // }),
        // toolbar: {
        //   hidden: ['link', 'settings']
        // }
      // },
    };
    const mockUpload = (files, updateEntity) => {
      //mock upload
      const testItem = testImages[Math.floor(Math.random() * testImages.length)];
      const data = {
        id: testItem.photoId,
        original_file_name: files && files[0] ? files[0].name : testItem.url,
        file_name: testItem.url,
        width: testItem.metadata.width,
        height: testItem.metadata.height,
      };
      setTimeout(() => {
        updateEntity({ data, files });
        console.log('consumer uploaded', data);
      }, 500);
    }
    this.helpers = {
      onFilesChange: (files, updateEntity) => mockUpload(files, updateEntity),
      // handleFileSelection: (index, multiple, updateEntity, removeEntity) => {
      //   const count = multiple ? [1,2,3] : [1];
      //   const data = [];
      //   count.forEach(_ => {
      //     const testItem = testImages[Math.floor(Math.random() * testImages.length)];
      //     data.push({
      //       id: testItem.photoId,
      //       original_file_name: testItem.url,
      //       file_name: testItem.url,
      //       width: testItem.metadata.width,
      //       height: testItem.metadata.height,
      //     });
      //   })
      //   setTimeout(() => { updateEntity({ data }) }, 500);
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
                editorKey={'random-editorKey-ssr'}
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
