import React, { Component } from 'react';
import PropTypes from 'prop-types';
import JSONInput from 'react-json-editor-ajrm';
import { EditorState, convertFromRaw, convertToRaw } from '@wix/draft-js';

class RichContentRawDataViewer extends Component {

  constructor(props) {
    super(props);
    this.id = `rcrv_${Math.floor(Math.random() * 9999)}`;
    this.state = this.stateFromProps(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.stateFromProps(nextProps));
  }

  stateFromProps(props){
    return { content: convertToRaw(props.editorState.getCurrentContent()) };
  }

  onChange(content) {
      if (content && content.jsObject && !content.error) {
        // this is not working, some setState issue
        // const editorState = EditorState.createWithContent(convertFromRaw(content.jsObject));
        this.props.onChange(content);
      }
  };

  render = () => <JSONInput placeholder={this.state.content} id={this.id} onChange={content => this.onChange(content)} {...this.props}/>;
}

// see https://github.com/AndrewRedican/react-json-editor-ajrm for details
RichContentRawDataViewer.PropTypes = {
  editorState: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  viewOnly: PropTypes.bool,
  confirmGood: PropTypes.bool,
  height: PropTypes.string,
  width: PropTypes.string,
  onKeyPressUpdate: PropTypes.func,
  waitAfterKeyPress: PropTypes.func,
  theme: PropTypes.string,
  colors: PropTypes.object,
  style: PropTypes.object,
};

export default RichContentRawDataViewer;
