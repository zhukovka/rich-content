import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import { Separator } from 'draft-js-inline-toolbar-plugin';
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

export default function createToolbar({ buttons, theme, pubsub, helpers }) {
  class BaseToolbar extends Component {

    constructor(props) {
      super(props);
      this.state = {
        position: {transform: 'translate(-50%) scale(0)'},
        componentData: {},
        componentState: {},
        overrideContent: undefined,
        extendContent: undefined,
      };
    };

    componentDidMount() {
      pubsub.subscribe('visibleBlock', this.onVisibilityChanged);
      pubsub.subscribe('componentState', this.onComponentStateChanged);
      pubsub.subscribe('componentData', this.onComponentDataChanged);
      pubsub.subscribe('componentAlignment', this.onComponentAlignmentChange);
      pubsub.subscribe('componentSize', this.onComponentSizeChange);
    }

    onOverrideContent = overrideContent => this.setState({ overrideContent });

    onExtendContent = extendContent => this.setState({ extendContent });

    componentWillUnmount() {
      pubsub.unsubscribe('visibleBlock', this.onVisibilityChanged);
      pubsub.unsubscribe('componentState', this.onComponentStateChanged);
      pubsub.unsubscribe('componentData', this.onComponentDataChanged);
      pubsub.unsubscribe('componentAlignment', this.onComponentAlignmentChange);
      pubsub.unsubscribe('componentSize', this.onComponentSizeChange);
    }

    onComponentStateChanged = (contentState) => {
      this.setState({contentState});
    };

    onComponentDataChanged = (componentData) => {
      this.setState({componentData});
    };

    setAlignment = alignment => {
      pubsub.set('componentAlignment', alignment);
    }

    setAlignmentAndSize = (componentAlignment, componentSize) => {
      pubsub.set({componentAlignment,componentSize});
    }

    onComponentAlignmentChange = alignment => {
      this.setState({alignment}, () => {
        this.onVisibilityChanged(pubsub.get('visibleBlock'))
      });
    }

    setSize = size => {
      pubsub.set('componentSize', size);
    }

    onComponentSizeChange = size => {
      this.setState({size});
    }

    deleteBlock = () => {
      pubsub.set('visibleBlock', null);
      pubsub.get('deleteBlock')();
    }

    onVisibilityChanged = (visibleBlock) => {
      if(visibleBlock) {
        this.showToolbar();
      } else {
        this.hideToolbar();
      }
    };

    hideToolbar = () => {
      const position = {
        transform: 'translate(-50%) scale(0)',
      };
      this.setState({
        position,
        componentData: {},
        componentState: {}
      });
    };

    showToolbar = () => {
      const toolbarNode = findDOMNode(this);
      const toolbarHeight = toolbarNode.offsetHeight;
      const offsetParentTop = toolbarNode.offsetParent.offsetTop;
      const offsetParentLeft = toolbarNode.offsetParent.offsetLeft;

      const boundingRect = pubsub.get('boundingRect');
      const position = {
        top: (boundingRect.top + window.scrollY) - toolbarHeight - toolbarOffset - offsetParentTop,
        left: boundingRect.left + window.scrollX + (boundingRect.width / 2) - offsetParentLeft,
        transform: 'translate(-50%) scale(1)',
        transition: 'transform 0.15s cubic-bezier(.3,1.2,.2,1)',
      };
      const componentData = pubsub.get('componentData') || {};
      const componentState = pubsub.get('componentState') || {};
      this.setState({
        position,
        componentData,
        componentState
      });
    };

    renderButton = (button, key) => {
      const { alignment, size } = this.state;
      const alignmentProps = {theme, alignment, setAlignment: this.setAlignment, key};
      switch (button.type) {
        case BUTTONS.SIZE_ORIGINAL_CENTER:
          return <SizeOriginalCenterButton size={size} alignment={alignment} setAlignmentAndSize={this.setAlignmentAndSize} theme={buttonStyles} key={key} />;
        case BUTTONS.SIZE_SMALL_CENTER:
          return <SizeSmallCenterButton size={size} alignment={alignment} setAlignmentAndSize={this.setAlignmentAndSize} theme={buttonStyles} key={key} />;
        case BUTTONS.SIZE_SMALL_LEFT:
          return <SizeSmallLeftButton size={size} alignment={alignment} setAlignmentAndSize={this.setAlignmentAndSize} theme={buttonStyles} key={key} />;
        case BUTTONS.SIZE_SMALL_RIGHT:
          return <SizeSmallRightButton size={size} alignment={alignment} setAlignmentAndSize={this.setAlignmentAndSize} theme={buttonStyles} key={key} />;
        case BUTTONS.SIZE_CONTENT:
          return <SizeContentButton size={size} alignment={alignment} setAlignmentAndSize={this.setAlignmentAndSize} theme={buttonStyles} key={key} />;
        case BUTTONS.SIZE_FULL_WIDTH:
          return <SizeFulllWidthButton size={size} alignment={alignment} setAlignmentAndSize={this.setAlignmentAndSize} theme={buttonStyles} key={key} />;
        case BUTTONS.SEPARATOR:
          return <Separator className={toolbarStyles.separator} key={key} />;
        case BUTTONS.LINK:
          return <BlockLinkButton className={toolbarStyles.separator} pubsub={pubsub} onExtendContent={this.onExtendContent} key={key} />;
        case BUTTONS.DELETE:
          return <DeleteButton onClick={this.deleteBlock} theme={buttonStyles} key={key}  />;
        default:
          return (
            <BaseToolbarButton
              theme={theme}
              componentData={this.state.componentData}
              componentState={this.state.componentState}
              pubsub={pubsub}
              helpers={helpers}
              key={key}
              {...button}
            />
          )
      }
    }

    render = () => {
      const containerClassNames = classNames(toolbarStyles.toolbar, theme.toolbar);
      const buttonContainerClassnames = classNames(toolbarStyles.buttons, theme.buttons);
      const {
        overrideContent: OverrideContent,
        extendContent: ExtendContent,
      } = this.state;
      const overrideProps = {
        theme: buttonStyles,
        onOverrideContent: this.onOverrideContent,
      };
      const extendProps = {
        theme: buttonStyles,
        onExtendContent: this.onExtendContent,
      }

      return (
        <div style={this.state.position} className={containerClassNames}>
          <div className={buttonContainerClassnames}>
            {
              OverrideContent
              ? <OverrideContent {...overrideProps} />
              : buttons.map((button, index) => this.renderButton(button, index))
            }
          </div>
          {
            ExtendContent &&
            <div className={toolbarStyles.extend}>
              <ExtendContent {...extendProps} />
            </div>
          }
        </div>
      );
    };
  }
  return BaseToolbar;
}

