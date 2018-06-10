import React, { Component } from 'react';
import PropTypes from 'prop-types';
import JSONInput from 'react-json-editor-ajrm';

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
    return { content: this.fixKeys(props.content) };
  }

  fixKeys(content) {
    if (content && content.entityMap) {
      const fixedEntityMap = Object.keys(content.entityMap).reduce((map, key) => {
        return Object.assign(map, { [`"${key}"`]: content.entityMap[key]});
      }, {});
      return Object.assign({}, content, { entityMap: fixedEntityMap });
    }
  }

  onChange(content) {
      if (content && content.jsObject && !content.error) {
        this.props.onChange(this.fixKeys(content));
      }
  };

  render = () => <JSONInput placeholder={this.state.content} id={this.id} onChange={content => this.onChange(content)} {...this.props}/>;
}

// see https://github.com/AndrewRedican/react-json-editor-ajrm for details
RichContentRawDataViewer.PropTypes = {
  content: PropTypes.object.isRequired,
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
