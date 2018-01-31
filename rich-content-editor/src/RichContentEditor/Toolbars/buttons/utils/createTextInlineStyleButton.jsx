import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RichUtils } from '@wix/draft-js';
import classNames from 'classnames';
import Styles from '~/Styles/inline-toolbar-button.scss';

export default ({ style, Icon }) =>
  class TextInlineStyleButton extends Component {
    static propTypes = {
      getEditorState: PropTypes.func.isRequired,
      setEditorState: PropTypes.func.isRequired,
      theme: PropTypes.object,
    };

    toggleStyle = event => {
      const { getEditorState, setEditorState } = this.props;
      event.preventDefault();
      setEditorState(RichUtils.toggleInlineStyle(getEditorState(), style));
    };

    preventBubblingUp = event => event.preventDefault();

    styleIsActive = () =>
      this.props.getEditorState &&
      this.props
        .getEditorState()
        .getCurrentInlineStyle()
        .has(style);

    render() {
      const { theme } = this.props;
      const buttonWrapperClassNames = classNames(Styles.buttonWrapper, theme && theme.buttonWrapper);
      const idleButtonClassNames = classNames(Styles.button, theme && theme.button);
      const activeButtonClassNames = classNames(idleButtonClassNames, Styles.active, theme && theme.active);
      const buttonClassNames = this.styleIsActive() ? activeButtonClassNames : idleButtonClassNames;
      const iconClassNames = classNames(Styles.icon, theme && theme.icon);
      return (
        <div className={buttonWrapperClassNames} onMouseDown={this.preventBubblingUp}>
          <button className={buttonClassNames} onClick={this.toggleStyle} type="button">
            <div className={iconClassNames}>
              <Icon />
            </div>
          </button>
        </div>
      );
    }
  };
