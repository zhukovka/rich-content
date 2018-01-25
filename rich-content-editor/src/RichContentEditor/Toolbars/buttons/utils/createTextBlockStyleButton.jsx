import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RichUtils } from '@wix/draft-js';
import classNames from 'classnames';
import Styles from '~/Styles/inline-toolbar-button.scss';

export default ({ blockType, content }) =>
  class TextBlockStyleButton extends Component {
    static propTypes = {
      getEditorState: PropTypes.func.isRequired,
      setEditorState: PropTypes.func.isRequired,
      theme: PropTypes.object,
    };

    toggleStyle = event => {
      const { getEditorState, setEditorState } = this.props;
      event.preventDefault();
      setEditorState(RichUtils.toggleBlockType(getEditorState(), blockType));
    };

    preventBubblingUp = event => event.preventDefault();

    blockTypeIsActive = () => {
      if (!this.props.getEditorState) {
        return false;
      }

      const editorState = this.props.getEditorState();
      const type = editorState
        .getCurrentContent()
        .getBlockForKey(editorState.getSelection().getStartKey())
        .getType();
      return type === blockType;
    };

    render() {
      const { theme } = this.props;
      const buttonWrapperClassNames = classNames(Styles.buttonWrapper, theme && theme.buttonWrapper);
      const idleButtonClassNames = classNames(Styles.button, theme && theme.button);
      const activeButtonClassNames = classNames(idleButtonClassNames, Styles.active, theme && theme.active);
      const buttonClassNames = this.blockTypeIsActive() ? activeButtonClassNames : idleButtonClassNames;

      return (
        <div className={buttonWrapperClassNames} onMouseDown={this.preventBubblingUp}>
          <button className={buttonClassNames} onClick={this.toggleStyle} type="button" children={content} />
        </div>
      );
    }
  };
