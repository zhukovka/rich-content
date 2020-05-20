import PropTypes from 'prop-types';
import React from 'react';
import { debounce } from 'lodash';
import { TWITTER } from './toolbarOptions';

export default class TextSelectionListener extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedText: '' };
  }

  getSelectedText = selection => {
    let text = '';
    if (selection.rangeCount > 0) {
      text = selection.toString();
    }
    this.setState({ selectedText: text });
  };

  getSelectedPosition = selection => {
    if (selection.rangeCount > 0) {
      const selectionRect = selection.getRangeAt(0).getBoundingClientRect();
      const { x, y, width } = selectionRect;
      this.setState({
        position: {
          x,
          y,
          width,
        },
      });
    }
  };

  debounceSelection = debounce(() => {
    const selection = document.getSelection();
    this.getSelectedText(selection);
    this.getSelectedPosition(selection);
  }, 100);

  componentDidMount() {
    document.addEventListener('selectionchange', this.debounceSelection);
  }

  render() {
    const { ToolBar, targetId } = this.props;
    const { selectedText, position } = this.state;
    return selectedText !== '' ? (
      <ToolBar
        selectedText={selectedText}
        options={[TWITTER]}
        position={position}
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
