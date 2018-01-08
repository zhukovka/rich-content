import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextAlignmentPanel from './TextAlignmentPanel';
import AlignTextLeft from '../icons/align-text-left.svg';
import AlignTextCenter from '../icons/align-text-center.svg';
import AlignTextRight from '../icons/align-text-right.svg';
import AlignTextJustify from '../icons/align-text-justify.svg';
import buttonStyles from '~/Styles/text-toolbar-button.scss';

class TextAlignmentButton extends Component {
  onClick = () => this.props.onOverrideContent(TextAlignmentPanel);

  preventBubblingUp = event => {
    event.preventDefault();
  };

  getActiveIcon = () => {
    // if the button is rendered before the editor
    if (!this.props.getEditorState) {
      return false;
    }

    const editorState = this.props.getEditorState();

    const contentBlock = editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getStartKey());
    const { data: { textAlignment } } = contentBlock.toJS();
    switch (textAlignment) {
      case 'left':
        return <AlignTextLeft />;
      case 'center':
        return <AlignTextCenter />;
      case 'right':
        return <AlignTextRight />;
      case 'justify':
        return <AlignTextJustify />;
      default:
        return <AlignTextLeft />;
    }
  };

  render() {
    return (
      <div className={buttonStyles.buttonWrapper} onMouseDown={this.preventBubblingUp}>
        <button onClick={this.onClick} className={buttonStyles.button}>
          {this.getActiveIcon()}
        </button>
      </div>
    );
  }
}

TextAlignmentButton.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  onOverrideContent: PropTypes.func.isRequired,
};

export default TextAlignmentButton;
