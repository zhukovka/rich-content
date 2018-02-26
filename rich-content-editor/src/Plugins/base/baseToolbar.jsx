/* eslint-disable react/no-find-dom-node */
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import Separator from '~/Components/Separator';
import BaseToolbarButton from './baseToolbarButton';
import {
  BUTTONS,
  SizeOriginalCenterButton,
  SizeSmallCenterButton,
  SizeSmallLeftButton,
  SizeSmallRightButton,
  SizeContentButton,
  SizeFulllWidthButton,
  BlockLinkButton,
  DeleteButton,
} from './buttons';
import toolbarStyles from '~/Styles/plugin-toolbar.scss';
import buttonStyles from '~/Styles/plugin-toolbar-button.scss';

const toolbarOffset = 12;

const getInitialState = () => (
  {
    position: { transform: 'translate(-50%) scale(0)' },
    showLeftArrow: false,
    showRightArrow: true,
    componentData: {},
    componentState: {},
    overrideContent: undefined,
    extendContent: undefined,
  }
);

export default function createToolbar({ buttons, theme, pubsub, helpers, isMobile }) {
  class BaseToolbar extends Component {
    constructor(props) {
      super(props);
      this.state = getInitialState();
    }

    componentDidMount() {
      pubsub.subscribe('visibleBlock', this.onVisibilityChanged);
      pubsub.subscribe('componentState', this.onComponentStateChanged);
      pubsub.subscribe('componentData', this.onComponentDataChanged);
      pubsub.subscribe('componentAlignment', this.onComponentAlignmentChange);
      pubsub.subscribe('componentSize', this.onComponentSizeChange);
      pubsub.subscribe('componentLink', this.onComponentLinkChange);
    }


    componentWillUnmount() {
      pubsub.unsubscribe('visibleBlock', this.onVisibilityChanged);
      pubsub.unsubscribe('componentState', this.onComponentStateChanged);
      pubsub.unsubscribe('componentData', this.onComponentDataChanged);
      pubsub.unsubscribe('componentAlignment', this.onComponentAlignmentChange);
      pubsub.unsubscribe('componentSize', this.onComponentSizeChange);
      pubsub.unsubscribe('componentLink', this.onComponentLinkChange);
    }

    onOverrideContent = overrideContent => this.setState({ overrideContent });

    onExtendContent = extendContent => this.setState({ extendContent });

    onComponentStateChanged = contentState => {
      this.setState({ contentState });
    };

    onComponentDataChanged = componentData => {
      this.setState({ componentData });
    };

    onComponentLinkChange = link => {
      if (link) {
        pubsub.update('componentData', { config: { link } });
      }
    };

    setAlignment = alignment => {
      pubsub.set('componentAlignment', alignment);
    };

    setAlignmentAndSize = (componentAlignment, componentSize) => {
      pubsub.set({ componentAlignment, componentSize });
    };

    onComponentAlignmentChange = alignment => {
      this.setState({ alignment }, () => {
        this.onVisibilityChanged(pubsub.get('visibleBlock'));
      });
    };

    setSize = size => {
      pubsub.set('componentSize', size);
    };

    onComponentSizeChange = size => {
      this.setState({ size });
    };

    deleteBlock = () => {
      pubsub.set('visibleBlock', null);
      pubsub.get('deleteBlock')();
    };

    onVisibilityChanged = visibleBlock => {
      if (visibleBlock) {
        this.showToolbar();
      } else {
        this.hideToolbar();
      }
    };

    hideToolbar = () => {
      this.setState(getInitialState());
    };

    showToolbar = () => {
      const toolbarNode = findDOMNode(this);
      const toolbarHeight = toolbarNode.offsetHeight;
      const offsetParentTop = toolbarNode.offsetParent.offsetTop;
      const offsetParentLeft = toolbarNode.offsetParent.offsetLeft;

      const boundingRect = pubsub.get('boundingRect');
      const position = {
        top: boundingRect.top + window.scrollY - toolbarHeight - toolbarOffset - offsetParentTop,
        left: boundingRect.left + window.scrollX + boundingRect.width / 2 - offsetParentLeft,
        transform: 'translate(-50%) scale(1)',
        transition: 'transform 0.15s cubic-bezier(.3,1.2,.2,1)',
      };
      const componentData = pubsub.get('componentData') || {};
      const componentState = pubsub.get('componentState') || {};
      this.setState({
        position,
        componentData,
        componentState,
      });
    };

    handleButtonsRef = node => {
      this.buttons = node;
      this.buttons.addEventListener('scroll', this.handleToolbarScroll);
      window && window.addEventListener('resize', this.handleToolbarScroll);
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

    renderButton = (button, key, themedStyle, separatorClassNames) => {
      const { alignment, size } = this.state;
      switch (button.type) {
        case BUTTONS.SIZE_ORIGINAL_CENTER:
          return (
            <SizeOriginalCenterButton
              size={size}
              alignment={alignment}
              setAlignmentAndSize={this.setAlignmentAndSize}
              theme={themedStyle}
              key={key}
            />
          );
        case BUTTONS.SIZE_SMALL_CENTER:
          return (
            <SizeSmallCenterButton size={size} alignment={alignment} setAlignmentAndSize={this.setAlignmentAndSize} theme={themedStyle} key={key} />
          );
        case BUTTONS.SIZE_SMALL_LEFT:
          return (
            <SizeSmallLeftButton size={size} alignment={alignment} setAlignmentAndSize={this.setAlignmentAndSize} theme={themedStyle} key={key} />
          );
        case BUTTONS.SIZE_SMALL_RIGHT:
          return (
            <SizeSmallRightButton size={size} alignment={alignment} setAlignmentAndSize={this.setAlignmentAndSize} theme={themedStyle} key={key} />
          );
        case BUTTONS.SIZE_CONTENT:
          return (
            <SizeContentButton size={size} alignment={alignment} setAlignmentAndSize={this.setAlignmentAndSize} theme={themedStyle} key={key} />
          );
        case BUTTONS.SIZE_FULL_WIDTH:
          return (
            <SizeFulllWidthButton size={size} alignment={alignment} setAlignmentAndSize={this.setAlignmentAndSize} theme={themedStyle} key={key} />
          );
        case BUTTONS.SEPARATOR:
          return <Separator className={separatorClassNames} key={key} />;
        case BUTTONS.HORIZONTAL_SEPARATOR:
          return <Separator className={separatorClassNames} horizontal key={key} />;
        case BUTTONS.LINK:
          return (<BlockLinkButton
            pubsub={pubsub}
            onExtendContent={this.onExtendContent}
            onOverrideContent={this.onOverrideContent}
            theme={themedStyle}
            key={key}
          />);
        case BUTTONS.DELETE:
          return <DeleteButton onClick={this.deleteBlock} theme={themedStyle} key={key} />;
        default:
          return (
            <BaseToolbarButton
              theme={themedStyle}
              componentData={this.state.componentData}
              componentState={this.state.componentState}
              pubsub={pubsub}
              helpers={helpers}
              key={key}
              isMobile={isMobile}
              {...button}
            />
          );
      }
    };

    render = () => {

      const { showLeftArrow, showRightArrow, overrideContent: OverrideContent, extendContent: ExtendContent } = this.state;
      const { toolbarStyles: toolbarTheme } = theme || {};
      const { buttonStyles: buttonTheme, separatorStyles: separatorTheme } = theme || {};
      const containerClassNames = classNames(toolbarStyles.toolbar, toolbarTheme && toolbarTheme.toolbar);
      const buttonContainerClassnames = classNames(toolbarStyles.buttons, toolbarTheme && toolbarTheme.buttons, {
        [toolbarStyles.overrideContent]: !!OverrideContent
      });
      const modal = theme.modal ? { modal: { ...theme.modal } } : {};
      const themedButtonStyle = {
        buttonWrapper: classNames(buttonStyles.buttonWrapper, buttonTheme && buttonTheme.buttonWrapper),
        button: classNames(buttonStyles.button, buttonTheme && buttonTheme.button),
        icon: classNames(buttonStyles.icon, buttonTheme && buttonTheme.icon),
        active: classNames(buttonStyles.active, buttonTheme && buttonTheme.active),
        ...modal
      };
      const separatorClassNames = classNames(toolbarStyles.separator, separatorTheme && separatorTheme.separator);
      const overrideProps = { onOverrideContent: this.onOverrideContent };
      const extendProps = { onExtendContent: this.onExtendContent };
      const structure = isMobile ? buttons.filter(button => button.mobile) : buttons;

      return (
        <div style={this.state.position} className={containerClassNames}>
          <div
            className={buttonContainerClassnames}
            ref={this.handleButtonsRef}
          >
            {
              showLeftArrow &&
              <div
                className={classNames(toolbarStyles.responsiveArrow, toolbarStyles.responsiveArrowLeft)}
                onMouseDown={e => this.scrollToolbar(e, 'left')}
              >
                <i/>
              </div>
            }
            {OverrideContent ?
              <OverrideContent {...overrideProps} /> :
              structure.map((button, index) => (
                this.renderButton(button, index, themedButtonStyle, separatorClassNames)
              ))
            }
            {
              showRightArrow &&
              <div
                className={classNames(toolbarStyles.responsiveArrow, toolbarStyles.responsiveArrowRight)}
                onMouseDown={e => this.scrollToolbar(e, 'right')}
              >
                <i/>
              </div>
            }
          </div>
          {ExtendContent && (
            <div className={toolbarStyles.extend}>
              <ExtendContent {...extendProps} />
            </div>
          )}
        </div>
      );
    };
  }
  return BaseToolbar;
}
