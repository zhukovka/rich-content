import PropTypes from 'prop-types';
import React from 'react';
import { debounce } from 'lodash';
import { TWITTER } from './toolbarOptions';

export default class TextSelectionListener extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedText: '' };
  }
  componentDidMount() {
    document.addEventListener(
      'selectionchange',
      debounce(() => {
        const selection = document.getSelection();
        let text, selectionRect;
        if (selection.rangeCount > 0) {
          text = selection.toString();
          selectionRect = selection?.getRangeAt(0)?.getBoundingClientRect();
        } else {
          text = '';
        }
        this.setState({ selectedText: text, selectionRect });
      }, 100)
    );
  }

  render() {
    const { ToolBar, targetId } = this.props;
    const { selectedText, selectionRect } = this.state;
    return selectedText !== '' ? (
      <ToolBar
        selectedText={selectedText}
        options={[TWITTER]}
        selectionRect={selectionRect}
        targetId={targetId}
      />
    ) : (
      <div />
    );
  }
}

TextSelectionListener.propTypes = {
  targetId: PropTypes.string.isRequired,
  ToolBar: PropTypes.any.isRequired,
};
