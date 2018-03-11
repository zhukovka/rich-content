import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Styles from '~/Styles/static-toolbar.scss';

export default class StaticToolbar extends React.Component {
  static propTypes = {
    pubsub: PropTypes.object.isRequired,
    structure: PropTypes.array.isRequired,
    theme: PropTypes.object.isRequired,
    isMobile: PropTypes.bool.isRequired,
    helpers: PropTypes.object,
  };

  constructor(props) {
    super(props);
    const { isMobile, structure } = this.props;
    this.state = {
      overrideContent: undefined,
      extendContent: undefined,
      showRightArrow: isMobile && structure.length > 7,
      showLeftArrow: false
    };
  }

  componentDidMount() {
    this.handleToolbarScroll();
  }

  componentWillUnmount() {
    this.buttons && this.buttons.removeEventListener('scroll', this.handleToolbarScroll);
    window && window.removeEventListener('resize', this.handleToolbarScroll);
  }

  handleButtonsRef = node => {
    this.buttons = node;
    if (this.buttons) {
      this.buttons.addEventListener('scroll', this.handleToolbarScroll);
      window && window.addEventListener('resize', this.handleToolbarScroll);
    }
  };

  scrollToolbar(event, direction) {
    event.preventDefault();
    const { scrollLeft, clientWidth, scrollWidth } = this.buttons;
    switch (direction) {
      case 'right':
        this.buttons.scrollLeft += scrollWidth - clientWidth - scrollLeft;
        break;
      case 'left':
        this.buttons.scrollLeft -= scrollLeft;
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
      showLeftArrow: (spaceLeft > 1),
      showRightArrow: (spaceRight > 1)
    });
  }

  onOverrideContent = overrideContent => this.setState({ overrideContent });

  onExtendContent = extendContent => this.setState({ extendContent });

  render() {
    const { theme, pubsub, structure, helpers, isMobile } = this.props;
    const { showLeftArrow, showRightArrow, overrideContent: OverrideContent, extendContent: ExtendContent } = this.state;
    const { toolbarStyles } = theme || {};
    const toolbarClassNames = classNames(Styles.toolbar, toolbarStyles && toolbarStyles.toolbar);
    const buttonClassNames = classNames(Styles.buttons, toolbarStyles && toolbarStyles.buttons);
    const extendClassNames = classNames(Styles.extend, toolbarStyles && toolbarStyles.extend);
    const childrenProps = {
      theme,
      helpers,
      isMobile,
      getEditorState: pubsub.get('getEditorState'),
      setEditorState: pubsub.get('setEditorState'),
      onOverrideContent: this.onOverrideContent,
      onExtendContent: this.onExtendContent,
    };

    return (
      <div className={toolbarClassNames}>
        <div
          className={buttonClassNames}
          ref={this.handleButtonsRef}
        >
          {
            showLeftArrow &&
            <div
              className={classNames(toolbarStyles.responsiveArrow, toolbarStyles.responsiveArrowLeft)}
              onMouseDown={e => this.scrollToolbar(e, 'left')}
            >
              <i className={toolbarStyles.responsiveArrowLeft_icon}/>
            </div>
          }
          {
            OverrideContent ?
              <OverrideContent {...childrenProps} /> :
              structure.map((Button, index) => <Button key={index} {...childrenProps} />)
          }
          {
            showRightArrow &&
            <div
              className={classNames(toolbarStyles.responsiveArrow, toolbarStyles.responsiveArrowRight)}
              onMouseDown={e => this.scrollToolbar(e, 'right')}
            >
              <i className={toolbarStyles.responsiveArrowRight_icon}/>
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
