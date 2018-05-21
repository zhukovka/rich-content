import React, { Component } from 'react';
import ReactModal from 'react-modal';
import MobileDetect from 'mobile-detect';
import RichContentModal from 'wix-rich-content-common';
import RichContentViewer from 'wix-rich-content-viewer';
import 'wix-rich-content-viewer/dist/wix-rich-content-viewer.css';
import 'wix-rich-content-plugin-video/dist/styles.css';
import 'wix-rich-content-plugin-image/dist/styles.css';
import { videoTypeMapper } from 'wix-rich-content-plugin-video';
import { imageTypeMapper } from 'wix-rich-content-plugin-image';

import TestData from './TestData/initial-state';
import logo from './logo.svg';
import './App.css';

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
      raw: TestData.onlyText
    };
    this.md = window ? new MobileDetect(window.navigator.userAgent) : null;
    this.initViewerProps();
  }

  initViewerProps() {
    // this.plugins = [];
    // this.decorators = {
    //   list: WixRichContentEditor.DecoratorList,
    //   config: {
    //     Hashtag: {
    //       createHref: decoratedText =>
    //         `/search/posts?query=${encodeURIComponent('#')}${decoratedText}`
    //     }
    //   }
    // };
    this.helpers = {
      openModal: data => {
        const { modalStyles, ...modalProps } = data;
        this.setState({
          showModal: true,
          modalProps,
          modalStyles,
        });
      },
      closeModal: () => {
        this.setState({
          showModal: false,
          modalProps: null,
          modalStyles: null,
        });
      }
    };
  }

  closeModal = () => {
    this.setState({
      showModal: false,
      modalContent: null
    });
  };

  /* eslint-disable no-console */
  handleContentChange = () => {
    const value = document.getElementById('testData').value;
    this.setState({
      raw: TestData[value]
    });
    //console.log('on change are', TestData[value]);
  };

  isMobile = () => {
    return this.md && this.md.mobile() !== null;
  }

  render() {
    const contentOptions = Object.keys(TestData).map(key =>
      (<option value={key} key={key}> {key}</option>)
    );

    return (
      <div className="wrapper">
        <div className="container">
          {!this.isMobile() ?
              <div className="header">
                <h1>Wix Rich Content Viewer</h1>
                <div className="toggle-container">
                  <div className="toggle">
                  <select id="testData" name="testData" onChange={() => this.handleContentChange(this)} >
                    {contentOptions}
                  </select>
                  </div>
                </div>
              </div> :
              <select id="testData" name="testData" onChange={() => this.handleContentChange(this)} >
                {contentOptions}
              </select>
            }
            <div className="content">
              <RichContentViewer
                helpers={this.helpers}
                typeMappers={[videoTypeMapper, imageTypeMapper]}
                // plugins={this.plugins}
                // decorators={this.decorators}
                initialState={this.state.raw}
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


      </div>);
  }
}


export default App;
