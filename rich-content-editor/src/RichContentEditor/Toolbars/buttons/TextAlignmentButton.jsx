import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getTextAlignment } from '~/Utils';
import TextAlignmentPanel from './TextAlignmentPanel';
import AlignTextLeft from '../icons/align-text-left.svg';
import AlignTextCenter from '../icons/align-text-center.svg';
import AlignTextRight from '../icons/align-text-right.svg';
import AlignTextJustify from '../icons/align-text-justify.svg';
import Styles from '~/Styles/inline-toolbar-button.scss';

class TextAlignmentButton extends Component {
  onClick = () => this.props.onOverrideContent(TextAlignmentPanel);

  preventBubblingUp = event => {
    event.preventDefault();
  };

  getActiveIcon = () => {
    const { getEditorState } = this.props;
    // if the button is rendered before the editor
    if (!getEditorState) {
      return false;
    }

    const textAlignment = getTextAlignment(getEditorState());
    switch (textAlignment) {
      case 'center':
        return <AlignTextCenter />;
      case 'right':
        return <AlignTextRight />;
      case 'justify':
        return <AlignTextJustify />;
      case 'left':
      default:
        return <AlignTextLeft />;
    }
  };

  render() {
    const { theme } = this.props;
    const buttonWrapperClassNames = classNames(Styles.buttonWrapper, theme && theme.buttonWrapper);
    const buttonClassNames = classNames(Styles.button, theme && theme.button);
    const iconClassNames = classNames(Styles.icon, theme && theme.icon);
    return (
      <div className={buttonWrapperClassNames} onMouseDown={this.preventBubblingUp}>
        <button onClick={this.onClick} className={buttonClassNames}>
          <div className={iconClassNames}>
            {this.getActiveIcon()}
          </div>
        </button>
      </div>
    );
  }
}

TextAlignmentButton.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  onOverrideContent: PropTypes.func.isRequired,
  theme: PropTypes.object
};

export default TextAlignmentButton;
