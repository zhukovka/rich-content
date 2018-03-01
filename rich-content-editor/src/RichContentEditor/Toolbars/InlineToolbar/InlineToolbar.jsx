import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getVisibleSelectionRect } from '@wix/draft-js';
import Styles from '~/Styles/inline-toolbar.scss';

const toolbarOffset = 5;

const getRelativeParent = element => {
  if (!element) {
    return null;
  }

  const position = window.getComputedStyle(element).getPropertyValue('position');
  if (position !== 'static') {
    return element;
  }

  return getRelativeParent(element.parentElement);
};

export default class InlineToolbar extends Component {
  static propTypes = {
    pubsub: PropTypes.object.isRequired,
    structure: PropTypes.array.isRequired,
    theme: PropTypes.object.isRequired,
    toolbarStyle: PropTypes.object,
    isMobile: PropTypes.bool,
  };

  state = {
    isVisible: false,
    position: undefined,
    overrideContent: undefined,
    extendContent: undefined,
    showRightArrow: true,
    showLeftArrow: false
  }

  componentWillMount() {
    this.props.pubsub.subscribe('selection', this.onSelectionChanged);
  }

  componentDidMount() {
    this.handleToolbarScroll();
  }

  componentWillUnmount() {
    this.props.pubsub.unsubscribe('selection', this.onSelectionChanged);
    this.buttons && this.buttons.removeEventListener('srcoll', this.handleToolbarScroll);
    window && window.removeEventListener('srcoll', this.handleToolbarScroll);
  }

  onOverrideContent = overrideContent => this.setState({ overrideContent });

  onExtendContent = extendContent => this.setState({ extendContent });

  onSelectionChanged = () => {
    // need to wait a tick for window.getSelection() to be accurate
    // when focusing editor with already present selection
    setTimeout(() => {
      if (!this.toolbar || this.state.overrideContent || this.state.extendContent) {
        return;
      }

      const relativeParent = getRelativeParent(this.toolbar.parentElement);
      const halfToolbarWidth = this.toolbar.clientWidth / 2;
      const toolbarHeight = this.toolbar.clientHeight;
      const relativeRect = (relativeParent || document.body).getBoundingClientRect();
      const selectionRect = getVisibleSelectionRect(window);

      if (!selectionRect) {
        return;
      }

      let top;
      if (!this.props.isMobile) {
        top = ((selectionRect.top - relativeRect.top) - toolbarHeight) - toolbarOffset;
      } else {
        top = (selectionRect.bottom - relativeRect.top) + toolbarOffset;
      }

      let left = (selectionRect.left - relativeRect.left) + (selectionRect.width / 2);
      // make sure we're not out of bounds, adjust position if we are
      if (left < halfToolbarWidth) {
        left = halfToolbarWidth;
      } else if ((left + halfToolbarWidth) > relativeRect.width) {
        left = relativeRect.width - halfToolbarWidth;
      }

      this.setState({ position: { top, left } });
    });
  };

  getStyle() {
    const { pubsub, toolbarStyle } = this.props;
    const { overrideContent, extendContent, position } = this.state;
    const selection = pubsub.get('getEditorState')().getSelection();
    // overrideContent could for example contain a text input, hence we always show overrideContent
    // TODO: Test readonly mode and possibly set isVisible to false if the editor is readonly
    const isVisible = (!selection.isCollapsed() && selection.getHasFocus()) || overrideContent || extendContent;
    const style = { ...position, ...toolbarStyle };

    if (isVisible) {
      style.visibility = 'visible';
      style.transform = 'translate(-50%) scale(1)';
      style.transition = 'transform 0.15s cubic-bezier(.3,1.2,.2,1)';
    } else {
      style.transform = 'translate(-50%) scale(0)';
      style.visibility = 'hidden';
    }

    return style;
  }

  handleToolbarRef = node => {
    this.toolbar = node;
  };

  handleButtonsRef = node => {
    this.buttons = node;
    if (this.buttons) {
      this.buttons.addEventListener('scroll', this.handleToolbarScroll);
      window && window.addEventListener('resize', this.handleToolbarScroll);
    }
  };

  scrollToolbar(event, direction) {
    event.preventDefault();
    switch (direction) {
      case 'right':
        this.buttons.scrollLeft += 200;
        break;
      case 'left':
        this.buttons.scrollLeft -= 200;
        break;
      default:
        break;
    }
  }

  handleToolbarScroll = () => {
    const spaceLeft = this.buttons.scrollLeft;
    const eleWidth = this.buttons.clientWidth;
    const fullWidth = this.buttons.scrollWidth;

    const spaceRight = fullWidth - eleWidth - spaceLeft;

    this.setState({
      showLeftArrow: (spaceLeft > 0),
      showRightArrow: (spaceRight > 0)
    });
  }

  render() {
    const { theme, pubsub, structure } = this.props;
    const { showLeftArrow, showRightArrow, overrideContent: OverrideContent, extendContent: ExtendContent } = this.state;
    const { buttonStyles, toolbarStyles } = theme || {};
    const toolbarClassNames = classNames(Styles.inlineToolbar, toolbarStyles && toolbarStyles.inlineToolbar);
    const buttonClassNames = classNames(Styles.inlineToolbar_buttons, toolbarStyles && toolbarStyles.inlineToolbar_buttons, {
      [Styles.inlineToolbar_overrideContent]: !!OverrideContent,
      [toolbarStyles.inlineToolbar_overrideContent]: !!OverrideContent,
    });
    const extendClassNames = classNames(Styles.inlineToolbar_extend, toolbarStyles && toolbarStyles.inlineToolbar_extend);
    const childrenProps = {
      theme: buttonStyles,
      getEditorState: pubsub.get('getEditorState'),
      setEditorState: pubsub.get('setEditorState'),
      onOverrideContent: this.onOverrideContent,
      onExtendContent: this.onExtendContent,
    };

    return (
      <div
        className={toolbarClassNames}
        style={this.getStyle()}
        ref={this.handleToolbarRef}
      >
        <div
          className={buttonClassNames}
          ref={this.handleButtonsRef}
        >
          {
            showLeftArrow &&
            <div
              className={classNames(Styles.inlineToolbar_responsiveArrow, Styles.inlineToolbar_responsiveArrowLeft,
                toolbarStyles.inlineToolbar_responsiveArrow, toolbarStyles.inlineToolbar_responsiveArrowLeft)}
              onMouseDown={e => this.scrollToolbar(e, 'left')}
            >
              <i/>
            </div>
          }
          {OverrideContent ? <OverrideContent {...childrenProps} /> : structure.map((Button, index) => <Button key={index} {...childrenProps} />)}
          {
            showRightArrow &&
            <div
              className={classNames(Styles.inlineToolbar_responsiveArrow, Styles.inlineToolbar_responsiveArrowRight,
                toolbarStyles.inlineToolbar_responsiveArrow, toolbarStyles.inlineToolbar_responsiveArrowRight)}
              onMouseDown={e => this.scrollToolbar(e, 'right')}
            >
              <i/>
            </div>
          }
        </div>
        {ExtendContent && (
          <div className={extendClassNames}>
            <ExtendContent {...childrenProps} />
          </div>
        )}
      </div>
    );
  }
}
