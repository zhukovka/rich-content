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
    toolbarStyle: PropTypes.object,
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

  onOverrideContent = overrideContent => this.setState({ overrideContent });

  onExtendContent = extendContent => this.setState({ extendContent });

  render() {
    const { theme, toolbarStyle, pubsub, structure } = this.props;
    const { showLeftArrow, showRightArrow, overrideContent: OverrideContent, extendContent: ExtendContent } = this.state;
    const { buttonStyles, toolbarStyles } = theme || {};
    const toolbarClassNames = classNames(Styles.toolbar, toolbarStyles && toolbarStyles.toolbar);
    const buttonClassNames = classNames(Styles.buttons, toolbarStyles && toolbarStyles.buttons);
    const extendClassNames = classNames(Styles.extend, toolbarStyles && toolbarStyles.extend);
    const childrenProps = {
      theme: buttonStyles,
      getEditorState: pubsub.get('getEditorState'),
      setEditorState: pubsub.get('setEditorState'),
      onOverrideContent: this.onOverrideContent,
      onExtendContent: this.onExtendContent,
    };

    return (
      <div className={toolbarClassNames} style={toolbarStyle}>
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
              <i/>
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
