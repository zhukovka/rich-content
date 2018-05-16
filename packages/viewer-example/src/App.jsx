import React, { Component } from 'react';
import logo from './logo.svg';
import RichContentViewer from 'wix-rich-content-viewer';
import './App.css';
import 'wix-rich-content-viewer/dist/wix-rich-content-viewer.css';
import TestData from './TestData/initial-state';

import { ImageViewer, IMAGE_TYPE_LEGACY, IMAGE_TYPE } from 'wix-rich-content-plugin-image';
import { VideoComponent, VIDEO_TYPE_LEGACY, VIDEO_TYPE } from 'wix-rich-content-plugin-video';

const typeMap = {
  [IMAGE_TYPE_LEGACY]: ImageViewer,
  [IMAGE_TYPE]: ImageViewer,
  [VIDEO_TYPE]: VideoComponent,
  [VIDEO_TYPE_LEGACY]: VideoComponent,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      raw: TestData.onlyText
    };
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

  render() {
    const contentOptions = Object.keys(TestData).map(key =>
      (<option value={key} key={key}> {key}</option>)
    );

    return (
      <div className="wrapper">
        <div className="header">
          <img src={logo} className="logo" alt="logo" />
          <h2>Wix Rich Content Viewer</h2>
          <select id="testData" name="testData" onChange={() => this.handleContentChange(this)} >
            {contentOptions}
          </select>
        </div>
        <div className="content">
          <RichContentViewer
            helpers={this.helpers}
            typeMap={typeMap}
            // plugins={this.plugins}
            // decorators={this.decorators}
            initialState={this.state.raw}
          />
          {/* <ReactModal
            isOpen={this.state.showModal}
            contentLabel="External Modal Example"
            style={this.state.modalStyles || modalStyleDefaults}
            onRequestClose={this.closeModal}
          >
            {this.state.showModal && <RichContentModal {...this.state.modalProps} />}
          </ReactModal> */}
        </div>
      </div>);
  }
}


export default App;
